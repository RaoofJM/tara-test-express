import express from 'express';
import controller from '../../controllers/user';
import validator, { ValidationSource } from '../../helpers/validator';
import shcema from './schema';

const router = express.Router();

// POST - /user/create - Create Handler
router.post(
  '/create',
  validator(shcema.create, ValidationSource.BODY),
  controller.create,
);

// PUT - /user/update/:id - Update Handler
router.put(
  '/update/:id',
  validator(shcema.update, ValidationSource.BODY),
  controller.update,
);

// DELETE - /user/delete/:id - Delete Handler
router.delete('/delete/:id', controller.remove);

// GET - /user/all - Find All Users
router.get('/all', controller.findAll);

// GET - /user/male - Find Male Users
router.get('/male', controller.findMale);

// GET - /user/female - Find Female Users
router.get('/female', controller.findFemale);

// GET - /user/under30 - Find Under 30 Users
router.get('/under30', controller.findUnder30);

// GET - /user/over30 - Find Over 30 Users
router.get('/over30', controller.findOver30);

// GET - /user/:id - Find One User
router.get('/:id', controller.findOne);

export default router;
