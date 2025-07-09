CREATE PROCEDURE SAAI.cargaInicialBD(
  -- Dados do aluno
  IN numero_matricula_aluno INT,
  IN nome_aluno VARCHAR(40),
  IN dt_ingresso DATE,
  IN dt_nascimento DATE,
  IN nome_curso VARCHAR(20),
  IN aluno_foto MEDIUMBLOB,

  -- Dados do professor
  IN matricula_professor INT,
  IN nome_professor VARCHAR(40),
  IN dt_ingresso_professor DATE,
  IN professor_foto BLOB,

  -- Dados da disciplina
  IN codigo_disciplina SMALLINT,
  IN nome_disciplina VARCHAR(30),
  IN carga_horaria INT,
  
  -- Dados da sala de aula
  IN numero_sala SMALLINT,
  IN numero_capacidade SMALLINT, 
  
  -- Dados do serviço
  IN nome_servico VARCHAR(30),
  
  -- Dados da Turma
  IN codigo_turma INT,
  IN numero_semestre VARCHAR(6)
)
BEGIN

  -- Inserir aluno
  IF NOT EXISTS (
    SELECT 1 FROM TD_ALUNO WHERE NUM_MATRICULA_ALUNO = numero_matricula_aluno
  ) THEN
  INSERT INTO TD_ALUNO (
    NUM_MATRICULA_ALUNO,
    NOM_ALUNO,
    DT_INGRESSO,
    DT_NASCIMENTO,
    NOM_CURSO,
    FOTO_ALUNO
  )
  VALUES (
    numero_matricula_aluno,
    nome_aluno,
    dt_ingresso,
    dt_nascimento,
    nome_curso,
    aluno_foto
  );
  END IF;

  --  Inserir professor
  IF NOT EXISTS (
    SELECT 1 FROM TD_PROFESSOR WHERE NUM_MATRICULA_PROFESSOR = matricula_professor
  ) THEN
    INSERT INTO TD_PROFESSOR (
      NUM_MATRICULA_PROFESSOR, NOM_PROFESSOR, DT_INGRESSO
    ) VALUES (
      matricula_professor, nome_professor, dt_ingresso_professor
    );
  END IF;

  --  Inserir disciplina 
  IF NOT EXISTS (
    SELECT 1 FROM TD_DISCIPLINA WHERE NUM_CODIGO_DISCIPLINA = codigo_disciplina
  ) THEN
    INSERT INTO TD_DISCIPLINA (
      NUM_CODIGO_DISCIPLINA, NOM_DISCIPLINA, NUM_CARGA_HORARIA
    ) VALUES (
      codigo_disciplina, nome_disciplina, carga_horaria
    );
  END IF;
	
  -- Inserir sala de aula
  IF NOT EXISTS (
    SELECT 1 FROM TD_SALA WHERE NUM_SALA = numero_sala
  ) THEN
    INSERT INTO TD_SALA (NUM_SALA, NUM_CAPACIDADE
    ) VALUES (
  numero_sala, numero_capacidade
  );
  END IF;
  
  -- Inserir serviço
  IF NOT EXISTS (
    SELECT 1 FROM TD_TIPO_SERVICO WHERE NOM_TIPO_SERVICO = nome_servico
  ) THEN
    INSERT INTO TD_TIPO_SERVICO (NOM_TIPO_SERVICO)
    VALUES (nome_servico);
  END IF;
  
  -- Inserir turma
   IF NOT EXISTS (
    SELECT 1 FROM TD_TURMA WHERE 
		COD_ID_TURMA = codigo_turma
  ) THEN
    INSERT INTO SAAI.TD_TURMA
	(COD_ID_TURMA, NUM_SEMESTRE, NUM_CODIGO_DISCIPLINA, NUM_MATRICULA_PROFESSOR, NUM_SALA)
	VALUES (codigo_turma, numero_semestre, codigo_disciplina, matricula_professor, numero_sala);
  END IF;
END