import jwt from "jsonwebtoken";

const tokenFromHeader = (header?: string) => {
  if (header && header.includes(`Bearer`)) {
    const split = header.split(`Bearer `);
    return split.length > 0 && split[1];
  }

  return null;
};

const userIdFromToken = (
  token?: string | false | null,
): Promise<number | null> => {
  return new Promise((resolve, _) => {
    if (!token) return resolve(null);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return resolve(null);

      const { userId } = payload as any;

      if (userId && typeof userId === "number") {
        return resolve(userId);
      }
    });
  });
};

export const userIdFromHeader = async (header?: string) => {
  return userIdFromToken(tokenFromHeader(header));
};
