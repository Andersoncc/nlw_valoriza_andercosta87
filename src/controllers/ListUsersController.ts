import { Request, Response } from "express"
import { ListUserService } from "../services/ListUserServices"



class ListUserController{
  async handle(request: Request, response:Response){
    const listUserController = new ListUserService();
    const users = await listUserController.execute();

    return response.json(users)
  }
}

export { ListUserController}