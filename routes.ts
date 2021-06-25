import { Router } from "express"
import { CreateUserController } from "./src/controllers/CreateUserController";
import { CreateTagController } from "./src/controllers/CreateTagController";
import { ensureAdmin } from "./src/middlewares/ensureAdmin";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";
import { CreateComplimentController } from "./src/controllers/CreateComplimentController";
import { ensureAuthenticated } from "./src/middlewares/ensureAuthenticated";
import { ListUserReceiveComplimentsController } from "./src/controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./src/controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./src/controllers/ListTagsController";
import { ListUserController } from "./src/controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController(); 
const listTagsController = new ListTagsController();
const listUserController = new ListUserController();

router.post("/users", createUserController.handle);
router.post("/tags",  ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated,createComplimentController.handle); 
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated,listUserReceiveComplimentsController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users/list", ensureAuthenticated, listUserController.handle );
export{ router };