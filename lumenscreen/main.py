from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from lumenscreen.application.diagnosis_service import DiagnosisService
from lumenscreen.application.validator import ContratViole, validate_payload
from lumenscreen.domain.contract import FEATURES, FEATURE_LABELS, FORBIDDEN_FIELDS
from lumenscreen.domain.policy import DISCLAIMER, MODEL_NOTE, THRESHOLD
from lumenscreen.infrastructure.ml_adapter import SklearnInferenceAdapter

adapter = SklearnInferenceAdapter()
service = DiagnosisService(adapter)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    adapter.load()
    yield


app = FastAPI(
    title="Lumenscreen",
    description="API diagnostic OASIS-2 — UMMISCO / stage 4GI. Non clinique.",
    version="0.1.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict:
    return {
        "ok": adapter.ready,
        "model": adapter.model_name,
        "features": list(FEATURES),
        "threshold": THRESHOLD,
        "note": MODEL_NOTE,
        "path": str(adapter.model_path),
    }


@app.get("/api/contrat")
def contrat() -> dict:
    return {
        "features": list(FEATURES),
        "labels": FEATURE_LABELS,
        "forbidden": sorted(FORBIDDEN_FIELDS),
        "disclaimer": DISCLAIMER,
        "note": MODEL_NOTE,
        "threshold": THRESHOLD,
    }


@app.post("/api/diagnose")
def diagnose(payload: dict) -> dict:
    try:
        profile = validate_payload(payload)
        return service.diagnose(profile).as_dict()
    except ContratViole as exc:
        raise HTTPException(
            status_code=400,
            detail={"error": str(exc), "code": exc.code},
        ) from exc
