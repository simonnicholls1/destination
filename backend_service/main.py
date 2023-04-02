from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from api.v1.routers import post, user, auth, accommodation

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def filter_root_path(request, call_next):
    if request.url.path == "/":
        response = await call_next(request)
        response.headers["X-Suppress-Logging"] = "true"
        return response

    # Call the next middleware in the chain
    response = await call_next(request)

    return response

app.include_router(auth.router, prefix="/destinationapi")
app.include_router(user.router, prefix="/destinationapi")
app.include_router(post.router, prefix="/destinationapi")
app.include_router(accommodation.router, prefix="/destinationapi")

@app.get("/")
def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
