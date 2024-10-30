import express from "express";
import * as usersController from "../controllers/userControllers.mjs";

const router = express.Router();

router.get('/users', usersController.getAllItems);
router.get('/users/:id', usersController.getItemById);
// router.get('/search', usersController.searchByDetails)
router.post('/users', usersController.createItem);
router.put('/users/:id', usersController.updateItem);
router.delete('/users/:id', usersController.deleteItem);


export default router;