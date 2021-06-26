import { ListUsersService } from './../services/ListUsersService';
import { Request, Response } from "express";


export class ListUsersController {

    async handle(req: Request, res: Response) {
        const listUsersService = new ListUsersService()

        const users = await listUsersService.execute()

        return res.json(users)
    }
}