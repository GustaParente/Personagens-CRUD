import mysql from "mysql"
import passwordBd from './password.js'

// Criando a conexão com o banco de dados
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: passwordBd,
    database: "personagens"
});
