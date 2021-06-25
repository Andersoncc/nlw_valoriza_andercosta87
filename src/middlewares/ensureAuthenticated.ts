
import { verify } from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request:Request,
  response:Response,
  next:NextFunction
  ) {
    //Receber o token
    const authToken = request.headers.authorization;
    //validar se o token está preenchido
    if(!authToken){
      return response.status(401).end();
    }

    const [, token] = authToken.split(" ")
    //validar se o token é valido
    try{
      const { sub } = verify(token ,"7e62fa6c44c8668ee8af25467c895f3f") as IPayload;
      request.user_id = sub;

      return next();
    }catch(err){
      return response.status(401).end();
    }

    //Recuperar informações do usuário

    

}