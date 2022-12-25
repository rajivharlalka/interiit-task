import {user, TokenType} from "@prisma/client";
import config from "config";
import moment from "moment";
import jwt from "jsonwebtoken";
import prisma from "../utils/dbClient";

const generateToken = (
  userId: number,
  expires: moment.Moment,
  type: string,
  secret: string = config.get("jwt.secret")
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: number,
  expires: moment.Moment,
  type: TokenType,
  blacklisted = false
) => {
  const tokenDoc = await prisma.token.create({
    data: {
      token,
      user_id: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
  return tokenDoc;
};

const generateAuthToken = async (user: user) => {
  const accessTokenExpires = moment().add(config.get("jwt.access_expiration_minutes"), "minutes");
  const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS);

  const refreshTokenExpires = moment().add(config.get("jwt.refresh_expiration_days"), "days");
  const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export default {generateAuthToken};
