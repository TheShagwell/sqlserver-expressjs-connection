import sql from "mssql";
import config from "../config.mjs";

async function getAllUsers(req, res) {
  try {
    const pool = await sql.connect(config);
    const data = await pool.request().query("select * from Users");
    res.json(data.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getUserById(req, res) {
  try {
    // Validate and sanitize the id 
    const id = parseInt(req.params.id);
    if(isNaN(id) || id <= 0)
      return res.status(400).send("Invalid ID");

    const pool = await sql.connect(config);
    const data = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * from Users WHERE id = @id"); 
    
      if(data.recordset.length === 0)
        return res.status(404).send({ message: "User not found!" })
  
    res.json(data.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function createUser(req, res) {
  try {
    const pool = await sql.connect(config);

     // Basic email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(req.body.email)) {
       return res.status(400).send("Please enter a valid email address");
     }

    // Check if username is already taken
    const checkUsername = await pool
      .request()
      .input("name", sql.NVarChar, req.body.name)
      .query("SELECT COUNT(*) as count FROM Users WHERE name = @name");

    if (checkUsername.recordset[0].count > 0) {
      return res.status(400).send("Username is already taken");
    }

    // Check if email already exists in the database
    const checkEmail = await pool
      .request()
      .input("email", sql.NVarChar, req.body.email)
      .query("SELECT COUNT(*) as count FROM Users WHERE email = @email");

    const count = checkEmail.recordset[0].count;

    if (count > 0) 
      return res.status(400).send("Email is already in use");

    if (!req.body.name || !req.body.email)
      return res.status(400).send("Required field must be filled");

    const data = await pool
      .request()
      .input("name", sql.NVarChar, req.body.name)
      .input("email", sql.NVarChar, req.body.email)
      .query(
        "INSERT INTO Users (name, email) VALUES (@name, @email); SELECT CAST(SCOPE_IDENTITY() as int)"
      );
    res.status(201).json({ id: data.recordset[0][""] });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function updateUser(req, res) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("name", sql.NVarChar, req.body.name)
      .input("description", sql.NVarChar, req.body.description)
      .query(
        "UPDATE Users SET name = @name, description = @description WHERE id = @id"
      );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteUser(req, res) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM Users WHERE id = @id");
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };

