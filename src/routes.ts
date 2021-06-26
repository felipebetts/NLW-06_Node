import { ListUsersController } from './controllers/ListUsersController';
import { ListUserReceiverComplimentsController } from './controllers/ListUserReceiverComplimentsController';
import { CreateTagController } from './controllers/CreateTagController';
import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuth } from './middlewares/ensureAuth';
import { ListUserSenderComplimentsController } from './controllers/ListUserSenderComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';


const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()
const authenticateUserController = new AuthenticateUserController()
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController()
const listUserSenderComplimentsController = new ListUserSenderComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

router.post('/login', authenticateUserController.handle)

router.get('/users', ensureAuth, listUsersController.handle)
router.post('/users', createUserController.handle)

router.post('/compliments', ensureAuth, createComplimentController.handle)

router.post('/tags', ensureAuth, ensureAdmin, createTagController.handle)
router.get('/tags', listTagsController.handle)

router.get('/users/compliments/sent', ensureAuth, listUserSenderComplimentsController.handle)
router.get('/users/compliments/received', ensureAuth, listUserReceiverComplimentsController.handle)

export { router }