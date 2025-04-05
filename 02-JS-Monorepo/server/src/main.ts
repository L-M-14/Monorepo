// Load environment variables from .env file
import "dotenv/config";

import express from "express";
import type { RequestHandler } from "express";
import "../database/checkConnection";
import app from "./app";

const sayWelcome: RequestHandler = (req, res) => {
  res.send("Welcome to Wild Series !");
};

app.get("/", sayWelcome);

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });
