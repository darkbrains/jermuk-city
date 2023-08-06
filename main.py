import uvicorn
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get('/api/healthz')
def healthz(request: Request):
    return templates.TemplateResponse("healthz.html", {"request": request})

@app.get("/")
def root():
    return RedirectResponse(url="/en")

@app.get("/{language}")
def home(request: Request, language: str):
    valid_languages = ["en", "am", "ru"]
    if language not in valid_languages:
        return RedirectResponse(url="/en")

    return templates.TemplateResponse(f"index_{language}.html", {"request": request})

@app.get("/hotels/{language}")
def home(request: Request, language: str):
    valid_languages = ["en", "am", "ru"]
    if language not in valid_languages:
        return RedirectResponse(url="/en")

    return templates.TemplateResponse(f"hotels_{language}.html", {"request": request})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8888)
