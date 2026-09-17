# Rapport de stage research intern, brouillon

Fichier de travail. Plus tard : `memoirthesis.tex` + `memoirthesis.pdf` à côté.

**Commentaires de Balbino.**  
- `/* consigne */` — note pour moi : j’applique, puis je retire le bloc.  
- `~~texte barré~~` — tu as rayé ce passage : je le **reformule** (je ne le recopie pas). Place le tout juste sous ou dans le passage visé.

**Figures.** Dans le texte : `**[FIG. — à fournir : …]**`. Tu cherches l’image (logo, schéma, carte, capture) ; je l’insère ensuite. Privilégier des visuels libres de droits ou des schémas originaux (pas de figure d’article copyrightée telle quelle).

**Cadrage verrouillé**

| | |
|---|---|
| Genre | Rapport de stage **research intern**, registre recherche UMMISCO (Nassair), pas un mémoire |
| Source du sujet | Courriel de **TSOPZE Norbert** (`tsopze.norbert@gmail.com`), 24 juillet 2026, à Bernard Fongang, avec copie à Balbino et Pr Melatagia. Titre officiel ci-dessous. Première consigne : repérer les datasets en ligne ; signaler si inaccessibles. |
| Cœur | **Partie I** — ce sujet officiel. Livrable atteint = plan d’analyse (annexe). Extraets NACC/ADNI/FHS confidentiels, en attente d’accès |
| Complément | **Partie II** — Detecting Early Alzheimer’s. Données **publiques** OASIS-2. Baseline : [notebook hyunseokc](https://www.kaggle.com/code/hyunseokc/detecting-early-alzheimer-s/notebook). **Contribution** : autres modèles + démo sur interface dédiée |
| Corpus littérature | **Deux sources, à tenir ensemble.** (1) Recherches du stage / consignes Fongang : CARD/NIH ; Xue, Kolachalama et al. *Nat Med* 2024 ; Park et al. MOIRA 2025 ; Xia 2025 (66,7 % ADNI, 10 % val. externe) ; Chen 2024 PROBAST ; Yagis ; Gianattasio (ADNI ≠ community). (2) Les 14 PDF de `Repport/descriptions_paper.md` : Qiu et al. 2022 (même labo que Xue, NACC+ADNI+FHS, diagnostic) ; Liu 2022 ; Vashishath 2026 ; Raza 2024 ; Hassan 2025 ; Tan 2026 ; Pola/Akinyemi 2026 ; Theocharidis 2026. Le related work fusionne les deux ; on n’écarte pas l’un pour l’autre. |

**Remplissage :** brouillon complet (ch. 4–5 et conclusion : chiffres OASIS et captures encore vides).

---

# TEXTE DU RAPPORT

## Page de garde

**UNIVERSITÉ DE YAOUNDÉ I**  
**ÉCOLE NATIONALE SUPÉRIEURE POLYTECHNIQUE DE YAOUNDÉ**  
**DÉPARTEMENT DE GÉNIE INFORMATIQUE**

*(en vis-à-vis, version anglaise comme Karlin / Nassair : University of Yaoundé I · National Advanced School of Engineering · Department of Computer Engineering)*

---

**Multimodal prediction of MCI-to-dementia conversion across NACC, ADNI, and Framingham**

*Prédiction multimodale de la conversion du trouble cognitif léger vers la démence, sur NACC, ADNI et Framingham*

*Sujet du stage, courriel de Pr Tsopze, 24 juillet 2026. Volet empirique complémentaire (hors sujet officiel) : détection précoce de la maladie d’Alzheimer sur OASIS-2.*

---

**Rapport de stage pré-ingénieur**  
Stage de recherche

**Présenté par :**  
TCHOUTZINE Balbino

**Formation :**  
Ingénieur de Conception, Génie Informatique (ENSPY)

**Superviseur principal :**  
Pr Norbert Tsopze, PhD (Université de Yaoundé I ; Université d’Artois), UMMISCO

**Co-encadrement :**  
Bernard Fongang, PhD, Associate Professor, UT Health San Antonio ; Program Director, AI-BOND  
Pr Paulin Melatagia Yonta, Enseignant-chercheur en informatique, Université de Yaoundé I ; Directeur UMMISCO Afrique centrale et de l’Est ; UMR UMMISCO (IRD/SU) ; équipe IDASCO (IA et Sciences de Données)

**Laboratoire d’accueil :**  
UMMISCO — Université de Yaoundé I  
Collaboration : Glenn Biggs Institute for Alzheimer’s and Neurodegenerative Diseases, UT Health San Antonio (AI-BOND)

**Stage :** 24 juillet – 24 septembre 2026  
**Année académique :** 2025–2026

---

## Sujet officiel (courriel du 24 juillet 2026)

Texte de cadrage envoyé par Pr Tsopze à Bernard Fongang (AI-BOND), avec copie à Balbino et Pr Melatagia. C’est la **description de référence** de la partie I. On le reprendra dans l’introduction, sans le réécrire.

**Titre.** Multimodal prediction of MCI-to-dementia conversion across NACC, ADNI, and Framingham.

**Rationale.** Conversion from mild cognitive impairment to dementia is a central clinical and public-health question, and large cohorts contain repeated cognitive, clinical, imaging, genetic, and biomarker measures.

**Gap.** Many models perform well within a single cohort but degrade when moved to a new site, ancestry composition, or assessment schedule. Longitudinal leakage and inconsistent phenotype definitions are frequent problems.

**Objective.** Develop a leakage-resistant, externally validated model for 2- to 5-year conversion risk and identify the minimal data package needed for useful prediction.

**Data.** NACC UDS, ADNI clinical/imaging/biomarker data, Framingham cognitive and risk-factor data ; African data could later serve as transportability testing when harmonized.

**Suggested methods.** Logistic/Cox models, random forest/XGBoost, calibration, decision-curve analysis, participant-level splits, external validation, SHAP, subgroup fairness checks.

**Première tâche.** Repérer ces jeux en ligne ; signaler s’ils ne sont pas accessibles. Les articles de recherche viendraient ensuite.

*Traduction de travail (pour le corps du rapport en français) :* la conversion MCI → démence est une question clinique et de santé publique centrale ; les grandes cohortes accumulent des mesures répétées. Beaucoup de modèles tiennent dans une cohorte et se dégradent dès qu’on change de site, d’ancestralité ou de calendrier de visites. Les fuites longitudinales et les phénotypes mal alignés sont fréquents. Objectif : un modèle anti-fuite, validé en externe, pour le risque à 2 et 5 ans, et le **paquet de données minimal** encore utile. Données visées : NACC UDS, ADNI, Framingham ; données africaines plus tard, pour la transportabilité. Méthodes suggérées : logistique/Cox, forêts/XGBoost, calibration, DCA, splits participant, validation externe, SHAP, équité.

La **partie II** (OASIS-2, notebook hyunseokc, autres modèles, démo) n’est pas dans ce courriel. Elle est un **volet complémentaire** du stagiaire, le temps que le plan d’analyse ouvre l’accès aux extraits confidentiels.

---

## Page logos (titre court)

Logos UMMISCO + ENSPY (comme Nassair, page 2).

**Titre court :** Multimodal prediction of MCI-to-dementia conversion  
**Sous-titre court :** NACC, ADNI, Framingham — stage UMMISCO / AI-BOND  

**Rapport de stage pré-ingénieur** — TCHOUTZINE Balbino — 2025–2026

---

## Dédicace

À mon papa, M. Tchoutzine Fourrier Romeo.

---

## Remerciements

Ma gratitude va à toutes celles et ceux qui ont rendu ce stage possible.

Je remercie d’abord **Pr Norbert Tsopze, PhD**, mon **superviseur principal**, pour m’avoir accueilli à UMMISCO, pour le sujet qu’il a formulé, et pour la confiance qu’il m’a accordée tout au long de ces huit semaines.

Je remercie **Bernard Fongang, PhD**, Associate Professor à UT Health San Antonio et Program Director d’AI-BOND, pour le cadrage scientifique du plan d’analyse et pour l’ouverture de cette collaboration UMMISCO – Glenn Biggs Institute.

Je remercie **Pr Paulin Melatagia Yonta**, enseignant-chercheur à l’Université de Yaoundé I, Directeur d’UMMISCO Afrique centrale et de l’Est, UMR UMMISCO (IRD/SU), pour l’accueil dans l’unité et pour le cadre de recherche dans lequel s’inscrit ce stage.

Je remercie le Directeur de l’École Nationale Supérieure Polytechnique de Yaoundé, **Pr Ayissi Raoul Domingo**, la direction adjointe, le Chef de département de Génie informatique, **Pr Thomas Bouetou Bouetou**, et l’ensemble du corps enseignant du département, pour la formation qui m’a préparé à ce stage de recherche.

Enfin, je remercie ma famille, mes frères et sœurs, et mes proches, pour leur soutien pendant ces deux mois.

À toutes celles et ceux qui ont contribué, de près ou de loin, à ce travail : merci.

---

## Abréviations

| Sigle | Signification |
|---|---|
| ADNI | Alzheimer’s Disease Neuroimaging Initiative |
| AI-BOND | programme d’IA dirigé par B. Fongang (UT Health San Antonio) |
| CDR | Clinical Dementia Rating |
| DCA | Decision-curve analysis |
| DUA | Data Use Agreement |
| FHS | Framingham Heart Study |
| MCI | Mild Cognitive Impairment / trouble cognitif léger |
| MMSE | Mini-Mental State Examination |
| NACC | National Alzheimer’s Coordinating Center |
| OASIS | Open Access Series of Imaging Studies |
| SHAP | SHapley Additive exPlanations |
| UDS | Uniform Data Set |
| UMMISCO | Unité de Modélisation Mathématique et Informatique des Systèmes Complexes |

---

## Résumé

La conversion du trouble cognitif léger (MCI) vers la démence est une question clinique et de santé publique centrale. Les grandes cohortes (NACC UDS, ADNI, Framingham) accumulent des mesures répétées cliniques, cognitives, d’imagerie, génétiques et de biomarqueurs. Une revue de 2025 montre que la conversion est l’objectif le plus fréquent des modèles multimodaux, que plus de la moitié rapportent une AUC supérieure à 0,8, que **66,7 %** sont développés sur ADNI et que seulement **10,1 %** sont validés en externe (Xia et al., 2025). Une évaluation PROBAST de 2024 trouve une AUC moyenne de 0,87, un risque de biais élevé ou incertain, et presque aucun test externe (Chen et al., 2024). Les systèmes les plus proches des trois cohortes du stage — Qiu, Kolachalama et al. (2022) puis Xue, Kolachalama et al. (2024) — fusionnent clinique et IRM, gèrent les manquants et testent ADNI et Framingham, mais pour un **diagnostic différentiel** (ce qu’est le patient aujourd’hui), non pour un risque de conversion à 2 et 5 ans. Liu et al. (2022) montrent qu’un CNN IRM ADNI se généralise à NACC ; les travaux de conversion pMCI / sMCI restent souvent **ADNI seuls** (Raza et al., 2024 ; Vashishath et al., 2026). Park et al. (MOIRA, 2025) et Hassan et al. (2025) montrent qu’il faut conserver les profils incomplets et splitter au niveau participant. Tan et al. (2026) soulignent le biais ancestral ; Pola, Akinyemi et al. (2026) documentent des signatures plasmatiques au Nigeria et en Tanzanie, distinctes des cohortes eurocentriques. Les fuites longitudinales (visite plutôt que participant) restent fréquentes (Yagis et al. ; Theocharidis et al., 2026). Le CARD/NIH cadre l’IA comme outil d’harmonisation, de prédiction et de priorisation, pas comme ornement.

Ce stage de recherche de huit semaines (24 juillet – 24 septembre 2026), mené à UMMISCO sous la supervision principale de Pr Norbert Tsopze, en collaboration avec Bernard Fongang, PhD (AI-BOND, UT Health San Antonio) et Pr Paulin Melatagia Yonta, a pour **sujet officiel** la prédiction multimodale de la conversion du trouble cognitif léger vers la démence, sur NACC, ADNI et Framingham. L’objectif est un modèle de risque à 2 et 5 ans, résistant aux fuites, validé en externe, et l’identification d’un **paquet de données minimal** encore utile. Les méthodes visées sont celles du cadrage du stage : modèles logistiques et de Cox, forêts aléatoires et XGBoost, calibration, analyse par courbes de décision, splits au niveau participant, validation externe, SHAP et contrôles d’équité.

Ces extraits de cohortes sont des **données de santé confidentielles**. Ils ne figurent pas dans ce rapport. Le livrable de la partie principale est un **plan d’analyse** (format du laboratoire Fongang / AI-BOND), soumis pour **ouvrir l’accès** sous accord d’utilisation (DUA). Le plan est joint en annexe.

En attendant ces extraits, un **volet empirique complémentaire** s’appuie sur la cohorte publique OASIS-2, où nous avons mené une étude de modèles pour *Detecting Early Alzheimer’s*, en retenant les plus performants, et une **démonstration sur une interface dédiée**. Ce volet ne remplace pas le sujet officiel et n’ouvre pas NACC, ADNI ni Framingham.

**Mots-clés :** MCI, conversion vers la démence, apprentissage multimodal, fuite de données, validation externe, NACC, ADNI, Framingham, plan d’analyse, OASIS-2, paquet de données minimal.

---

## Abstract

Conversion from mild cognitive impairment (MCI) to dementia is a central clinical and public-health question. Large cohorts (NACC UDS, ADNI, Framingham) contain repeated cognitive, clinical, imaging, genetic, and biomarker measures. A 2025 scoping review found conversion to be the most common multimodal objective, that more than half of models report AUC above 0.8, that **66.7%** are developed on ADNI, and that only **10.1%** are externally validated (Xia et al., 2025). A 2024 PROBAST appraisal found mean AUC 0.87, high or unclear risk of bias, and almost no external tests (Chen et al., 2024). The systems closest to the three internship cohorts — Qiu, Kolachalama et al. (2022) and Xue, Kolachalama et al. (2024) — fuse clinical and MRI data, handle missingness, and test on ADNI and Framingham, but for **cross-sectional differential diagnosis**, not 2- to 5-year conversion risk. Liu et al. (2022) show that an ADNI MRI CNN can transfer to NACC; pMCI versus sMCI conversion work is still often **ADNI-only** (Raza et al., 2024; Vashishath et al., 2026). Park et al. (MOIRA, 2025) and Hassan et al. (2025) argue for keeping incomplete profiles and splitting at participant level. Tan et al. (2026) highlight ancestral bias; Pola, Akinyemi et al. (2026) report plasma signatures in Nigeria and Tanzania that differ from Eurocentric cohorts. Longitudinal leakage (visit-wise rather than participant-wise splits) remains common (Yagis et al.; Theocharidis et al., 2026). CARD/NIH frames AI as a tool for harmonization, prediction, and target prioritization, not as an ornament.

This eight-week research internship (24 July – 24 September 2026) at UMMISCO, under the principal supervision of Pr Norbert Tsopze, with Bernard Fongang, PhD (AI-BOND, UT Health San Antonio) and Pr Paulin Melatagia Yonta, addresses the **assigned topic**: multimodal prediction of MCI-to-dementia conversion across NACC, ADNI, and Framingham. The aim is a leakage-resistant, externally validated model of 2- to 5-year conversion risk, and a still-useful **minimal data package**. The methods follow the internship brief: logistic and Cox models, random forest and XGBoost, calibration, decision-curve analysis, participant-level splits, external validation, SHAP, and subgroup fairness checks.

These cohort extracts are **confidential health data**. They are not included in this report. The main deliverable is an **analysis plan** (Fongang / AI-BOND lab format), submitted in order to **obtain access** under a data-use agreement (DUA). The plan appears in the appendix.

While those extracts are pending, a **complementary empirical strand** uses the public OASIS-2 cohort, where we conducted a model study for *Detecting Early Alzheimer’s*, retaining the best-performing models, and a **dedicated demonstration interface**. This strand does not replace the official topic and does not grant access to NACC, ADNI, or Framingham.

**Keywords:** MCI, dementia conversion, multimodal learning, data leakage, external validation, NACC, ADNI, Framingham, analysis plan, OASIS-2, minimal data package.

---

## Introduction générale

### CONTEXTE GÉNÉRAL

Le vieillissement des populations place la démence au centre des priorités de santé publique. Le trouble cognitif léger (MCI) désigne un déficit cognitif réel, souvent mnésique, alors que l’autonomie quotidienne reste globalement préservée. Sans intervention, de l’ordre de 15 % des personnes en MCI convertissent vers une démence de type Alzheimer en deux ans (Chen et al., 2024 ; Petersen et al., 2018). Prédire *qui* convertira dans une fenêtre de 2 à 5 ans est à la fois un problème d’enrichissement d’essais cliniques et un problème de triage.

Les grandes cohortes du vieillissement — NACC (UDS), ADNI, Framingham — accumulent des mesures répétées cliniques, cognitives, d’imagerie, génétiques et de biomarqueurs fluides. L’intelligence artificielle y est un outil d’infrastructure. Le CARD du NIH lui assigne quatre fonctions : harmoniser des sources hétérogènes, détecter des motifs subtils, prédire des issues futures, et prioriser des cibles (CARD/NIH). C’est le langage de ce stage.

Ce stage de recherche de huit semaines (24 juillet – 24 septembre 2026) s’inscrit dans une collaboration UMMISCO (Université de Yaoundé I) – Glenn Biggs Institute / AI-BOND (UT Health San Antonio). Le sujet, posé par Pr Norbert Tsopze, **superviseur principal**, est : *Multimodal prediction of MCI-to-dementia conversion across NACC, ADNI, and Framingham*.

### PROBLEMATIQUE

La littérature multimodale sait déjà classer la maladie d’Alzheimer *sur ADNI*. Xia et al. (2025) montrent que la conversion du MCI vers la démence est l’objectif le plus fréquent, que plus de la moitié des modèles rapportent une AUC supérieure à 0,8, que 66,7 % sont développés sur ADNI et que seulement 10,1 % sont validés en externe. Chen et al. (2024, PROBAST) trouvent une AUC moyenne de 0,87, un risque de biais élevé ou incertain, et presque aucun test externe.

Les systèmes les plus proches des trois cohortes du stage — Qiu, Kolachalama et al. (2022) puis Xue, Kolachalama et al. (2024) — fusionnent clinique et IRM, gèrent les manquants et testent ADNI et Framingham. Leur tâche est un **diagnostic différentiel** (stade ou étiologie *aujourd’hui*), pas un risque de conversion à 2 et 5 ans. Liu et al. (2022) montrent qu’un CNN IRM ADNI peut se généraliser à NACC ; les travaux de conversion pMCI / sMCI restent souvent ADNI seuls (Raza et al., 2024 ; Vashishath et al., 2026). Un modèle ADNI ne se transporte pas automatiquement vers une cohorte en population (Gianattasio et al.).

Trois échecs méthodologiques reviennent. Un partitionnement *par visite* fuit l’identité du patient en IRM longitudinale et gonfle les performances (Yagis et al. ; Theocharidis et al., 2026). Jeter les cas sans TEP ni LCR sélectionne les bilans les plus lourds (Park et al., MOIRA, 2025 ; Hassan et al., 2025). Les signatures ADRD restent largement eurocentriques : Tan et al. (2026) le formulent pour l’Asie et l’Afrique ; Pola, Akinyemi et al. (2026) montrent des profils protéomiques plasmatiques au Nigeria et en Tanzanie distincts des cohortes du Nord. Les données africaines, une fois harmonisées, restent un test de transportabilité *ultérieur* — hors des huit semaines, mais c’est la raison pour laquelle le protocole doit être honnête dès maintenant.

Le trou n’est donc pas « un modèle plus profond ». C’est un protocole honnête : phénotypes alignés, split au niveau participant, conservation des profils incomplets, calibration et analyse par courbes de décision en plus de l’AUC, interprétation (SHAP) et équité, puis un paquet de données encore utile lorsque l’imagerie ou les biomarqueurs manquent.

Ces extraits NACC, ADNI et Framingham sont des **données de santé confidentielles**. Ils ne circulent pas dans ce rapport. Le livrable de la partie principale est un **plan d’analyse**, soumis pour **ouvrir l’accès** sous accord d’utilisation (DUA). En attendant, un volet empirique sur la cohorte **publique** OASIS-2 permet une étude de modèles et une démonstration sur une interface dédiée. Ce volet ne remplace pas le sujet officiel.

### QUESTION DE RECHERCHE

> **Comment estimer, sans fuite longitudinale et avec une validation externe, le risque de conversion du trouble cognitif léger vers la démence à 2 et 5 ans, à partir de données multimodales incomplètes issues de NACC, ADNI et Framingham, et quel paquet de données minimal reste cliniquement utile ?**

Question secondaire (volet complémentaire) : sur OASIS-2, quels modèles de détection précoce retient-on, et comment les exposer dans une interface de démonstration, sans ouvrir les cohortes confidentielles ?

### HYPOTHESE

Un modèle multimodal au niveau participant, entraîné sur une cohorte et testé sur une autre, conservera une discrimination et une calibration plus stables que des modèles cas-complets partitionnés par visite. Les variables cliniques et cognitives formeront le paquet minimal utile ; l’IRM et les biomarqueurs amélioreront davantage la calibration que la discrimination, sur le sous-ensemble qui en dispose.

### OBJECTIFS

Alignés sur le cadrage du stage et sur le plan d’analyse (annexe) :

1. **Aim 1.** Construire une table d’analyse sans fuite et un phénotype de conversion aligné (visite index MCI, démence, horizons 2 et 5 ans) sur NACC, ADNI et Framingham.
2. **Aim 2.** Entraîner et comparer des modèles pronostiques (logistique, Cox, forêts aléatoires, XGBoost) avec fusion tardive et gestion des modalités manquantes, sans suppression des cas incomplets.
3. **Aim 3.** Valider en externe, calibrer, appliquer l’analyse par courbes de décision et le SHAP, contrôler l’équité, et classer des paquets emboîtés (clinique, puis cognitif, puis imagerie, puis biomarqueurs / génétique) pour identifier le paquet minimal.

Objectif opérationnel du volet II : mener l’étude de modèles sur OASIS-2, retenir les plus performants, et les démontrer sur une interface dédiée.

### PERIMETRE ET CONFIDENTIALITE

Les **extraits individuels** NACC, ADNI et Framingham ne sont pas annexés : ce sont des données de santé sous accord d’utilisation (DUA). En revanche, ce que les cohortes contiennent, leurs procédures d’accès et leurs publications sont **publics** : on les cite (documentation, revues, papiers Qiu/Xue, etc.). La première consigne était de les **repérer** en ligne et de **signaler** les barrières. Le plan d’analyse formalise la demande des extraits complets. **Aucune donnée identifiée**, aucun tableau d’effectifs réel, aucun AUC sur ces extraits n’apparaît tant que l’accès n’est pas ouvert. OASIS-2, publique, est le seul jeu empirique du document. Les données africaines restent un test de transportabilité ultérieur.

### PLAN DU RAPPORT

La suite du rapport comprend cinq chapitres, suivis d’une conclusion générale.

- **Chapitre 1.** Présentation de l’environnement de stage (UMMISCO, AI-BOND / Glenn Biggs, organisation des huit semaines).
- **Chapitre 2.** Concepts nécessaires, related work, bilan et positionnement (comme un article ; les généralités ne font pas un chapitre à part).
- **Chapitre 3.** Protocole (plan d’analyse) ; texte intégral en annexe A.
- **Chapitre 4.** Detecting Early Alzheimer’s : données OASIS-2 et étude de modèles.
- **Chapitre 5.** Résultats retenus et démonstration sur une interface dédiée.

Le travail se clôt par une conclusion (bilan, limites, perspectives), la bibliographie et les annexes (plan d’analyse, note de confidentialité, notice de démo).

*Images (hors intro, pour les chapitres) : schéma MCI / démence ou CDR si tu en trouves un propre — **au plus une** en introduction ; logos labos au ch. 1 ; fuite participant et paquets emboîtés au ch. 3 ; OASIS-2 et captures d’interface aux ch. 4–5. Pas de figure d’article recopiée.*

---

## Chapitre 1 — Présentation de l’environnement de stage

Dans ce chapitre, nous situons le stage : l’unité d’accueil, la collaboration avec UT Health San Antonio, l’encadrement, puis l’organisation des huit semaines.

### UMMISCO

L’Unité de Modélisation Mathématique et Informatique des Systèmes Complexes (UMMISCO) est une Unité Mixte Internationale, sous tutelle notamment de l’IRD et de Sorbonne Université, avec des implantations en France, au Maroc, au Sénégal, au Cameroun et au Vietnam. Elle développe des méthodes mathématiques et informatiques pour la modélisation des systèmes complexes, naturels, biologiques ou sociaux.

La sous-section Afrique centrale et de l’Est, qui accueille ce stage, est rattachée à l’Université de Yaoundé I. Elle est dirigée par **Pr Paulin Melatagia Yonta**, enseignant-chercheur en informatique, UMR UMMISCO (IRD/SU). L’équipe de recherche **IDASCO** (IA et Sciences de Données) y travaille, entre autres, sur l’apprentissage automatique appliqué à des problèmes de santé et de société. Le stage se déroule dans ce cadre, sous la supervision principale de **Pr Norbert Tsopze, PhD** (Université de Yaoundé I ; Université d’Artois).

**[FIG. — ch. 1 : logos UMMISCO + Université de Yaoundé I + ENSPY. Une photo d’équipe n’est pas obligatoire.]**

### Collaboration Glenn Biggs Institute / AI-BOND

Le volet scientifique international est assuré avec **Bernard Fongang, PhD**, Associate Professor à UT Health San Antonio, Program Director d’**AI-BOND**, au Glenn Biggs Institute for Alzheimer’s and Neurodegenerative Diseases. Le plan d’analyse suit la pratique de ce laboratoire (aims, phénotypes à figer, métriques au-delà de l’AUC). Les extraits NACC, ADNI et Framingham, s’ils sont transmis, le seront sous les accords d’utilisation du laboratoire, non comme fichiers publics annexés au rapport.

**[FIG. — ch. 1 : logos UT Health San Antonio / Glenn Biggs / AI-BOND, si tu les trouves en usage libre.]**

### Encadrement

| Rôle | Personne |
|---|---|
| Superviseur principal | Pr Norbert Tsopze, PhD, UMMISCO, Université de Yaoundé I |
| Co-encadrement | Bernard Fongang, PhD, Associate Professor, UT Health San Antonio ; Program Director, AI-BOND |
| Co-encadrement | Pr Paulin Melatagia Yonta, Directeur UMMISCO Afrique centrale et de l’Est ; UMR UMMISCO (IRD/SU) |

Le stagiaire, TCHOUTZINE Balbino, est élève-ingénieur en Génie informatique à l’ENSPY (stage pré-ingénieur, huit semaines).

### Organisation du travail

Le calendrier (24 juillet – 24 septembre 2026) s’organise autour de quatre blocs, sans prétendre exécuter les modèles NACC/ADNI/Framingham tant que les extraits ne sont pas ouverts :

1. **Cadrage.** Sujet, cohortes à repérer, barrières d’accès, consignes d’analyse (logistique/Cox, forêts/XGBoost, calibration, DCA, splits participant, SHAP, équité).
2. **Littérature.** Lectures assignées (CARD/NIH, Xue et al. 2024, MOIRA) et corpus des 14 articles ; cartographie de ce qui existe déjà sur les trois cohortes et sur la conversion.
3. **Plan d’analyse.** Document au format du laboratoire Fongang / AI-BOND : trois aims, phénotypes, modèles emboîtés, confidentialité. C’est le livrable de la partie principale.
4. **Volet empirique.** Étude de modèles sur OASIS-2 (*Detecting Early Alzheimer’s*) et démonstration sur une interface dédiée, le temps que les extraits confidentiels restent hors rapport.

Les généralités (MCI, CDR, fusion, fuites) ne font pas un chapitre isolé : elles ouvrent le chapitre 2, puis le related work et le positionnement, comme dans un article.

---

## Chapitre 2 — Concepts, related work et positionnement

Ce chapitre donne d’abord les notions indispensables, puis les travaux existants (lectures du stage et corpus des 14 articles), enfin un bilan et un positionnement. Les définitions restent au service de la question : conversion à 2 et 5 ans, sans fuite, sur NACC, ADNI et Framingham.

### Concepts nécessaires

Le **trouble cognitif léger (MCI)** est un déficit objectivable, plus marqué qu’un oubli d’âge, alors que les activités quotidiennes restent globalement possibles. La **démence** s’accompagne d’une perte d’autonomie. Ici, le MCI est le *point de départ* (visite index) et la démence l’*issue ultérieure*, jamais le diagnostic de la même visite.

**[FIG. 2.1]** Continuité cognition normale → MCI → démence (autonomie).  
*Google :* `normal aging MCI dementia continuum diagram` · ou `mild cognitive impairment vs dementia infographic`

Le **CDR** (Clinical Dementia Rating) stade : 0 (cognition normale), 0,5 (souvent compatible avec un MCI), supérieur ou égal à 1 (démence). Le CDR-SB (somme des boîtes) est plus fin. Ces scores peuvent prédire un *risque futur* ; les utiliser pour « prédire » le CDR de la *même* visite est une fuite de cible. Les batteries brèves (MMSE, MoCA) et les scores de domaines forment le cœur du paquet clinique–cognitif.

**[FIG. 2.2]** Échelle CDR (0 / 0,5 / 1 / 2 / 3) ou les six domaines (mémoire, orientation, etc.).  
*Google :* `Clinical Dementia Rating CDR scale diagram` · ou `CDR sum of boxes domains`

Le cadre **A/T/N** (amyloïde, tau, neurodegeneration) aide à classer les biomarqueurs : l’IRM volumétrique (hippocampe, cortex médio-temporal) est surtout un marqueur N ; l’APOE ε4 un facteur de risque génétique, pas un diagnostic. TEP et LCR sont structurellement plus rares que la clinique et l’IRM : filtrer sur la complétude biaise l’échantillon.

**[FIG. 2.3]** Schéma A/T/N (amyloïde · tau · atrophie IRM).  
*Google :* `ATN framework Alzheimer Jack 2018 diagram` · ou `amyloid tau neurodegeneration biomarkers schematic`

Deux fuites dominent les cohortes longitudinales. Un split **par visite** place deux examens du même sujet en entraînement et en test : le modèle apprend une identité (crâne, scanner) plutôt qu’une conversion. Un prétraitement **global** (imputation, normalisation, sélection) ajusté aussi sur le test fuit de la même façon. La règle : toutes les visites d’une personne dans une seule partition ; tout paramètre appris sur l’entraînement seul.

**[FIG. 2.4]** Split visite (même ID des deux côtés) vs split participant.  
*Google :* `subject-wise vs record-wise split data leakage MRI diagram` · ou `longitudinal MRI data leakage train test same patient`

Clinique, génétique et IRM n’ont pas la même échelle. La **fusion précoce** concatène tout (l’IRM noie souvent le FAQ et l’APOE). La **fusion tardive** entraîne un modèle par modalité puis combine les probabilités. La **fusion intermédiaire** aligne des espaces latents, plus coûteuse. Pour huit semaines, la fusion tardive est le défaut.

**[FIG. 2.5]** Trois colonnes : early / intermediate / late fusion.  
*Google :* `early late intermediate multimodal fusion diagram` · ou `multimodal fusion early late schematic machine learning`

### Related work

La conversion du MCI vers la démence Alzheimer est l’objectif le plus fréquent des modèles multimodaux (Xia et al., 2025). Plus de la moitié rapportent une AUC supérieure à 0,8. Ce n’est plus une contribution : 66,7 % des modèles sont entraînés sur ADNI et 10,1 % seulement sont validés en externe. Chen et al. (2024, PROBAST) confirment une AUC moyenne de 0,87, un biais élevé ou incertain, et presque aucun test hors cohorte. Les associations mesurées dans ADNI (clinique, haute éducation) ne se transportent pas automatiquement vers un échantillon communautaire (Gianattasio et al.).

Le CARD/NIH cadre l’IA comme harmonisation, détection de motifs, prédiction et priorisation de cibles. Le protocole du stage couvre surtout l’harmonisation, la prédiction à 2 et 5 ans, et la priorisation via le paquet minimal.

Les systèmes les plus proches des **trois** cohortes visées sont ceux du laboratoire Kolachalama. Qiu et al. (2022, *Nature Communications*) entraînent un cadre multimodal (clinique + IRM, CNN et CatBoost, imputation des manquants) sur NACC et le testent notamment sur ADNI et Framingham. Xue et al. (2024, *Nature Medicine*) étendent l’approche : 51 269 participants, neuf cohortes, transformer robuste aux modalités manquantes, test externe ADNI et Framingham, AUROC 0,94 pour NC / MCI / démence. **Ce que l’on retient** : manquants, multi-cohortes, Framingham comme test populationnel. **Ce que l’on ne copie pas** : leur issue est un diagnostic différentiel *actuel*, pas un risque de conversion prospectif.

Liu et al. (2022) montrent qu’un CNN 3D IRM entraîné sur ADNI se généralise à NACC, et que les MCI classés « Alzheimer » progressent plus vite. Raza et al. (2024) et Vashishath et al. (2026) traitent explicitement pMCI versus sMCI, mais **sur ADNI** (IRM hybride pour les uns, multi-omiques sanguins et discussion anti-fuite pour les autres). Hassan et al. (2025, MINDSETS) insistent sur le split *par patient* et l’imputation, sur une autre cohorte (ANMerge). Park et al. (MOIRA, 2025) montrent sur ROSMAP que garder les profils incomplets bat le cas complet. Yagis et al. et Theocharidis et al. (2026, OASIS-3) documentent la fuite liée aux scans répétés et le design *person-wise*.

Tan et al. (2026) formulent le biais ancestral et l’absence de cohortes africaines dans les scores de risque. Pola, Akinyemi et al. (2026) rapportent des signatures protéomiques plasmatiques au Nigeria et en Tanzanie, distinctes d’une cohorte canadienne : l’équité n’est pas un slogan, c’est un décalage de biologie et d’échantillonnage. Ces données africaines restent un test de transportabilité *après* les huit semaines.

L’évaluation ne se réduit pas à l’AUC : calibration (un risque de 30 % vaut-il 30 % d’événements ?), analyse par courbes de décision (bénéfice net contre « traiter tout le monde » / « ne traiter personne »), SHAP pour l’individu, et tranches d’équité (âge, sexe, éducation, ancestralité) trop rarement rapportées.

### Bilan et positionnement

| Fait de la littérature | Position de ce stage |
|---|---|
| Conversion = tâche n°1, AUC souvent > 0,8 | Ce n’est plus l’objectif d’un AUC interne |
| Deux tiers des modèles sur ADNI, ~10 % validés ailleurs | Entraîner et tester à travers NACC, ADNI, Framingham |
| Qiu / Xue : multimodal, manquants, les trois cohortes | Même discipline, **autre** issue (risque 2–5 ans) |
| pMCI / sMCI surtout ADNI (Raza, Vashishath, Liu) | Étendre la conversion hors d’un seul site |
| Fuites par visite ; cas complets | Split participant ; paquets emboîtés, pas de suppression primaire |
| Signatures eurocentriques (Tan ; Pola/Akinyemi) | Équité écrite dans le protocole ; données africaines plus tard |
| OASIS, diagnostic actuel | Volet II empirique, **autre** question, données publiques |

**Phrase de synthèse.** La littérature sait classer l’Alzheimer sur ADNI, et même diagnostiquer en multimodal sur NACC puis tester ADNI et Framingham. Elle n’a pas encore livré, sur ces trois cohortes, un modèle de **conversion à 2 et 5 ans** sans fuite, validé en externe, conscient des modalités manquantes, avec un paquet de données documenté. C’est le trou que le plan d’analyse (chapitre 3) formalise. Le volet OASIS-2 ne le comble pas : il montre une détection précoce *aujourd’hui*, sur un jeu public, le temps que les extraits confidentiels restent hors rapport.

---

## Chapitre 3 — Protocole (plan d’analyse)

Ce chapitre est le **livrable** de la partie I : le protocole figé *avant* les extraits individuels. Le texte intégral soumis aux encadrants est en **annexe A**. Ici on retient ce qui permet de lire le rapport : cohortes (documentation publique), unité d’analyse, phénotypes à verrouiller, modèles 1–4, métriques. Aucun effectif réel, aucun AUC sur NACC/ADNI/Framingham.

### Cohortes visées

La documentation publique suffit à les décrire. Les **fichiers participant** restent sous DUA.

| Cohorte | Ce qu’on en attend (doc publique) | Rôle prévu | Contrainte |
|---|---|---|---|
| **NACC UDS** | Série clinique–cognitive standardisée des ADRC américains | Entraînement clinique / un pli externe | Biais d’adressage |
| **ADNI** | Clinique + IRM + TEP + LCR/plasma + génétique alignés | Entraînement multimodal / un pli externe | Haute éducation, faible diversité, scanners |
| **Framingham** | Suivi en population, risque vasculaire | Validation externe « communauté » | Labels moins « cliniques » ; ancestralité historiquement limitée |

OASIS-3 / EPAD ne servent pas à l’inférence de la partie I. OASIS-2 est le jeu du **chapitre 4**, public, autre question. Les données africaines restent un test ultérieur.

**[FIG. 3.1]** Logos ou cartes très sobres NACC / ADNI / Framingham (sites officiels).  
*Google :* `NACC UDS logo` · `ADNI Alzheimer's Disease Neuroimaging Initiative logo` · `Framingham Heart Study logo`

### Unité d’analyse et anti-fuite

Une ligne = un participant à la **visite index MCI**, avec des variables observées **à cette visite ou avant**. Toutes les visites d’une personne restent dans la même partition. Imputation, mise à l’échelle, sélection, ComBat : appris sur l’entraînement seul. Les profils incomplets (pas de TEP, pas de LCR) **restent**. On n’exclut pas pour absence d’IRM ou de génétique. L’analyse cas-complets n’est qu’un contrôle.

### Phénotypes (à figer avant tout modèle)

| Construit | Règle de travail (à aligner sur les dictionnaires d’extraits) |
|---|---|
| Index MCI | Première visite MCI, indemne de démence (statut clinicien NACC ; diagnostic ADNI ; équivalent FHS selon manuels) |
| Démence | Première visite ultérieure selon les critères de chaque étude |
| Conversion 2 ans | Démence à index + 2 ans ou avant. Suivi trop court sans démence : hors tâche binaire 2 ans, conservé en Cox |
| Conversion 5 ans | Même règle à 5 ans |

Ces règles se verrouillent avec les encadrants. On ne les retouche pas pour « améliorer » une AUC.

### Variables et modèles emboîtés

- **Clinique :** âge, sexe, éducation, risque vasculaire, médicaments, FAQ.  
- **Cognitif :** MMSE ou MoCA, CDR global et CDR-SB, scores de domaines (prédicteurs du *futur*, pas label de la même visite).  
- **IRM :** volumes hippocampiques / médio-temporaux, épaisseur corticale. TEP si disponible.  
- **Biomarqueurs / génétique :** Aβ, t-tau, p-tau ; APOE ε4.

Ajustement primaire : âge, âge², sexe, éducation.

1. **Modèle 1** — clinique–cognitif + âge + âge² + sexe + éducation  
2. **Modèle 2** — modèle 1 + vasculaire + médicaments  
3. **Modèle 3** — modèle 2 + résumés IRM  
4. **Modèle 4** — modèle 3 + biomarqueurs / APOE (conscient des manques)

**[FIG. 3.2]** Quatre couches emboîtées (clinique ⊂ +cognitif ⊂ +IRM ⊂ +biomarqueurs).  
*Google :* `nested models diagram layers` · ou `incremental multimodal feature sets schematic`

Conversion binaire 2 et 5 ans : logistique, forêt aléatoire, XGBoost. Délai jusqu’à la démence : Cox. **Fusion tardive** par défaut. Pas de CNN 3D tant que les résumés tabulaires n’ont pas été évalués.

### Évaluation (ce que le protocole exige, pas des chiffres)

Discrimination (AUC, C-index), calibration, analyse par courbes de décision, SHAP, équité (âge, sexe, éducation, ancestralité si les cellules tiennent). Rotations externes prévues : NACC vers ADNI, ADNI vers NACC, puis (NACC ou ADNI) vers Framingham.

Le **paquet minimal** (aim 3) est le plus petit modèle emboîté dont le bénéfice net externe reste au-dessus de « traiter tout le monde » / « ne traiter personne », avec une chute d’AUC modeste par rapport au modèle 4.

### Statut

Le plan est **soumis pour ouvrir l’accès** aux extraits. Tant qu’ils ne sont pas transmis, ce chapitre s’arrête ici : pas de tableau démographique rempli, pas de résultat. La suite empirique du rapport est le chapitre 4 (OASIS-2).

---

## Chapitre 4 — Detecting Early Alzheimer’s (OASIS-2)

Ce volet est **complémentaire**. Même maladie, autre question : un **stade actuel** (Nondemented / Demented / Converted) sur un jeu **public**, pas un risque de conversion à 2 et 5 ans sur NACC, ADNI ou Framingham. Il ne donne accès à aucun extrait confidentiel.

L’étude de modèles s’inspire du notebook Kaggle *Detecting Early Alzheimer’s* (hyunseokc), sur la cohorte **OASIS-2** (Marcus et al., 2010 ; fichier `oasis_longitudinal.csv`). Contribution du stage : comparer plusieurs familles de modèles, **retenir les plus performants**, et les exposer dans une interface (chapitre 5).

### Données

OASIS-2 suit 150 participants âgés (environ 60–96 ans), pour 373 visites IRM. Les groupes cliniques sont *Nondemented* (restés non déments), *Demented* (déments dès l’entrée), *Converted* (non déments au départ, déments plus tard). Variables typiques : sexe, âge, éducation, SES, MMSE, CDR, volumes (eTIV, nWBV), ASF.

**[FIG. 4.1]** Distribution des trois groupes (barplot), sans identité. À produire depuis le CSV.  /*Poue ces  figures , ayant deja lzsqs dt    s en local , tu vas generer ca ici avec matplot*/
*Google (contexte) :* `OASIS-2 longitudinal MRI oasis-brains`

### Méthode

Les mêmes garde-fous que la partie I, à petite échelle :

- split **par participant**, pas par visite ;
- **ne pas** mettre le CDR dans les prédicteurs si la cible est le `Group` (le CDR *est* le stade) ;
- comparer au moins logistique, SVM, arbre, forêt aléatoire, puis des modèles **au-delà du notebook** (XGBoost, éventuellement un autre) ;
- métriques : accuracy, précision, rappel, F1, AUC, matrice de confusion.

Le notebook d’origine recode souvent *Converted* avec *Demented* pour un problème binaire. On documente le choix (binaire vs trois classes) avant d’entraîner.

### Lien avec la partie I

OASIS-2 montre qu’un pipeline tabulaire + volumes, anti-fuite, est faisable **sans DUA**. Il ne valide pas le protocole NACC–ADNI–Framingham. Les 14 *Converted* sont trop peu pour un modèle de survie à 2–5 ans analogue à l’aim 1.

---

## Chapitre 5 — Résultats OASIS-2 et démonstration

### Résultats

Les chiffres ci-dessous viennent du run local (`oasis_experiments.py`, seed 42, split stratifié 75/25, **sans CDR**, une ligne par participant à la visite 1). On ne recopie pas les scores du notebook Kaggle.

| Modèle | Accuracy | F1 | AUC test | AUC CV (5 folds) | Remarque |
|---|---|---|---|---|---|
| Forêt aléatoire | 0,71 | 0,69 | **0,75** | 0,88 | **retenu** (meilleur AUC test) |
| SVM | 0,68 | 0,70 | 0,75 | 0,80 | présent chez hyunseokc |
| Logistique | 0,61 | 0,59 | 0,74 | 0,87 | baseline |
| XGBoost | 0,68 | 0,68 | 0,70 | **0,88** | contribution vs Kaggle ; meilleur CV |
| Arbre de décision | 0,68 | 0,68 | 0,68 | 0,81 | |
| AdaBoost | 0,74 | 0,71 | 0,67 | 0,84 | accuracy test haute, AUC plus faible |

L’écart CV (~0,88) / test (~0,75) est attendu : n = 150, test ≈ 38. Le CDR n’entre pas dans X.

**Courbes ROC** (`figures/fig5_roc_all.png`). RF et SVM sont les plus hauts sur le test (AUC 0,75) ; la logistique est juste derrière (0,74) ; XGBoost et AdaBoost descendent (0,70 et 0,67). Les courbes sont en escalier : le test est petit, chaque point pèse lourd.

**Courbes d’apprentissage** (`lc_Logistic.png`, `lc_RandomForest.png`, `lc_XGBoost.png`). RF et XGBoost restent à AUC train ≈ 0,99 tandis que la CV monte lentement vers ~0,87 : **sur-apprentissage** sur 150 lignes. La logistique ferme mieux l’écart (train ~0,91, CV ~0,87) : plus stable, moins spectaculaire. Plus de données réduiraient le trou ; on n’en a pas sur OASIS-2.

**Matrices de confusion** (`cm_*.png`) et **importances** (`fi_*.png`) : le modèle retenu pour la démo est la forêt (meilleur AUC test). XGBoost reste utile en CV et comme contribution vs le notebook Kaggle.

Fichiers : `oasis_outputs/figures/`, modèle `oasis_outputs/models/best_pipeline.joblib`.

### Interface dédiée et conception logicielle

L’interface (**Lumenscreen**) n’est pas un dispositif clinique. Elle a deux rôles : (1) **diagnostic de démonstration** sur un profil OASIS-2 ; (2) **montrer une conception** : Next.js (présentation), FastAPI (application / domaine), joblib figé (infrastructure), contrat d’entrée sans CDR.

Parcours vérifié : protocole et disclaimer → formulaire (aucun champ CDR) → score binaire et importances → prévention → architecture (quatre marches, dossier latéral).

Lancer, depuis `Rapport_Stage_MCI` : `python -m uvicorn lumenscreen.main:app --host 127.0.0.1 --port 8000`, puis `npm run dev` dans `lumenscreen-web`. Site : `http://127.0.0.1:3000`. Code source : [github.com/zoom-BT/lumenscreen-oasis-research-intern](https://github.com/zoom-BT/lumenscreen-oasis-research-intern).

Sur les deux exemples OASIS-2 (visite index) : **OAS2_0001** → Nondemented (p = 0,43) ; **OAS2_0002** → Demented + Converted (p = 0,86), huit importances (MMSE en tête). Viewport des captures : 1280 × 900.

**[FIG. 5.2a]** Protocole et disclaimer (`captures_demo/fig5_2a_protocole.png`).

**[FIG. 5.2b]** Formulaire, contrat sans CDR (`captures_demo/fig5_2b_formulaire.png`).

**[FIG. 5.2c]** Résultat OAS2_0002 : jauge 0,86, classe Demented + Converted (`captures_demo/fig5_2c_resultat.png`).

**[FIG. 5.2d]** Espace préventif (`captures_demo/fig5_2d_prevention.png`).

**[FIG. 5.2e]** Architecture en étages et dossier de couche (`captures_demo/fig5_2e_architecture.png`).

**Diagrammes (Mermaid → images)** : sources dans `diagrams/architecture_demo.md` :

| Fig. | Vue |
|---|---|
| 5.3 | Cas d’utilisation |
| 5.4 | Contexte |
| 5.5 | Architecture en couches |
| 5.6 | Séquence du diagnostic |
| 5.7 | Composants |
| 5.8 | Entraînement vs inférence |
| 5.9 | Déploiement local |

### Limites du volet II

Petit effectif ; *Converted* rare ; pas de TEP/LCR ; pas de validation NACC/ADNI/FHS. Une bonne démo OASIS-2 ne remplace pas le plan d’analyse.

---

## Conclusion générale

Le sujet officiel reste la prédiction multimodale de la conversion du trouble cognitif léger vers la démence, sur NACC, ADNI et Framingham : risque à 2 et 5 ans, sans fuite, validé en externe, paquet minimal. En huit semaines, le livrable de cette partie est un **plan d’analyse** (annexe A), soumis pour **ouvrir l’accès** à des extraits de santé confidentiels. Ce rapport ne contient ni ces extraits, ni d’AUC sur ces cohortes.

Le volet OASIS-2 est une étude plus spécifique d’un point de la partie I (classification tabulaire, anti-fuite, modèles usités) en attendant les extraits NACC, ADNI et Framingham. Les résultats — forêt retenue, limites d’effectif, interface à contrat sans CDR — restent réutilisables une fois les données confidentielles disponibles.

Limites : pas d’exécution NACC/ADNI/FHS ; données africaines hors fenêtre ; pas de CNN 3D. Perspectives : verrouiller les phénotypes sur les dictionnaires, tourner les modèles 1–4, valider en externe, puis un test de transportabilité africain plus tard.

---

## Annexes (à coller au moment du LaTeX)

- **A.** Plan d’analyse (version soumise).
- **B.** Confidentialité : extraits individuels hors rapport ; doc publique citable.
- **C.** Notice de l’interface + rappel « pas un outil diagnostique ».

---

# Plan restant (rappel)

1. ~~Page de garde~~
2. ~~Dédicace + remerciements~~
3. ~~Abréviations + résumé / abstract~~
4. ~~Introduction + confidentialité~~
5. ~~Ch. 1 organisme~~
6. ~~Ch. 2 concepts + related work + positionnement~~
7. ~~Ch. 3 protocole~~
8. ~~Ch. 4–5 OASIS-2 + démo~~ **tableaux résultats et captures à remplir après le code**
9. ~~Conclusion + trame annexes~~
10. LaTeX + PDF
