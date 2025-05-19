import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
})

export async function inicializarBanco() {
  try {
    const conexao = await pool.getConnection()
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso! ✅')
  } catch (erro: any) {
    console.error('❌ Erro ao conectar no banco:', erro.message)
  }
}
