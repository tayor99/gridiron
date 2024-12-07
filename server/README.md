# Adenusi Adetayo

## Technical Assessment: AI Playlist Generator API Backend

The **AI Playlist Generator API** is a FastAPI-based application that integrates with the AI21 API to generate playlists for a specified genre. Each playlist includes song titles and their respective artists.

---

## Features

- Generate playlists for a specified genre.
- Automatically parses and formats data received from the AI21 API.
- CORS-enabled for seamless client integration.

---

## Deployment

- **Live API**: [https://gridiron.onrender.com/](https://gridiron.onrender.com/)
- **API Documentation**: [https://gridiron.onrender.com/docs](https://gridiron.onrender.com/docs)

---

## Prerequisites

- Python 3.8+
- FastApi
- AI21 API Key (get one from [AI21 Labs](https://www.ai21.com))

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd server
   ```
2. **Create a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Set Up Environment Variables:**
   - Create a .env file in the root directory and add your AI21 API key:
   ```bash
   AI21_API_KEY=your_ai21_api_key
   ```

---

## Endpoints

### 1. Health Check

- **URL**: `/`
- **Method**: `GET`
- **Description**: Verifies that the API is live.
- **Response**:
  ```json
  "Api is live"
  ```

### 2. Generate Playlist

- **URL**: `/playlist`
- **Method**: `POST`
- **Response**:
  ```json
  {
    "genre": "string"
  }
  ```

---

## Example Usage

### Request

      curl -X POST "https://gridiron.onrender.com/playlist" \
      -H "Content-Type: application/json" \
      -d '{"genre": "rock"}

### Response:

     ```json
    [
     {
       "title": "Bohemian Rhapsody",
       "artist": "Queen",
       "genre": "String"
     },
     {
       "title": "Stairway to Heaven",
       "artist": "Led Zeppelin",
       "genre": "String"
      }
    ]

## Development

### Running the Server

1.  **Start the FastAPI development server**:

```
uvicorn app:app --reload
```

The API will be accessible at `http://127.0.0.1:8000.`

### Testing Endpoints

Visit `http://127.0.0.1:8000/docs` for interactive API documentation (powered by Swagger UI).
