#!/bin/bash

# Set the host and port for the FastAPI server
HOST="0.0.0.0"
PORT="8000"

# Define the log file
LOG_FILE="server.log"

# Function to start the server
start_server() {
    echo "Starting FastAPI server on http://$HOST:$PORT..."
    uvicorn app:app --host $HOST --port $PORT --reload > "$LOG_FILE" 2>&1 &
    SERVER_PID=$!
    echo "Server started with PID $SERVER_PID. Logs are being written to $LOG_FILE"
}

# Function to display the logs
show_logs() {
    echo "Displaying logs from $LOG_FILE..."
    tail -f "$LOG_FILE"
}

# Trap to handle script exit and kill server process
trap 'echo "Stopping server..."; kill $SERVER_PID; exit 0' SIGINT SIGTERM

# Start the server
start_server

# Show the logs
show_logs
