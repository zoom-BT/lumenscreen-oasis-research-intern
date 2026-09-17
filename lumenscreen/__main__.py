from lumenscreen.main import app

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("lumenscreen.main:app", host="127.0.0.1", port=8000, reload=True)
