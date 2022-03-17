import { connection } from "../database.js";
import shortid from "shortid";

export async function postLink(req, res) {
  const { user } = res.locals;
  const url = req.body;
  const shortUrl = shortid.generate();
  console.log(user);
  console.log(url);
  console.log(shortUrl);
  try {
    // await connection.query(
    //   `
    //   INSERT INTO urls (url,shortUrl,userId) VALUES ($1, $2, $3)
    //   `,
    //   [url, shortUrl, user.id]
    // );
    res.status(201).send({
      shortUrl: shortUrl,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
