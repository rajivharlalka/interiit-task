import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import prisma from "../utils/dbClient";
import encrypt from "../utils/encrypt";
import {user} from "@prisma/client";

async function createUser(userBody: user) {
  if (await prisma.user.findFirst({where: {email: userBody.email}})) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email Already exists");
  }

  userBody.password = await encrypt.EncryptPass(userBody.password);

  return prisma.user.create({data: userBody});
}

async function loginUserWithEmailandPassword(email: string, password: string) {
  const user = await prisma.user.findFirst({where: {email}});
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Account with this email does not exist");
  }

  const verify = await encrypt.checkPass(user.password, password);
  if (!verify) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Password");
  }

  return user;
}

export default {createUser, loginUserWithEmailandPassword};
