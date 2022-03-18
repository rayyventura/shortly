import bcrypt from "bcrypt";
import { connection } from "../database.js";

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = await connection.query(
      "SELECT * FROM users WHERE email=$1",
      [user.email]
    );
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await connection.query(
      `
      INSERT INTO 
        users(name, email, password) 
      VALUES ($1, $2, $3)
    `,
      [user.name, user.email, passwordHash]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUser(req, res) {
  const { user } = res.locals;

  try {
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserUrls(req, res) {
  const { id } = req.params;
  let userViews = 0;
  try {
    const { rows: existingUser } = await connection.query(
      `
    SELECT id,name FROM users WHERE id=$1 
    `,
      [id]
    );

    if (!existingUser[0]) {
      return res.sendStatus(404);
    }

    let urls = await connection.query(
      {
        text: ` SELECT 
      id,
     "shortUrl",
      url,
     viewscount
     FROM urls
     WHERE userid=$1
     `,
        rowMode: "array",
      },
      [id]
    );

    const userUrls = urls.rows.map((row) => {
      const [id, shortUrl, url, viewsCount] = row;
      return {
        id,
        shortUrl,
        url,
        viewsCount,
      };
    });

    userUrls.forEach((row) => {
      userViews += row.viewsCount;
    });
    console.log(userViews);
    const answer = {
      id: existingUser[0].id,
      name: existingUser[0].name,
      viewsCount: userViews,
      shortenedUrls: userUrls,
    };
    res.status(200).send(answer);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
