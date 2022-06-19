import { request, Router } from 'express'
import { UserController } from './controllers/userController'

const routes = Router()
const userController = new UserController();

routes.get('/users', userController.userList)

routes.post('/users', userController.createUser)

export { routes }
