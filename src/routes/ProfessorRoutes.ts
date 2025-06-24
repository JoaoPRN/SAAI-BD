import ProfessorController from "../controller/ProfessorController";
import {Router} from 'express';

const router = Router();
console.log('ProfessorRoutes carregado'); // apareceu no terminal

router.get(
    "/",
    (req, res) => {
        res.send('nao faz nada')
    }
);

router.get(
    "/criar-professor",
    ProfessorController.criarProfessor
);

export default router;