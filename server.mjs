import express from "express";
import cors from "cors";
import {specs, swaggerUi} from './swagger.mjs';
import blogRoute from "./routes/blog.mjs"
import usersRoute from "./routes/users.mjs"

const app = express();
const PORT = process.env.PORT || 9050;

// *** This process below runs like water-fall that is "It runs from top-to-bottom"
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true}));

app.use(express.json());

app.use(cors());
app.use(blogRoute);
app.use("/api", usersRoute);

app.get("/", (req, res) => {
  return res.json("Pushing the need to work with Express and SQL Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`)
});

