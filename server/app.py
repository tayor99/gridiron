import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import ai21
from ai21 import AI21Client
from ai21.models.chat import UserMessage

load_dotenv()

client = AI21Client(api_key=os.getenv("AI21_API_KEY"))

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Request model for validation
class GenreRequest(BaseModel):
    genre: str


@app.post("/playlist")
async def generate_playlist(request: GenreRequest):
    genre = request.genre.capitalize()

    messages = [
        UserMessage(
            content=f"List 5 songs in the {genre} genre with their titles and artists:"
        )
    ]
    
    response = client.chat.completions.create(
        model="jamba-1.5-large", # Choose the model (j2-light, j2-large, j2-jumbo)
        messages=messages,
        top_p=1.0 
    )

    return { "response": response }
