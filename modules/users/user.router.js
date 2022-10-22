import { signUp ,signIn , updateUser  , deleteUser , getUsers, emailVerify , userProfile , getShareProfile} from './controller/user.controller.js'
import { userValidation } from './../../middleware/validtation/user.validation.js';
import {Router} from 'express'
import { auth } from './../../middleware/auth/authentication.js';

const userRouter = Router();
userRouter.post('/signUp', userValidation ,signUp)
userRouter.post('/signIn', signIn)
userRouter.get('/verify/:token', emailVerify)
userRouter.get('/', auth, userProfile)
userRouter.get('/:id', getShareProfile)
userRouter.post('/updateUser', updateUser)
userRouter.post('/deleteUser', deleteUser)
userRouter.post('/getUsers', getUsers)


export default userRouter ;