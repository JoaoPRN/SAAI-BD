CREATE PROCEDURE SAAI.MatricularAlunoEmTurmas (
  IN numero_matricula INT,
  IN turma1 INT,
  IN turma2 INT,
  IN turma3 INT,
  IN turma4 INT,
  IN turma5 INT
)
BEGIN
  INSERT IGNORE INTO SAAI.TD_MATRICULA (COD_ID_TURMA, NUM_MATRICULA_ALUNO)
  VALUES
    (turma1, numero_matricula),
    (turma2, numero_matricula),
    (turma3, numero_matricula),
    (turma4, numero_matricula),
    (turma5, numero_matricula);
END