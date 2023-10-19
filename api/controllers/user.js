import { db } from "../db.js";

// Função de buscar no banco de dados
export const getUsers = (_, res) => {
    const q = "SELECT * FROM chars";
    
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

// Função de adicionar no banco de dados
export const addUser = (req, res) => {
    const q = 
        "INSERT INTO chars(`nome`, `obra`, `genero`, `poder`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.obra,
        req.body.genero,
        req.body.poder,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso.");
    });
};

// Função de atualizar no banco de dados
export const updateUser = (req, res) => {
    const q = 
        "UPDATE chars SET `nome` = ?, `obra` = ?, `genero` = ?, `poder` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.obra,
        req.body.genero,
        req.body.poder,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso.");
    });
};

// Função de deletar no banco de dados
export const deleteUser = (req, res) => {
    const q = "DELETE FROM chars WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.");
    });
};