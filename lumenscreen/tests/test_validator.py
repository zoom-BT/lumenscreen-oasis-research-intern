from lumenscreen.application.validator import ContratViole, validate_payload


def test_rejects_cdr():
    try:
        validate_payload(
            {
                "sex": "F",
                "Age": 75,
                "EDUC": 12,
                "MMSE": 28,
                "eTIV": 1500,
                "nWBV": 0.72,
                "ASF": 1.1,
                "CDR": 0.5,
            }
        )
    except ContratViole as exc:
        assert exc.code == "forbidden"
        return
    raise AssertionError("CDR aurait dû être refusé")


def test_accepts_oasis_row():
    profile = validate_payload(
        {
            "sex": "M",
            "Age": 87,
            "EDUC": 14,
            "SES": 2,
            "MMSE": 27,
            "eTIV": 1987,
            "nWBV": 0.696,
            "ASF": 0.883,
        }
    )
    assert profile.sex_male == 1
    assert profile.SES == 2.0
