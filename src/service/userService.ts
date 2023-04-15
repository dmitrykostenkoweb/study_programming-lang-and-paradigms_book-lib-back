import User, { IUser } from "../models/user.model";

class UserService {
  constructor() {}

  public async findUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }
}

export default UserService;
