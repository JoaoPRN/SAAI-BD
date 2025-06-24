//imports
import {Request, Response} from 'express';


class ProfessorController {
    static async criarProfessor(
        req: Request,
        res: Response
    ) {
        res.send('Dar insert na table professor')
    }
}

export default ProfessorController;