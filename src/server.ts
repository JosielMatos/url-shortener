import express from "express";
import dotenv from "dotenv";
import { UrlController } from "./controllers/URLController";
import { MongoConnection } from "./database/MongoConnection";

dotenv.config();

const app = express();
app.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new UrlController();
app.post("/shorten", urlController.shorten);
app.get("/:hash", urlController.redirect);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
