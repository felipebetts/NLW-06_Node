import { NextFunction, Request, Response } from "express"


export const treatErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        // se o erro for o erro que nos lancamos no throw new Error
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'Error',
        message: 'Internal Server Error'
    })
}