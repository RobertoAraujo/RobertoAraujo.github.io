-- Schema do Formulário de Contato
-- Criado em: 21 de maio de 2026

CREATE TABLE IF NOT EXISTS formulario_contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    assunto VARCHAR(200) NOT NULL,
    mensagem TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('novo', 'lido', 'respondido') DEFAULT 'novo',
    INDEX idx_email (email),
    INDEX idx_data (data_criacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exemplo de inserção:
-- INSERT INTO formulario_contato (nome, email, telefone, assunto, mensagem) 
-- VALUES ('João Silva', 'joao@email.com', '11999999999', 'Dúvida', 'Gostaria de mais informações...');

-- Query para listar mensagens:
-- SELECT * FROM formulario_contato WHERE status = 'novo' ORDER BY data_criacao DESC;
