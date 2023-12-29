import React from "react";
import { Form, Button, Table } from "react-bootstrap";

class Cadastros extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      descricao: "",
      preco: "",
      produtos: [],
      produtoSelecionado: null,
    };
  }

  componentDidMount() {
    this.buscarProduto();
  }

  buscarProduto = () => {
    fetch("/Banco/produtos.json")
      .then((response) => response.json())
      .then((data) => this.setState({ produtos: data }))
      .catch((error) => console.error("Erro ao carregar dados:", error));
  };

  deletarProduto = (id) => {
    const novosProdutos = this.state.produtos.filter((produto) => produto.id !== id);
    this.setState({ produtos: novosProdutos });
  };

  cadastraproduto = (produto) => {
    var todosprodutos = this.state.produtos;
    todosprodutos.push(produto);
    this.setState({ produtos: todosprodutos });
  };

  atualizarProduto = () => {
    if (this.state.produtoSelecionado) {
      const { id, nome, descricao, preco } = this.state.produtoSelecionado;
      const produtosAtualizados = this.state.produtos.map((produto) =>
        produto.id === id ? { id, nome: this.state.nome, descricao: this.state.descricao, preco: this.state.preco } : produto
      );

      this.setState({
        produtos: produtosAtualizados,
        nome: "",
        descricao: "",
        preco: "",
        produtoSelecionado: null,
      });
    }
  };

  selecionarProduto = (produto) => {
    this.setState({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      produtoSelecionado: produto,
    });
  };

  atualizanome = (n) => {
    this.setState({
      nome: n.target.value,
    });
  };

  atualizadescri = (n) => {
    this.setState({
      descricao: n.target.value,
    });
  };

  atualizapreco = (n) => {
    this.setState({
      preco: n.target.value,
    });
  };

  submit = (event) => {
    event.preventDefault();

    if (this.state.produtoSelecionado) {
      this.atualizarProduto();
    } else {
      const produto = {
        nome: this.state.nome,
        descricao: this.state.descricao,
        preco: this.state.preco,
      };

      this.cadastraproduto(produto);
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.submit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              type="name"
              placeholder="Nome do Produto"
              value={this.state.nome}
              onChange={this.atualizanome}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Descrição do produto</Form.Label>
            <Form.Control
              type="name"
              placeholder="Descreva o produto"
              value={this.state.descricao}
              onChange={this.atualizadescri}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="numeric"
              placeholder="Insira o Valor"
              value={this.state.preco}
              onChange={this.atualizapreco}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {this.state.produtoSelecionado ? "Atualizar" : "Salvar"}
          </Button>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome do Produto</th>
              <th>Descrição do Produto</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.preco}</td>
                <td>
                  <Button variant="info" onClick={() => this.selecionarProduto(produto)}>
                    Atualizar
                  </Button>{" "}
                  <Button variant="danger" onClick={() => this.deletarProduto(produto.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Cadastros;
