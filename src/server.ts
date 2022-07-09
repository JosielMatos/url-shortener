import { UrlController } from "./controllers/URLController";
import express from "express";

const app = express();
app.use(express.json());

const urlController = new UrlController();
app.post('/shorten', urlController.shorten);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
