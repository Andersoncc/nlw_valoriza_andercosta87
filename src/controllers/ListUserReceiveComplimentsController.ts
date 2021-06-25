import {Request, Response} from "express"
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserReceiveComplimentsController {
  async handle (request: Request, response:Response){
    const {user_id} = request;
    const listUserReceiveComplimentsController = new ListUserReceiveComplimentsService();

    const compliment = await listUserReceiveComplimentsController.execute(user_id)

    return response.json(compliment);
  }

}

export { ListUserReceiveComplimentsController}