import { Request, Response } from 'express'
import { dataBase } from '../db'

export class UserController {
  createUser(req: Request, res: Response): Response {
    const { name } = req.body

    if (name.length < 1) {
      return res.status(403).json({ Message: 'Invalid username' })
    }

    dataBase.push(name)
    return res.status(201).json({ Message: `User ${name} created successfully`})
  }

  userList(req: Request, res: Response): Response {
    return res.status(200).json(dataBase)
  }
}

