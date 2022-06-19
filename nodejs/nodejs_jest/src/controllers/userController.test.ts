import { Request } from 'express'
import { makeMockResponse } from '../mocks/mockResponse';
import { UserController } from './userController';
describe('User Controller', () => {
  const userController = new UserController();
  const mockRequest = {} as Request
  const mockResponse = makeMockResponse()
  it('should list users', () => {
    userController.userList(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toHaveLength(3)
  })

  it('should create a new user', () => {
    mockRequest.body = {
      name: 'New user'
    }

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ Message: `User New user created successfully`})
  })

  it('should not create a new user without a name', () => {
    mockRequest.body = {
      name: ''
    }

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(403)
    expect(mockResponse.state.json).toMatchObject({ Message: 'Invalid username' })
  })

  })
