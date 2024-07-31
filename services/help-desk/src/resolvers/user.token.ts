import jwt from "jsonwebtoken";

const JWT_SECRET = "Happy";
const JWT_REFRESH_SECRET = "HappyRefresh"

export const createTokens = (userId: string): {
    accessToken: string;
    refreshToken: string;
} => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({userId}, JWT_REFRESH_SECRET, {
    expiresIn: "24h"
  })

  return {accessToken, refreshToken}
};

