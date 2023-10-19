-- Código usado para criar a tabela no banco de dados usada para inserir os dados pela aplicação
CREATE TABLE `chars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `obra` varchar(45) NOT NULL,
  `genero` varchar(45) NOT NULL,
  `poder` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci