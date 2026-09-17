"""
OASIS-2 experiments for the 4GI internship report (part II).

Inspired by hyunseokc Detecting Early Alzheimer's, aligned with the
internship SOTA: logistic, SVM, trees, XGBoost.
Leakage guards: one row per subject (visit 1), no CDR in X, impute/scale on train only.
"""
from __future__ import annotations

import json
import warnings
from pathlib import Path

import joblib
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import AdaBoostClassifier, RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    accuracy_score,
    average_precision_score,
    classification_report,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    roc_curve,
)
from sklearn.model_selection import (
    StratifiedKFold,
    cross_val_score,
    learning_curve,
    train_test_split,
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier

warnings.filterwarnings("ignore", category=UserWarning)

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "oasis_longitudinal.csv"
OUT = ROOT / "oasis_outputs"
FIG = OUT / "figures"
MOD = OUT / "models"
for d in (OUT, FIG, MOD):
    d.mkdir(parents=True, exist_ok=True)

FEATURES = ["M/F", "Age", "EDUC", "SES", "MMSE", "eTIV", "nWBV", "ASF"]
RANDOM_STATE = 42
TEST_SIZE = 0.25
CV = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)

plt.rcParams.update({"figure.dpi": 120, "font.size": 10})


def load_table() -> pd.DataFrame:
    df = pd.read_csv(DATA)
    df = df.loc[df["Visit"] == 1].copy().reset_index(drop=True)
    df["sex_male"] = (df["M/F"] == "M").astype(int)
    df["y"] = (df["Group"] != "Nondemented").astype(int)
    df["group_raw"] = df["Group"]
    return df


def make_xy(df: pd.DataFrame):
    X = df[["sex_male", "Age", "EDUC", "SES", "MMSE", "eTIV", "nWBV", "ASF"]].copy()
    X.columns = ["sex_male", "Age", "EDUC", "SES", "MMSE", "eTIV", "nWBV", "ASF"]
    y = df["y"].values
    groups = df["group_raw"]
    return X, y, groups


def preprocessor() -> ColumnTransformer:
    cols = ["sex_male", "Age", "EDUC", "SES", "MMSE", "eTIV", "nWBV", "ASF"]
    return ColumnTransformer(
        [
            (
                "num",
                Pipeline(
                    [
                        ("impute", SimpleImputer(strategy="median")),
                        ("scale", StandardScaler()),
                    ]
                ),
                cols,
            )
        ]
    )


def models(scale_pos_weight: float) -> dict:
    pre = preprocessor()
    return {
        "Logistic": Pipeline(
            [
                ("pre", pre),
                (
                    "clf",
                    LogisticRegression(
                        max_iter=2000, class_weight="balanced", random_state=RANDOM_STATE
                    ),
                ),
            ]
        ),
        "SVM": Pipeline(
            [
                ("pre", pre),
                (
                    "clf",
                    SVC(
                        kernel="rbf",
                        probability=True,
                        class_weight="balanced",
                        random_state=RANDOM_STATE,
                    ),
                ),
            ]
        ),
        "DecisionTree": Pipeline(
            [
                ("pre", pre),
                (
                    "clf",
                    DecisionTreeClassifier(
                        max_depth=4, class_weight="balanced", random_state=RANDOM_STATE
                    ),
                ),
            ]
        ),
        "RandomForest": Pipeline(
            [
                ("pre", pre),
                (
                    "clf",
                    RandomForestClassifier(
                        n_estimators=150,
                        max_depth=6,
                        min_samples_leaf=3,
                        class_weight="balanced",
                        random_state=RANDOM_STATE,
                    ),
                ),
            ]
        ),
        "AdaBoost": Pipeline(
            [
                ("pre", pre),
                (
                    "clf",
                    AdaBoostClassifier(
                        n_estimators=80, learning_rate=0.3, random_state=RANDOM_STATE
                    ),
                ),
            ]
        ),
        "XGBoost": Pipeline(
            [
                ("pre", pre),
                (
                    "clf",
                    XGBClassifier(
                        n_estimators=120,
                        max_depth=3,
                        learning_rate=0.05,
                        subsample=0.9,
                        colsample_bytree=0.9,
                        objective="binary:logistic",
                        eval_metric="logloss",
                        scale_pos_weight=scale_pos_weight,
                        random_state=RANDOM_STATE,
                        n_jobs=1,
                    ),
                ),
            ]
        ),
    }


def savefig(name: str) -> None:
    plt.tight_layout()
    plt.savefig(FIG / name, dpi=140, bbox_inches="tight")
    plt.close()


def eda(df: pd.DataFrame) -> None:
    order = ["Nondemented", "Demented", "Converted"]
    counts = df["group_raw"].value_counts().reindex(order)
    ax = counts.plot(kind="bar", color=["#4C9A8E", "#C44E52", "#E6A157"], rot=0)
    ax.set_ylabel("Participants (visite index)")
    ax.set_title("OASIS-2 — répartition des groupes (visite 1)")
    savefig("fig4_1_group_counts.png")

    fig, axes = plt.subplots(2, 3, figsize=(12, 7))
    colors = {"Nondemented": "#4C9A8E", "Demented": "#C44E52", "Converted": "#E6A157"}
    for ax, col in zip(axes.ravel(), ["Age", "EDUC", "MMSE", "nWBV", "eTIV", "ASF"]):
        for g, c in colors.items():
            vals = df.loc[df["group_raw"] == g, col].dropna()
            ax.hist(vals, bins=12, alpha=0.45, color=c, label=g)
        ax.set_title(col)
        ax.legend(fontsize=7)
    savefig("fig4_eda_distributions.png")

    miss = df[["SES", "MMSE"]].isna().sum()
    miss.to_csv(OUT / "missing_counts.csv")

    cols = ["Age", "EDUC", "SES", "MMSE", "eTIV", "nWBV", "ASF", "y"]
    corr = df[cols].corr().values
    plt.figure(figsize=(7, 6))
    im = plt.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
    plt.colorbar(im, fraction=0.046)
    plt.xticks(range(len(cols)), cols, rotation=45, ha="right")
    plt.yticks(range(len(cols)), cols)
    for i in range(len(cols)):
        for j in range(len(cols)):
            plt.text(j, i, f"{corr[i, j]:.2f}", ha="center", va="center", fontsize=7)
    plt.title("Corrélations (visite 1 ; y = Demented|Converted)")
    savefig("fig4_corr_heatmap.png")


def metrics_dict(y_true, y_pred, y_proba) -> dict:
    return {
        "accuracy": float(accuracy_score(y_true, y_pred)),
        "precision": float(precision_score(y_true, y_pred, zero_division=0)),
        "recall": float(recall_score(y_true, y_pred, zero_division=0)),
        "f1": float(f1_score(y_true, y_pred, zero_division=0)),
        "auc": float(roc_auc_score(y_true, y_proba)),
        "avg_precision": float(average_precision_score(y_true, y_proba)),
    }


def plot_confusion(name: str, y_true, y_pred) -> None:
    fig, ax = plt.subplots(figsize=(5, 4))
    ConfusionMatrixDisplay.from_predictions(
        y_true,
        y_pred,
        display_labels=["Nondemented", "Demented+Conv."],
        cmap="Blues",
        ax=ax,
        colorbar=False,
    )
    ax.set_title(name)
    savefig(f"cm_{name}.png")


def plot_rocs(roc_store: dict) -> None:
    plt.figure(figsize=(7, 6))
    for name, (fpr, tpr, auc_v) in roc_store.items():
        plt.plot(fpr, tpr, label=f"{name} (AUC={auc_v:.2f})")
    plt.plot([0, 1], [0, 1], "k--", linewidth=1)
    plt.xlabel("Faux positifs")
    plt.ylabel("Vrais positifs")
    plt.title("Courbes ROC (test, 25 %)")
    plt.legend(fontsize=9)
    savefig("fig5_roc_all.png")


def plot_learning(name: str, estimator, X, y) -> None:
    sizes, train_sc, val_sc = learning_curve(
        estimator,
        X,
        y,
        cv=CV,
        train_sizes=np.linspace(0.4, 1.0, 3),
        scoring="roc_auc",
        n_jobs=1,
        shuffle=True,
        random_state=RANDOM_STATE,
    )
    plt.figure(figsize=(6, 4))
    plt.plot(sizes, train_sc.mean(axis=1), "o-", label="Train")
    plt.plot(sizes, val_sc.mean(axis=1), "o-", label="CV")
    plt.xlabel("Taille d'entraînement")
    plt.ylabel("AUC")
    plt.title(f"Courbe d'apprentissage — {name}")
    plt.legend()
    savefig(f"lc_{name}.png")


def feature_importance(name: str, pipe, columns) -> None:
    clf = pipe.named_steps["clf"]
    if hasattr(clf, "feature_importances_"):
        imp = clf.feature_importances_
    elif hasattr(clf, "coef_"):
        imp = np.abs(clf.coef_).ravel()
    else:
        return
    s = pd.Series(imp, index=columns).sort_values()
    s.plot(kind="barh", figsize=(6, 4), color="#3D5A80")
    plt.title(f"Importance — {name}")
    plt.xlabel("poids | importance")
    savefig(f"fi_{name}.png")
    s.sort_values(ascending=False).to_csv(OUT / f"fi_{name}.csv")


def main() -> None:
    df = load_table()
    X, y, groups = make_xy(df)
    eda(df)

    n = len(df)
    n_pos = int(y.sum())
    summary = {
        "n_visit1": n,
        "n_nondemented": int((groups == "Nondemented").sum()),
        "n_demented": int((groups == "Demented").sum()),
        "n_converted": int((groups == "Converted").sum()),
        "n_positive_binary": n_pos,
        "features": list(X.columns),
        "excluded": ["CDR", "MRI ID", "Hand", "visits > 1"],
        "split": f"stratified {int((1 - TEST_SIZE) * 100)}/{int(TEST_SIZE * 100)}, seed={RANDOM_STATE}",
        "note": "Une ligne par participant (visite 1). CDR exclu des prédicteurs.",
    }

    n_neg = n - n_pos
    spw = (n_neg / n_pos) if n_pos else 1.0

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, stratify=y, random_state=RANDOM_STATE
    )

    rows = []
    roc_store = {}
    best_name, best_auc, best_pipe = None, -1.0, None

    for name, pipe in models(spw).items():
        cv_auc = cross_val_score(pipe, X_train, y_train, cv=CV, scoring="roc_auc")
        pipe.fit(X_train, y_train)
        proba = pipe.predict_proba(X_test)[:, 1]
        pred = (proba >= 0.5).astype(int)
        m = metrics_dict(y_test, pred, proba)
        m["cv_auc_mean"] = float(cv_auc.mean())
        m["cv_auc_std"] = float(cv_auc.std())
        m["model"] = name
        rows.append(m)

        fpr, tpr, _ = roc_curve(y_test, proba)
        roc_store[name] = (fpr, tpr, m["auc"])
        plot_confusion(name, y_test, pred)
        if name in {"Logistic", "RandomForest", "XGBoost"}:
            plot_learning(name, pipe, X_train, y_train)
        feature_importance(name, pipe, X.columns)

        report = classification_report(
            y_test, pred, target_names=["Nondemented", "Demented+Conv."]
        )
        (OUT / f"report_{name}.txt").write_text(report, encoding="utf-8")

        if m["auc"] > best_auc:
            best_auc, best_name, best_pipe = m["auc"], name, pipe

        print(f"{name:14s}  test AUC={m['auc']:.3f}  F1={m['f1']:.3f}  CV AUC={m['cv_auc_mean']:.3f}")

    plot_rocs(roc_store)
    table = pd.DataFrame(rows).sort_values("auc", ascending=False)
    table.to_csv(OUT / "metrics.csv", index=False)

    joblib.dump(
        {"pipeline": best_pipe, "features": list(X.columns), "threshold": 0.5, "model_name": best_name},
        MOD / "best_pipeline.joblib",
    )
    summary["best_model"] = best_name
    summary["best_test_auc"] = best_auc
    (OUT / "run_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print("\nBest:", best_name, "AUC", round(best_auc, 3))
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
