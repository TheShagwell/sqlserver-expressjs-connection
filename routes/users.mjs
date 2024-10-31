import express from "express";
import * as usersController from "../controllers/userControllers.mjs";

const router = express.Router();

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
// router.get('/search', usersController.searchByDetails)
router.post('/users', usersController.createUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);


export default router;