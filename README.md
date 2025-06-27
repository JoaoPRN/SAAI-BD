# 📚 Sistema de Avaliação Acadêmica Integrada (SAAI)

## ✅ Requisitos

- Node.js (v18 ou superior)

- MySQL Server rodando localmente

- Comando para instalar todos os requisitos:
```
  npm i nodejs mysql express typescript ts-node-dev react dotenv
```

## ✅ Configuração do Banco de Dados

1.  Conectar ao MySQL via terminal:

```
  mysql -u root -p
```

2. Criar o Banco de dados:

```sql
  CREATE DATABASE SAAI;
```
E indicar que vai usar o banco:

```sql
  USE SAAI;
```

3. Criar as Tabelas:

Execute os seguintes comandos SQL (DDL) no banco:

```sql

CREATE TABLE TD_ALUNO (
  NUM_MATRICULA_ALUNO INTEGER PRIMARY KEY,
  NOM_ALUNO VARCHAR(40),
  DT_INGRESSO DATE,
  DT_NASCIMENTO DATE,
  NOM_CURSO VARCHAR(20)
);

CREATE TABLE TD_TELEFONE (
  NUM_TELEFONE VARCHAR(11),
  NUM_MATRICULA_ALUNO INTEGER,
  PRIMARY KEY (NUM_MATRICULA_ALUNO, NUM_TELEFONE)
);

CREATE TABLE TD_SALA (
  NUM_SALA SMALLINT PRIMARY KEY,
  NUM_CAPACIDADE SMALLINT
);

CREATE TABLE TD_AVL_SL_AULA (
  NUM_MATRICULA_ALUNO INTEGER,
  NUM_SALA SMALLINT,
  NUM_SEMESTRE VARCHAR(6),
  DAT_AVALIACAO DATE,
  TXT_COMENTARIO VARCHAR(250),
  NUM_NOTA_ACESSIBILIDADE SMALLINT,
  NUM_NOTA_INFRAESTRUTURA SMALLINT,
  NUM_NOTA_LIMPEZA SMALLINT,
  NUM_NOTA_CONFORTO SMALLINT,
  NUM_NOTA_ILUMINACAO SMALLINT,
  NUM_NOTA_ACUSTICA SMALLINT,
  PRIMARY KEY (NUM_MATRICULA_ALUNO, NUM_SALA, NUM_SEMESTRE),
  CHECK (NUM_NOTA_ACESSIBILIDADE BETWEEN 1 AND 5),
  CHECK (NUM_NOTA_INFRAESTRUTURA BETWEEN 1 AND 5),
  CHECK (NUM_NOTA_LIMPEZA BETWEEN 1 AND 5),
  CHECK (NUM_NOTA_CONFORTO BETWEEN 1 AND 5),
  CHECK (NUM_NOTA_ILUMINACAO BETWEEN 1 AND 5),
  CHECK (NUM_NOTA_ACUSTICA BETWEEN 1 AND 5)
);


CREATE TABLE TD_PROFESSOR (
  NUM_MATRICULA_PROFESSOR INTEGER PRIMARY KEY,
  DT_INGRESSO DATE,
  NOM_PROFESSOR VARCHAR(40)
);

CREATE TABLE TD_DISCIPLINA (
  NUM_CODIGO_DISCIPLINA SMALLINT PRIMARY KEY,
  NUM_CARGA_HORARIA INTEGER,
  NOM_DISCIPLINA VARCHAR(30)
);


CREATE TABLE TD_TIPO_SERVICO (
  NUM_ID_SERVICO INTEGER PRIMARY KEY AUTO_INCREMENT,
  NOM_TIPO_SERVICO VARCHAR(30)
);

CREATE TABLE TD_TURMA (
  COD_ID_TURMA INTEGER PRIMARY KEY,
  NUM_SEMESTRE VARCHAR(6),
  NUM_CODIGO_DISCIPLINA SMALLINT,
  NUM_MATRICULA_PROFESSOR INTEGER,
  NUM_SALA SMALLINT,
  UNIQUE (NUM_CODIGO_DISCIPLINA, NUM_MATRICULA_PROFESSOR, NUM_SALA)
);

CREATE TABLE TD_AVL_TURMA (
  NUM_MATRICULA_ALUNO INTEGER,
  COD_ID_TURMA INTEGER,
  DAT_AVALIACAO DATE,
  TXT_COMENTARIO VARCHAR(250),
  NUM_NOTA_CONTEUDO_DISCIPLINA SMALLINT,
  NUM_NOTA_ORGANIZACAO_DISCIPLINA SMALLINT,
  NUM_NOTA_DIDATICA_PROFESSOR SMALLINT,
  NUM_NOTA_CRITERIO_AVALIACAO SMALLINT,
  NUM_NOTA_CUMPRIMENTO_EMENTA INTEGER,
  PRIMARY KEY (NUM_MATRICULA_ALUNO, COD_ID_TURMA)
);


CREATE TABLE TD_MATRICULA (
  NUM_MATRICULA_ALUNO INTEGER,
  COD_ID_TURMA INTEGER,
  COD_IND_AVALIACAO BOOLEAN,
  PRIMARY KEY (NUM_MATRICULA_ALUNO, COD_ID_TURMA)
);

CREATE TABLE TD_AVL_SERVICOS (
  NUM_MATRICULA_ALUNO INTEGER,
  NUM_ID_SERVICO INTEGER,
  DAT_AVALIACAO DATE,
  TXT_COMENTARIO VARCHAR(250),
  NUM_NOTA_SERVICO SMALLINT,
  PRIMARY KEY (NUM_MATRICULA_ALUNO, NUM_ID_SERVICO)
);

-- Definindo as Foreign Keys:

ALTER TABLE TD_TELEFONE ADD CONSTRAINT FK_Telefone_Aluno
  FOREIGN KEY (NUM_MATRICULA_ALUNO)
  REFERENCES TD_ALUNO(NUM_MATRICULA_ALUNO);

ALTER TABLE TD_AVL_SL_AULA ADD CONSTRAINT FK_Avaliação_Sala
  FOREIGN KEY (NUM_MATRICULA_ALUNO)
  REFERENCES TD_ALUNO(NUM_MATRICULA_ALUNO);

ALTER TABLE TD_AVL_SL_AULA ADD CONSTRAINT FK_Avaliação_Sala2
  FOREIGN KEY (NUM_SALA)
  REFERENCES TD_SALA(NUM_SALA);

ALTER TABLE TD_AVL_TURMA ADD CONSTRAINT FK_Avaliação_Turma
  FOREIGN KEY (NUM_MATRICULA_ALUNO)
  REFERENCES TD_ALUNO(NUM_MATRICULA_ALUNO);

ALTER TABLE TD_AVL_TURMA ADD CONSTRAINT FK_Avaliação_Turma2
  FOREIGN KEY (COD_ID_TURMA)
  REFERENCES TD_TURMA(COD_ID_TURMA);


ALTER TABLE TD_TURMA ADD CONSTRAINT FK_Turma_1
  FOREIGN KEY (NUM_CODIGO_DISCIPLINA)
  REFERENCES TD_DISCIPLINA(NUM_CODIGO_DISCIPLINA);

ALTER TABLE TD_TURMA ADD CONSTRAINT FK_Turma_2
  FOREIGN KEY (NUM_MATRICULA_PROFESSOR)
  REFERENCES TD_PROFESSOR(NUM_MATRICULA_PROFESSOR);

ALTER TABLE TD_TURMA ADD CONSTRAINT FK_Turma_3
  FOREIGN KEY (NUM_SALA)
  REFERENCES TD_SALA(NUM_SALA);

ALTER TABLE TD_MATRICULA ADD CONSTRAINT FK_Matrícula_1
  FOREIGN KEY (NUM_MATRICULA_ALUNO)
  REFERENCES TD_ALUNO(NUM_MATRICULA_ALUNO);

ALTER TABLE TD_MATRICULA ADD CONSTRAINT FK_Matrícula_2
  FOREIGN KEY (COD_ID_TURMA)
  REFERENCES TD_TURMA(COD_ID_TURMA);

ALTER TABLE TD_AVL_SERVICOS ADD CONSTRAINT FK_Avaliação_serviços_1
  FOREIGN KEY (NUM_MATRICULA_ALUNO)
  REFERENCES TD_ALUNO(NUM_MATRICULA_ALUNO);

ALTER TABLE TD_AVL_SERVICOS ADD CONSTRAINT FK_Avaliação_serviços_2
  FOREIGN KEY (NUM_ID_SERVICO)
  REFERENCES TD_TIPO_SERVICO (NUM_ID_SERVICO);
```

### ✅ Carga Inicial de Dados no Banco SAAI

Esta procedure automatiza a inserção de dados nas tabelas principais do sistema: TD_PROFESSOR, TD_DISCIPLINA, TD_SALA e TD_TIPO_SERVICO.

```sql
CREATE PROCEDURE SAAI.cargaInicialDados (
  -- Dados do professor
  IN matricula_professor INT,
  IN nome_professor VARCHAR(40),
  IN dt_ingresso_professor DATE,

  -- Dados da disciplina
  IN codigo_disciplina SMALLINT,
  IN nome_disciplina VARCHAR(30),
  IN carga_horaria INT,

  -- Dados da sala de aula
  IN numero_sala SMALLINT,
  IN numero_capacidade SMALLINT,

  -- Dados do serviço
  IN nome_servico VARCHAR(30)
)
BEGIN
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

  -- Inserir Sala de Aula
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
END
```

Utilize os comandos abaixo para popular o banco com dados iniciais consistentes:

```sql
CALL SAAI.cargaInicialDados(100000004, 'Marcos Vinícius', '2017-05-20', 304, 'Redes de Computadores', 60, 204, 45, 'Biblioteca Central');
CALL SAAI.cargaInicialDados(100000005, 'Patrícia Alves', '2019-01-10', 305, 'Engenharia de Software', 60, 205, 40, 'Centro Esportivo');
CALL SAAI.cargaInicialDados(100000006, 'Renato Souza', '2014-09-30', 306, 'Banco de Dados', 60, 206, 35, 'Restaurante Unirversitário');
CALL SAAI.cargaInicialDados(100000007, 'Fernanda Lima', '2016-12-05', 307, 'Inteligência Artificial', 60, 207, 50, 'Serviço de Transporte');
CALL SAAI.cargaInicialDados(100000009, 'Aline Pereira', '2020-03-25', 309, 'Computação Gráfica', 60, 209, 40, 'Assistência Social');
CALL SAAI.cargaInicialDados(100000010, 'João Marcos', '2013-11-11', 310, 'Criptografia', 60, 210, 45, 'Secretaria Acadêmica');
CALL SAAI.cargaInicialDados(100000011, 'Larissa Fernandes', '2017-06-22', 311, 'Engenharia de Computação', 60, 211, 50, 'Auditorio Principal');
CALL SAAI.cargaInicialDados(100000012, 'Thiago Rodrigues', '2015-04-17', 312, 'Computação em Nuvem', 60, 212, 35, 'Centro Esportivo');
CALL SAAI.cargaInicialDados(100000013, 'Carolina Alves', '2019-10-30', 313, 'Segurança da Informação', 60, 213, 40, 'Laboratório de Idiomas');
```

### ✅ Instalando dependências

Na raiz do projeto, execute:

```bash
    npm install
```

### ✅ Configurando variáveis de ambiente (.env)

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```ini
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_DATABASE=SAAI
    PORT=3000
```

> 📝 Ajuste os valores de acordo com sua instalação local do MySQL.

### Executando o projeto

```bash
    npm run dev
```
Ou:
```bash
    npm start
```

O servidor será iniciado na porta definida no .env.

Exemplo: http://localhost:3000

### ✅ Bonus
Pra fazer push em develop (ou na main) de forma rápida.

```
  git pull
  git checkout sua-branch
  git fetch origin
  git pull origin develop
  git push origin sua-branch:develop
```

Isso garante que você está na sua branch, atualiza o repositório local, faz merge na develop (ou main) e envia as mudanças para o repositório remoto.
