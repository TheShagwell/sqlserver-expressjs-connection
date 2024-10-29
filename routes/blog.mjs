import sql from "mssql";
import { Router } from "express";
import config from "../config.mjs";

const router = Router();

router.get("/NewsBlog", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query("select * from News");
    data.then((believe) => {
      return res.json(believe);
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;