-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14/06/2024 às 20:14
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `quimica_organica`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `compostos`
--

CREATE TABLE `compostos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `formula_molecular` varchar(50) DEFAULT NULL,
  `estrutura_molecular` text DEFAULT NULL,
  `grupo_funcional_id` int(11) DEFAULT NULL,
  `criado_por` int(11) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `foto1` varchar(255) NOT NULL,
  `foto2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `compostos`
--

INSERT INTO `compostos` (`id`, `nome`, `formula_molecular`, `estrutura_molecular`, `grupo_funcional_id`, `criado_por`, `criado_em`, `foto1`, `foto2`) VALUES
(1, 'Etanol', 'C2H6O', 'CH3CH2OH', 1, 1, '2024-06-12 10:38:34', 'default.jpg', 'default.jpg'),
(2, 'Metanal', 'CH2O', 'HCHO', 2, 1, '2024-06-12 10:38:34', 'default.jpg', 'default.jpg'),
(5, 'dada', 'wfetryuityrf', 'ghgjghfds', 2, NULL, '2024-06-14 16:31:14', '1718382674892-86301183.png', '1718382674893-583233895.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupos_funcionais`
--

CREATE TABLE `grupos_funcionais` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `foto1` varchar(255) NOT NULL,
  `foto2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `grupos_funcionais`
--

INSERT INTO `grupos_funcionais` (`id`, `nome`, `descricao`, `foto1`, `foto2`) VALUES
(1, 'Álcool', 'Compostos que contêm um ou mais grupos hidroxila (-OH) ligados a um átomo de carbono saturado', 'default.jpg', 'default.jpg'),
(2, 'Aldeído', 'Compostos que contêm um grupo formil (R-CHO)', 'default.jpg', 'default.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `propriedades`
--

CREATE TABLE `propriedades` (
  `id` int(11) NOT NULL,
  `composto_id` int(11) DEFAULT NULL,
  `propriedade_nome` varchar(100) DEFAULT NULL,
  `propriedade_valor` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `propriedades`
--

INSERT INTO `propriedades` (`id`, `composto_id`, `propriedade_nome`, `propriedade_valor`) VALUES
(1, 1, 'Ponto de Ebulição', '78.37°C'),
(2, 1, 'Ponto de Fusão', '-114.1°C'),
(3, 2, 'Ponto de Ebulição', '-19°C'),
(4, 2, 'Ponto de Fusão', '-92°C');

-- --------------------------------------------------------

--
-- Estrutura para tabela `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option_a` text NOT NULL,
  `option_b` text NOT NULL,
  `option_c` text DEFAULT NULL,
  `option_d` text DEFAULT NULL,
  `option_e` text DEFAULT NULL,
  `correct_option` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usos`
--

CREATE TABLE `usos` (
  `id` int(11) NOT NULL,
  `composto_id` int(11) DEFAULT NULL,
  `uso_descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usos`
--

INSERT INTO `usos` (`id`, `composto_id`, `uso_descricao`) VALUES
(1, 1, 'Usado em bebidas alcoólicas, solventes e como combustível.'),
(2, 2, 'Usado na produção de resinas, adesivos e como conservante em laboratórios.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` enum('usuario','admin') DEFAULT 'usuario',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `tipo`, `criado_em`) VALUES
(1, 'Admin', 'admin@exemplo.com', 'senha_hash', 'admin', '2024-06-12 10:38:34');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `compostos`
--
ALTER TABLE `compostos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grupo_funcional_id` (`grupo_funcional_id`),
  ADD KEY `criado_por` (`criado_por`);

--
-- Índices de tabela `grupos_funcionais`
--
ALTER TABLE `grupos_funcionais`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `propriedades`
--
ALTER TABLE `propriedades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `composto_id` (`composto_id`);

--
-- Índices de tabela `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usos`
--
ALTER TABLE `usos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `composto_id` (`composto_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `compostos`
--
ALTER TABLE `compostos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `grupos_funcionais`
--
ALTER TABLE `grupos_funcionais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `propriedades`
--
ALTER TABLE `propriedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usos`
--
ALTER TABLE `usos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `compostos`
--
ALTER TABLE `compostos`
  ADD CONSTRAINT `compostos_ibfk_1` FOREIGN KEY (`grupo_funcional_id`) REFERENCES `grupos_funcionais` (`id`),
  ADD CONSTRAINT `compostos_ibfk_2` FOREIGN KEY (`criado_por`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `propriedades`
--
ALTER TABLE `propriedades`
  ADD CONSTRAINT `propriedades_ibfk_1` FOREIGN KEY (`composto_id`) REFERENCES `compostos` (`id`);

--
-- Restrições para tabelas `usos`
--
ALTER TABLE `usos`
  ADD CONSTRAINT `usos_ibfk_1` FOREIGN KEY (`composto_id`) REFERENCES `compostos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
