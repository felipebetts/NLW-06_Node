declare namespace Express {
    export interface Request {
        user_id: string
        // aqui estamos adicionando o tipo para request.user_id nao dar erro de tipagem
    }
}