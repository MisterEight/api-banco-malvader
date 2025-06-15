-- MySQL dump 10.13  Distrib 8.4.4, for Win64 (x86_64)
--
-- Host: localhost    Database: banco_malvader
-- ------------------------------------------------------
-- Server version	8.4.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agencia`
--

DROP TABLE IF EXISTS `agencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencia` (
  `id_agencia` char(36) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `codigo_agencia` varchar(20) NOT NULL,
  `endereco_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id_agencia`),
  UNIQUE KEY `codigo_agencia` (`codigo_agencia`),
  KEY `fk_agencia_endereco` (`endereco_id`),
  CONSTRAINT `fk_agencia_endereco` FOREIGN KEY (`endereco_id`) REFERENCES `endereco_agencia` (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencia`
--

LOCK TABLES `agencia` WRITE;
/*!40000 ALTER TABLE `agencia` DISABLE KEYS */;
INSERT INTO `agencia` VALUES ('1b3ad13c-1607-4b6b-b59a-ceddd5dbab58','Avenina RJ','AG606213',NULL),('2aa88b70-26c7-4d03-8f14-6c08d79714e3','Centro','AG607243',NULL),('2aa88b70-26c7-4d03-8f14-6c08d79714e4','Capital','AG557718',NULL),('34d1bdfb-9f58-4129-aa60-f510daa3f44f','Avenina Junta','AG779684',NULL),('ded048ba-58fd-4f88-a399-ce4755509353','Avenina Sampa','AG292916',NULL);
/*!40000 ALTER TABLE `agencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` char(36) NOT NULL,
  `id_usuario` char(36) DEFAULT NULL,
  `score_credito` int DEFAULT '0',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES ('2c4743c0-c1a5-4ec9-abcb-2bcae75e01a6','e3655c61-7ee8-4a5e-80bc-e5b4360bd8eb',0),('c7e10b8c-445f-426c-aeec-0dc46fb378b9','3d0bbce2-6ac1-4f5f-b832-0c702de6efa2',0),('d646d232-2c27-46a2-93f3-db9075b3025e','c5f83e16-88ff-4d82-a60f-995d63d4b6f4',0),('f51d461d-57d2-4bdf-ad1f-b1654f073dbb','63f23d09-d7ed-454e-b777-c4575efb911b',0);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigos_de_agencias_gerados`
--

DROP TABLE IF EXISTS `codigos_de_agencias_gerados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigos_de_agencias_gerados` (
  `codigo` int NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigos_de_agencias_gerados`
--

LOCK TABLES `codigos_de_agencias_gerados` WRITE;
/*!40000 ALTER TABLE `codigos_de_agencias_gerados` DISABLE KEYS */;
INSERT INTO `codigos_de_agencias_gerados` VALUES (292916),(315889),(557718),(606213),(607243),(779684);
/*!40000 ALTER TABLE `codigos_de_agencias_gerados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigos_de_funcionarios_gerados`
--

DROP TABLE IF EXISTS `codigos_de_funcionarios_gerados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigos_de_funcionarios_gerados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigos_de_funcionarios_gerados`
--

LOCK TABLES `codigos_de_funcionarios_gerados` WRITE;
/*!40000 ALTER TABLE `codigos_de_funcionarios_gerados` DISABLE KEYS */;
INSERT INTO `codigos_de_funcionarios_gerados` VALUES (3,132804),(40,200083),(17,211199),(35,239954),(19,274214),(18,274279),(23,291586),(37,307293),(41,432763),(16,462849),(1,485299),(12,663932),(20,710520),(11,777881),(2,866364);
/*!40000 ALTER TABLE `codigos_de_funcionarios_gerados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conta`
--

DROP TABLE IF EXISTS `conta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conta` (
  `id_conta` char(36) NOT NULL,
  `numero_conta` int DEFAULT NULL,
  `id_agencia` char(36) DEFAULT NULL,
  `id_cliente` char(36) DEFAULT NULL,
  `tipo_conta` enum('corrente','poupanca','investimento') NOT NULL,
  `saldo` decimal(10,2) DEFAULT NULL,
  `data_abertura` date DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_conta`),
  UNIQUE KEY `numero_conta` (`numero_conta`),
  KEY `id_agencia` (`id_agencia`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `conta_ibfk_1` FOREIGN KEY (`id_agencia`) REFERENCES `agencia` (`id_agencia`),
  CONSTRAINT `conta_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conta`
--

LOCK TABLES `conta` WRITE;
/*!40000 ALTER TABLE `conta` DISABLE KEYS */;
INSERT INTO `conta` VALUES ('4309511b-ff4f-4c53-9721-d19d03eece09',49120395,'ded048ba-58fd-4f88-a399-ce4755509353','d646d232-2c27-46a2-93f3-db9075b3025e','investimento',1500.75,'2025-06-02',2),('525fa1f0-bc2f-4a24-adae-7f089a4d7be0',20491281,'ded048ba-58fd-4f88-a399-ce4755509353','d646d232-2c27-46a2-93f3-db9075b3025e','poupanca',1500.75,'2025-06-02',2),('760a443f-8fb3-4995-8881-228e16735d98',15866601,'ded048ba-58fd-4f88-a399-ce4755509353','c7e10b8c-445f-426c-aeec-0dc46fb378b9','corrente',7000.00,'2025-06-02',2),('ab769e9d-9865-41b8-980e-c97cd1368e0b',67412704,'ded048ba-58fd-4f88-a399-ce4755509353','c7e10b8c-445f-426c-aeec-0dc46fb378b9','poupanca',1500.75,'2025-06-02',2),('c6fa0434-ab67-4634-866a-df802606cd82',60640102,'ded048ba-58fd-4f88-a399-ce4755509353','c7e10b8c-445f-426c-aeec-0dc46fb378b9','investimento',1500.75,'2025-06-02',2),('f2722e4b-9a66-4c89-900c-85b31e754f32',15080489,'ded048ba-58fd-4f88-a399-ce4755509353','d646d232-2c27-46a2-93f3-db9075b3025e','corrente',4500.50,'2025-06-02',2);
/*!40000 ALTER TABLE `conta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contas_corrente`
--

DROP TABLE IF EXISTS `contas_corrente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contas_corrente` (
  `id_conta_corrente` char(36) NOT NULL,
  `id_conta` char(36) NOT NULL,
  `limite` decimal(15,2) NOT NULL DEFAULT '0.00',
  `data_vencimento` date NOT NULL,
  `taxa_manutencao` decimal(10,4) NOT NULL DEFAULT '0.0000',
  PRIMARY KEY (`id_conta_corrente`),
  UNIQUE KEY `id_conta` (`id_conta`),
  CONSTRAINT `fk_conta` FOREIGN KEY (`id_conta`) REFERENCES `conta` (`id_conta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas_corrente`
--

LOCK TABLES `contas_corrente` WRITE;
/*!40000 ALTER TABLE `contas_corrente` DISABLE KEYS */;
INSERT INTO `contas_corrente` VALUES ('6fd91dc2-846d-49da-9daf-2813d2d5907d','760a443f-8fb3-4995-8881-228e16735d98',1500.00,'2025-07-01',25.5000),('f8820637-ffec-4b17-a4bd-fa30c54fff58','f2722e4b-9a66-4c89-900c-85b31e754f32',1500.00,'2025-07-01',25.5000);
/*!40000 ALTER TABLE `contas_corrente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contas_investimento`
--

DROP TABLE IF EXISTS `contas_investimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contas_investimento` (
  `id_conta_investimento` char(36) NOT NULL,
  `id_conta` char(36) NOT NULL,
  `perfil_risco` enum('CONSERVADOR','MODERADO','ARROJADO') NOT NULL,
  `valor_minimo` float NOT NULL,
  `taxa_rendimento_base` float NOT NULL,
  PRIMARY KEY (`id_conta_investimento`),
  UNIQUE KEY `id_conta` (`id_conta`),
  CONSTRAINT `contas_investimento_ibfk_1` FOREIGN KEY (`id_conta`) REFERENCES `conta` (`id_conta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas_investimento`
--

LOCK TABLES `contas_investimento` WRITE;
/*!40000 ALTER TABLE `contas_investimento` DISABLE KEYS */;
INSERT INTO `contas_investimento` VALUES ('6d7129c7-e578-4239-ae9d-66b0666a95a7','4309511b-ff4f-4c53-9721-d19d03eece09','MODERADO',1000,0.8);
/*!40000 ALTER TABLE `contas_investimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contas_poupanca`
--

DROP TABLE IF EXISTS `contas_poupanca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contas_poupanca` (
  `id_conta_poupanca` char(36) NOT NULL,
  `id_conta` char(36) NOT NULL,
  `taxa_rendimento` float NOT NULL,
  `ultimo_rendimento` float NOT NULL,
  PRIMARY KEY (`id_conta_poupanca`),
  UNIQUE KEY `id_conta` (`id_conta`),
  CONSTRAINT `contas_poupanca_ibfk_1` FOREIGN KEY (`id_conta`) REFERENCES `conta` (`id_conta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contas_poupanca`
--

LOCK TABLES `contas_poupanca` WRITE;
/*!40000 ALTER TABLE `contas_poupanca` DISABLE KEYS */;
INSERT INTO `contas_poupanca` VALUES ('2ee6ae98-08ea-4bd6-a3cf-3b8778f359c4','525fa1f0-bc2f-4a24-adae-7f089a4d7be0',0.015,10.5);
/*!40000 ALTER TABLE `contas_poupanca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimos`
--

DROP TABLE IF EXISTS `emprestimos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimos` (
  `id_emprestimo` char(36) NOT NULL,
  `id_conta` char(36) NOT NULL,
  `valor_solicitado` decimal(12,2) NOT NULL,
  `taxa_juros_mensal` decimal(7,4) NOT NULL,
  `prazo_meses` int NOT NULL,
  `valor_total_devido` decimal(14,2) DEFAULT NULL,
  `data_solicitacao` date NOT NULL,
  `data_resposta` date DEFAULT NULL,
  `status` enum('PENDENTE','APROVADO','REJEITADO') NOT NULL DEFAULT 'PENDENTE',
  `score_risco` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_emprestimo`),
  KEY `id_conta` (`id_conta`),
  CONSTRAINT `emprestimos_ibfk_1` FOREIGN KEY (`id_conta`) REFERENCES `conta` (`id_conta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimos`
--

LOCK TABLES `emprestimos` WRITE;
/*!40000 ALTER TABLE `emprestimos` DISABLE KEYS */;
INSERT INTO `emprestimos` VALUES ('429dbaee-c749-4ef0-bace-f865455b1035','f2722e4b-9a66-4c89-900c-85b31e754f32',1500.00,1.0000,36,2040.00,'2025-06-05',NULL,'PENDENTE',NULL),('7f629820-be43-4f0a-b51f-9f100445ae76','f2722e4b-9a66-4c89-900c-85b31e754f32',1600.50,20.0000,36,1607.70,'2025-06-05',NULL,'PENDENTE',NULL),('f483374a-e665-4ece-824f-eaa9cef74463','f2722e4b-9a66-4c89-900c-85b31e754f32',1500.00,20.0000,36,12300.00,'2025-06-05',NULL,'PENDENTE',NULL);
/*!40000 ALTER TABLE `emprestimos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco_agencia`
--

DROP TABLE IF EXISTS `endereco_agencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco_agencia` (
  `id_endereco` char(36) NOT NULL,
  `id_agencia` char(36) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `local` varchar(255) NOT NULL,
  `numero_casa` int NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_endereco`),
  KEY `fk_endereco_agencia` (`id_agencia`),
  CONSTRAINT `fk_endereco_agencia` FOREIGN KEY (`id_agencia`) REFERENCES `agencia` (`id_agencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco_agencia`
--

LOCK TABLES `endereco_agencia` WRITE;
/*!40000 ALTER TABLE `endereco_agencia` DISABLE KEYS */;
INSERT INTO `endereco_agencia` VALUES ('bedc20b0-018a-4f8e-8845-a4cd82568ae4','2aa88b70-26c7-4d03-8f14-6c08d79714e3','12345-678','Rua do Alepardo',123,'Centro','São Paulo','SP','Apartamento 101'),('eb8b3424-c5a6-4953-a0d2-c1ecf5bcfff5','2aa88b70-26c7-4d03-8f14-6c08d79714e3','12345-678','Rua das Laranjeiras',123,'Centro','São Paulo','SP','Apartamento 101');
/*!40000 ALTER TABLE `endereco_agencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `id_funcionario` char(36) NOT NULL,
  `id_usuario` char(36) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `codigo_funcionario` varchar(20) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `id_supervisor` char(36) DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  UNIQUE KEY `codigo_funcionario` (`codigo_funcionario`),
  KEY `id_supervisor` (`id_supervisor`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`id_supervisor`) REFERENCES `funcionarios` (`id_funcionario`),
  CONSTRAINT `funcionarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `funcionarios_chk_1` CHECK ((`cargo` in (_utf8mb4'administrador',_utf8mb4'comum')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES ('2aa88b70-26c7-4d03-8f14-6c08d79714e3','63f23d09-d7ed-454e-b777-c4575efb911b','Carlos','FUN307293','comum',NULL),('47e8f425-e00d-46e6-9632-5577b8aa676d','edbe263e-fe66-46d4-9a87-125741b49cd2','Acer','FUN200083','administrador',NULL),('b78f7a1c-897e-44a4-87cd-98b93673fb1a','5054c7e4-936f-4055-a794-5074a9786507','Nazaré','FUN432763','comum',NULL);
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `numeros_de_contas_gerados`
--

DROP TABLE IF EXISTS `numeros_de_contas_gerados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `numeros_de_contas_gerados` (
  `numero` int NOT NULL,
  PRIMARY KEY (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numeros_de_contas_gerados`
--

LOCK TABLES `numeros_de_contas_gerados` WRITE;
/*!40000 ALTER TABLE `numeros_de_contas_gerados` DISABLE KEYS */;
INSERT INTO `numeros_de_contas_gerados` VALUES (14722656),(15080489),(15866601),(16721210),(20491281),(25501271),(25755081),(27151147),(37118708),(38645004),(44305376),(47671041),(49120395),(60640102),(62314123),(62444637),(64214599),(66544889),(67412704),(69996683),(72724013),(84998004),(92840929),(93638671),(95307708),(99463720);
/*!40000 ALTER TABLE `numeros_de_contas_gerados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacoes`
--

DROP TABLE IF EXISTS `transacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacoes` (
  `id_transacao` char(36) NOT NULL,
  `id_conta_origem` char(36) NOT NULL,
  `id_conta_destino` char(36) DEFAULT NULL,
  `tipo_transacao` enum('TRANSFERENCIA') NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_transacao`),
  KEY `id_conta_origem` (`id_conta_origem`),
  KEY `id_conta_destino` (`id_conta_destino`),
  CONSTRAINT `transacoes_ibfk_1` FOREIGN KEY (`id_conta_origem`) REFERENCES `conta` (`id_conta`),
  CONSTRAINT `transacoes_ibfk_2` FOREIGN KEY (`id_conta_destino`) REFERENCES `conta` (`id_conta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacoes`
--

LOCK TABLES `transacoes` WRITE;
/*!40000 ALTER TABLE `transacoes` DISABLE KEYS */;
INSERT INTO `transacoes` VALUES ('0b5ec2f6-9678-464c-b9b2-021ceb11c6f0','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',12.00,'2025-06-03 14:30:00','Transferência entre contas'),('283ebf07-918b-4f03-8cc2-f7e8c990fdd2','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',2.00,'2025-06-03 14:30:00','Transferência entre contas'),('468a0f0f-216c-47c7-ae5e-986b6a4195e1','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',2.00,'2025-06-03 14:30:00','Transferência entre contas'),('4f68a04a-26a3-47e8-b5b1-489df59cd3ce','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',2.00,'2025-06-03 14:30:00','Transferência entre contas'),('7ca5e4da-6ff7-48a3-beb7-7676531ca76c','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',2.00,'2025-06-03 14:30:00','Transferência entre contas'),('9513ad7d-584f-429a-ae91-0f75497d4f98','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',12.10,'2025-06-03 14:30:00','Transferência entre contas'),('ad72351f-08d7-4fe6-898a-dee9343707fc','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',1200.10,'2025-06-03 14:30:00','Transferência entre contas'),('cb8c26c1-a460-4ab4-a4c4-b8b4c632d4be','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',2.00,'2025-06-03 14:30:00','Transferência entre contas'),('cdffaf30-1fe6-42fb-afd1-decb872edea8','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',2.00,'2025-06-03 14:30:00','Transferência entre contas'),('ed6fe98d-9408-4c86-b771-c3cdd6c31892','760a443f-8fb3-4995-8881-228e16735d98','f2722e4b-9a66-4c89-900c-85b31e754f32','TRANSFERENCIA',264.55,'2025-06-03 14:30:00','Transferência entre contas');
/*!40000 ALTER TABLE `transacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relatorios`
--

DROP TABLE IF EXISTS `relatorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatorios` (
  `id_relatorio` char(36) NOT NULL,
  `id_funcionario` char(36) NOT NULL,
  `tipo_relatorio` varchar(255) NOT NULL,
  `data_geracao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conteudo` text NOT NULL,
  PRIMARY KEY (`id_relatorio`),
  KEY `fk_relatorio_funcionario` (`id_funcionario`),
  CONSTRAINT `fk_relatorio_funcionario` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relatorios`
--

LOCK TABLES `relatorios` WRITE;
/*!40000 ALTER TABLE `relatorios` DISABLE KEYS */;
/*!40000 ALTER TABLE `relatorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` char(36) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_nascimento` date NOT NULL,
  `tipo_usuario` enum('comum','administrador') NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `otp_ativo` tinyint(1) DEFAULT '0',
  `otp_expiracao` datetime DEFAULT NULL,
  `otp_codigo` varchar(6) DEFAULT NULL,
  `otp_utilizado` tinyint(1) DEFAULT '0',
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('3d0bbce2-6ac1-4f5f-b832-0c702de6efa2','João Pop','12345678976','1990-05-10','comum','(11)91234-5678','$2b$10$yE4Df7Jtx.0CgPXsyVa0K.6NTq8zhkZCbwlDDlu5Rwm6Vn1OQDwc2',1,'2025-06-09 02:08:31','472522',1,'09testfree@gmail.com'),('5054c7e4-936f-4055-a794-5074a9786507','Nazaré','56295715320','1990-05-10','administrador','(11)91234-5678','$2b$10$hZrWcpHU/4s99q.MEixZ5uXT.g70L7vDDCwYhKWYqzybBSuUM.VUe',0,'2025-06-08 19:57:56',NULL,0,'anazare799@gmail.com'),('63f23d09-d7ed-454e-b777-c4575efb911b','João Silva','12345678938','1990-05-10','administrador','(11)91234-5678','$2b$10$eu3uwaLd4wS9niFvrLNXs.YDjQ4I.YOsdy9MOUw8s7SDjdbuac0gq',1,'2025-05-28 17:21:20',NULL,0,''),('c5f83e16-88ff-4d82-a60f-995d63d4b6f4','Testeco','55555555555','1990-05-10','comum','(11)91234-5678','$2b$10$6HtJGcVnAbOPuXzY39fNeuKBG1ESxTO5D1F3N3H3asG2tIpuzWcXO',0,'2025-06-08 22:05:37','964247',0,'viniciusalmeida.lacerda123@gmail.com'),('e3655c61-7ee8-4a5e-80bc-e5b4360bd8eb','Gustavo','12345678910','1990-05-10','administrador','(11)91234-5678','$2b$10$dHWbdifT5GRPWO2dNTfks.215z8zuU3Ke0PAogjrbOwW6YOvJnvtO',1,'2025-05-29 00:23:27',NULL,0,''),('edbe263e-fe66-46d4-9a87-125741b49cd2','João Silva','12345678933','1990-05-10','administrador','(11)91234-5678','$2b$10$/jJ4svKdujJ/sfrCf8aLgu9CwjacgINHoBZpWO4obgda1MiWN/aE6',1,'2025-05-28 21:23:37','663612',0,'');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09 15:18:57
