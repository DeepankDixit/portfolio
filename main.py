from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import contact

app = FastAPI(title="Deepank Dixit — Portfolio")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Include routers
app.include_router(contact.router)


# ---------------------------------------------------------------------------
# Page routes
# ---------------------------------------------------------------------------

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse(request, "index.html")


# ---------------------------------------------------------------------------
# Run locally with: uvicorn main:app --reload
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
