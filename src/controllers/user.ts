import { Request, Response, NextFunction } from 'express';
import UserRepo from '../database/repository/user';
import { BadRequestError, NotFoundError } from '../core/apiError';
import { SuccessMsgResponse, SuccessResponse } from '../core/apiResponse';
import User from '../database/model/user';

// POST - /user/create - Create Handler
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const user: User = req.body;

    const isEmailInUse = await UserRepo.findByEmail(user.email);
    if (isEmailInUse) {
      throw new BadRequestError('Email is Already Taken');
    }

    await UserRepo.create(user);

    return new SuccessMsgResponse('success').send(res);
  } catch (err) {
    next(err);
  }
}

// PUT - /user/update/:id - Update Handler
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const user: User = req.body;
    const id = req.params.id;

    const isUserValid = await UserRepo.findById(id);
    if (!isUserValid) throw new NotFoundError('User not found');

    const isEmailInUse = await UserRepo.findByEmail(user.email);
    if (isEmailInUse) {
      throw new BadRequestError('Email is Already Taken');
    }

    await UserRepo.update(user, id);

    return new SuccessMsgResponse('success').send(res);
  } catch (err) {
    next(err);
  }
}

// DELETE - /user/delete/:id - Delete Handler
async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const user = await UserRepo.findById(id);
    if (!user) throw new NotFoundError('User not found');

    await UserRepo.remove(user._id);

    return new SuccessMsgResponse('success').send(res);
  } catch (err) {
    next(err);
  }
}

// GET - /user/:id - Find One User
async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const user = await UserRepo.findById(id);
    if (!user) throw new NotFoundError('User not found');

    return new SuccessResponse('success', user).send(res);
  } catch (err) {
    next(err);
  }
}

// GET - /user/all - Find All Users
async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserRepo.findAll();
    return new SuccessResponse('success', users).send(res);
  } catch (err) {
    next(err);
  }
}

// GET - /user/male - Find Male Users
async function findMale(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserRepo.findMaleUsers();
    return new SuccessResponse('success', users).send(res);
  } catch (err) {
    next(err);
  }
}

// GET - /user/female - Find Female Users
async function findFemale(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserRepo.findFemaleUsers();
    return new SuccessResponse('success', users).send(res);
  } catch (err) {
    next(err);
  }
}

// GET - /user/over30 - Find Over 30 Users
async function findOver30(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserRepo.findUsersOver30();
    return new SuccessResponse('success', users).send(res);
  } catch (err) {
    next(err);
  }
}

// GET - /user/under30 - Find Under 30 Users
async function findUnder30(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserRepo.findUsersUnder30();
    return new SuccessResponse('success', users).send(res);
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  update,
  remove,
  findOne,
  findAll,
  findFemale,
  findMale,
  findOver30,
  findUnder30,
};
