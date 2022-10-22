import { sendMessage , myMessages} from './controller/message.controller.js'
import {Router} from 'express'
import { auth } from '../../middleware/auth/authentication.js';
const messageRouter = Router();
messageRouter.post('/message/:userId', sendMessage )
messageRouter.get('/message/', auth , myMessages )
export default messageRouter ;