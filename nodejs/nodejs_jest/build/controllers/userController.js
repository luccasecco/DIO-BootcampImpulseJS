"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const db_1 = require("../db");
class UserController {
    createUser(req, res) {
        const { name } = req.body;
        if (name.length < 1) {
            return res.status(403).json({ Message: 'Invalid username' });
        }
        db_1.dataBase.push(name);
        return res.status(201).json({ Message: `User ${name} created successfully` });
    }
    userList(req, res) {
        return res.status(200).json(db_1.dataBase);
    }
}
exports.UserController = UserController;
