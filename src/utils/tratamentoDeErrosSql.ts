export function tratarCodigosDeErroSql(erro: any) {
    if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
        return {
            erro: true,
            mensagem: `A chave estrangeira referenciada não existe.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
        return {
            erro: true,
            mensagem: `Não é possível deletar ou atualizar pois há uma chave estrangeira associada.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_DUP_ENTRY') {
        return {
            erro: true,
            mensagem: `Existem identificadores únicos que estão sendo duplicados.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_BAD_NULL_ERROR') {
        return {
            erro: true,
            mensagem: `Um campo obrigatório (NOT NULL) não foi preenchido.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_PARSE_ERROR') {
        return {
            erro: true,
            mensagem: `Erro de sintaxe na query SQL.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_NO_SUCH_TABLE') {
        return {
            erro: true,
            mensagem: `A tabela especificada não existe no banco de dados.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_WRONG_VALUE_COUNT_ON_ROW') {
        return {
            erro: true,
            mensagem: `A quantidade de valores na linha está incorreta.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_TRUNCATED_WRONG_VALUE') {
        return {
            erro: true,
            mensagem: `Valor com tipo inválido ou truncado durante a inserção.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_DATA_TOO_LONG') {
        return {
            erro: true,
            mensagem: `O valor fornecido excede o tamanho máximo permitido para a coluna.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
        return {
            erro: true,
            mensagem: `Constraint de verificação (CHECK) violada.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
        return {
            erro: true,
            mensagem: `Acesso ao banco de dados negado. Verifique as credenciais.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_LOCK_WAIT_TIMEOUT') {
        return {
            erro: true,
            mensagem: `Timeout ao esperar por um lock de transação.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_LOCK_DEADLOCK') {
        return {
            erro: true,
            mensagem: `Deadlock detectado. A transação foi abortada.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_BAD_FIELD_ERROR') {
        return {
            erro: true,
            mensagem: `Um dos campos referenciados na consulta não existe.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_UNKNOWN_COLUMN') {
        return {
            erro: true,
            mensagem: `Uma das colunas informadas não foi encontrada.`,
            codigo: 500
        }
    }

    if (erro.code === 'PROTOCOL_CONNECTION_LOST') {
        return {
            erro: true,
            mensagem: `A conexão com o banco de dados foi perdida.`,
            codigo: 500
        }
    }

    if (erro.code === 'ECONNREFUSED') {
        return {
            erro: true,
            mensagem: `A conexão com o banco de dados foi recusada.`,
            codigo: 500
        }
    }

    if (erro.code === 'ER_DBACCESS_DENIED_ERROR') {
        return {
            erro: true,
            mensagem: `Permissão negada para acessar o banco de dados.`,
            codigo: 500
        }
    }

    return false;

}