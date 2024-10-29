import express from "express";
import cors from "cors";
import blogRoute from "./routes/blog.mjs"

const app = express();
// const PORT = process.env.PORT || 9050;

app.use(cors());
app.use(blogRoute)

app.get("/", (req, res) => {
  return res.json("Pushing the need to work with Express and SQL Server");
});

app.listen(9050, () => {
  console.log(`Server is running on port`);
});

