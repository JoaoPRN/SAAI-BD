import db from "../database/db";
// import { emptyOrRows } from "../helper/helper";
// import { IEmployee } from "../models/IEmployee";

async function create(payload: any): Promise<Object> {
  const data = {
    NOM_ALUNO: payload.nome,
    NUM_CPF: payload.cpf,
  };
  const result: any = await db.query(`INSERT INTO aluno SET ?`, data);
  let message = "Error in creating Record";
  if (result.affectedRows) {
    message = "Record created successfully";
  }
  return { message };
}

export default create;