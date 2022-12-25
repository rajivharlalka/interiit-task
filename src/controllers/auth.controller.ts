import {Request, Response} from "express";
import httpStatus from "http-status";
import {tokenService, userService} from "../services";
import catchAsync from "../utils/catchAsync";

const registerWithEmailandPassword = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  delete user.password;
  const token = await tokenService.generateAuthToken(user);
  res.status(httpStatus.CREATED).json({user, token});
});

const login = catchAsync(async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const user = await userService.loginUserWithEmailandPassword(email, password);
  delete user.password;
  const token = await tokenService.generateAuthToken(user);
  res.status(httpStatus.OK).json({user, token});
});

export default {registerWithEmailandPassword, login};
