import { config } from "../config/Constants";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

export class UrlController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;
    const hash = nanoid();
    const shortURL = `${config.API_URL}/${hash}`;

    res.json({ originURL, shortURL });
  }
}
