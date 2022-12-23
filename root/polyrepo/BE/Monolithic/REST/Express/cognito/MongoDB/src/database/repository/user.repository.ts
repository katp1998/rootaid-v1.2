
//koa was not used in this process
import { User } from "../models/user.model";

//@DESC: FIND IF USER EXISTS
//@ROUTE: POST
export const findUser = async (email: string) => {
  const existingUser = await User.findOneBy({ email });
  return existingUser;
};

//@desc CREATING USER
//@route POST
export const createUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOneBy({ email });
  if (!existingUser) {
    try {
      //CREATE USER:
      const user = await User.save({
        username,
        email,
        password,
      });
      return user;
    } catch (error) {
      return error;
    }
  } else {
    return { message: "user exists" };
  }
};

//@desc FIND USER BY TOKEN
//@route POST
export const findUserByToken = async (RefreshToken: string) => {
  try {
    const existingUser = await User.findOneBy({ refreshToken: RefreshToken });
    return existingUser;
  } catch (error) {}
};

//@desc SAVING REFRESH TOKEN
//@route POST
export const saveRefreshToken = async (
  userID: string,
  RefreshToken: string
) => {
  //finding the user according to ID and update:
  await User.createQueryBuilder()
    .update(User)
    .set({ refreshToken: RefreshToken })
    .where("_id = :_id", { _id: userID })
    .execute();
};

//@desc FINDING USER BY ID
//@route POST
export const findUserById = async (id: string) => {
  try {
    const existingUser = await User.createQueryBuilder("user")
      .where("_id = :_id", { _id: id })
      .select(["user.password", "user.refreshToken"]);
    console.log(existingUser);
  } catch (error) {
    return {
      error: "error",
    };
  }
};

//@desc REMOVING REFRESH TOKEN
//@route POST
export const removeRefreshToken = async (RefreshToken: string) => {
  try {
    const user = await findUserByToken(RefreshToken);
    if (user) {
      user.refreshToken = "";
      const result = await user.save();
      console.log(result);
    }
  } catch (error) {}
};