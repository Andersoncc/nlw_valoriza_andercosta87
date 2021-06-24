import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UserRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email:string,
  password:string
}
class AuthenticateUserService {
  async execute({email, password} : IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UserRepositories);

    const user = await usersRepositories.findOne({
      email
    });
    if(!user){
      throw new Error("Email/Password incorrect");
    }
    const passwordMatch = await compare (password, user.password)
    if(!passwordMatch){
      throw new Error("Email/Password incorrect");
    }
     const token = sign({
       email:user.email
    },"7e62fa6c44c8668ee8af25467c895f3f",{
    subject: user.id,
    expiresIn: "1d"
  });
    return token;
  }
}

export { AuthenticateUserService }