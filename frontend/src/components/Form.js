import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #242424;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Select = styled.select`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  background-color: #288547;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.obra.value = onEdit.obra;
      user.genero.value = onEdit.genero;
      user.poder.value = onEdit.poder;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if (
      !user.nome.value ||
      !user.obra.value ||
      !user.genero.value ||
      !user.poder.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          obra: user.obra.value,
          genero: user.genero.value,
          poder: user.poder.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          obra: user.obra.value,
          genero: user.genero.value,
          poder: user.poder.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.obra.value = "";
    user.genero.value = "";
    user.poder.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome:</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Obra:</Label>
        <Input name="obra" />
      </InputArea>
      <InputArea>
        <Label>Gênero:</Label>
        <Select name="genero" type="select">
          <option></option>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
          <option value="Indefinido">Não se aplica</option>
        </Select>
      </InputArea>
      <InputArea>
        <Label>Poder:</Label>
        <Select name="poder" type="select">
          <option></option>
          <option value="0 - Fraco">0 - Fraco</option>
          <option value="1 - Forte">1 - Forte</option>
          <option value="2 - Muito forte">2 - Muito forte</option>
          <option value="3 - INSANO">3 - INSANO</option>
        </Select>
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;