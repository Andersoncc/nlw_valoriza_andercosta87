import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";
import { hash} from "bcryptjs"

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

class CreateUserService {
  async execute ({name, email, admin, password} : IUserRequest){
    const UserRepository = getCustomRepository(UserRepositories);

    if(!email){
      throw new Error ("Email incorrect")
    }

    const UserAlreadyExists = await UserRepository.findOne({
      email,
    });

    if (UserAlreadyExists){
      throw new Error ("User Already exists")
    }

    const passwordHash = await hash (password, 8)

    const user = UserRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await UserRepository.save(user);
    return user;

  }
}

export { CreateUserService }