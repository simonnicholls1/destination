import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from api.v1.routers import post, user, auth, accommodation, destination

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


app.include_router(auth.router, prefix="/destinationapi")
app.include_router(user.router, prefix="/destinationapi")
app.include_router(post.router, prefix="/destinationapi")
app.include_router(accommodation.router, prefix="/destinationapi")
app.include_router(destination.router, prefix="/destinationapi")

# Define the filter
class EndpointFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return record.args and len(record.args) >= 3 and record.args[2] != "/"

# Add filter to the logger
logging.getLogger("uvicorn.access").addFilter(EndpointFilter())

@app.get("/")
def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
