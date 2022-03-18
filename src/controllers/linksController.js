import { connection } from "../database.js";
import shortid from "shortid";

export async function postLink(req, res) {
  const { user } = res.locals;
  const url = req.body;
  const shortUrl = shortid.generate();

  try {
    await connection.query(
      `
       INSERT INTO urls (url,"shortUrl",userId) VALUES ($1, $2, $3)
       `,
      [url, shortUrl, user.id]
    );
    res.status(201).send({
      shortUrl: shortUrl,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function getUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const { rows: existingUrl } = await connection.query(
      `
      SELECT *  FROM urls WHERE "shortUrl"=$1
     `,
      [shortUrl]
    );
    if (!existingUrl[0]) {
      return res.sendStatus(404);
    }

    delete existingUrl[0].userid;
    res.send(existingUrl[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
