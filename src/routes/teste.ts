import { Router, Request, Response } from 'express';

// cria nova instancia de express router
const testRouter = Router();

// isso vai lidar com requesicoes get para /test 
testRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'rota teste ok e separada de um router!',
    timestamp: new Date().toISOString(), // data e hora
    serverStatus: 'online',
    // You can add more info to confirm this is the router speaking -------
    endpoint: '/test'
  });
});

// adicionar subrotas

export default testRouter;