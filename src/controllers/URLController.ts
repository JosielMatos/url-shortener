import { config } from "../config/Constants";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { URLmodel } from "../database/models/URL";

export class UrlController {
  public async shorten(req: Request, res: Response): Promise<void> {
    //captura da url original
    const { originURL } = req.body;

    //verificar se já existe a url no banco de dados
    const url = await URLmodel.findOne({ originURL });
    if (url) {
      res.json(url);
      return;
    }

    //gerar o hash
    const hash = nanoid();

    //nova url usando o hash
    const shortURL = `${config.API_URL}/${hash}`;

    const newUrl = await URLmodel.create({ originURL, hash, shortURL });

    res.json(newUrl);
  }

  //Pegar a url encurtada e redirecionar para o link original
  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    const url = await URLmodel.findOne({ hash });

    if (url) {
      res.redirect(url.originURL);
      return;
    }

    res.status(400).json({ erro: "URL não encontrada" });
  }
}
