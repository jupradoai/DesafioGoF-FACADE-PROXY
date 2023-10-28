// SUBSISTEMA1
class SistemaDeAutenticacao {
    autenticarUsuario(usuario) {
        console.log(`Autenticando usuário... ${usuario}`);
    }
}

// SUBSISTEMA2
class SistemaDeCadastro {
    cadastrarUsuario(cadastro) {
        console.log(`Criando cadastro... ${cadastro}`);
    }
}

// SUBSISTEMA3
class SistemaDePedidos {
    criarPedido(pedido, usuario) {
        console.log(`Pedido de ${pedido} para: ${usuario}`);
    }
}

// FACHADA
class LojaOnline {
    constructor() {
        this.autentica = new SistemaDeAutenticacao();
        this.cadastro = new SistemaDeCadastro();
        this.pedido = new SistemaDePedidos();
    }

    realizarCompra(produto, usuario, cadastro) {
        try {
            if (!produto || !usuario || !cadastro) {
                throw new Error('Parâmetros ausentes. Certifique-se de fornecer produto, usuário e cadastro.');
            }
            this.autentica.autenticarUsuario(usuario);
            this.cadastro.cadastrarUsuario(cadastro);
            this.pedido.criarPedido(produto, usuario);
        } catch (error) {
            console.error('Erro na compra:', error.message);
        }
    }
}

// OBJETO REAL
class Produto {
    constructor(nome) {
        this.nome = nome;
    }

    exibirDetalhes() {
        console.log(`Produto: ${this.nome}`);
    }
  toString() {
      return this.nome;
  }
}

// Proxy - CLASSE PROXY PRODUTO
class ProxyProduto {
    constructor(produto) {
        this.produto = produto;
    }

    exibirDetalhes() {
        console.log("Aguardando autenticação...");
        this.autenticar();
        this.produto.exibirDetalhes();
    }

    autenticar() {
        console.log("Autenticando usuário...");
        // INSERIR LÓGICA DE AUTENTICAÇÃO AQUI
        console.log("Usuário autenticado com sucesso");
    }
}

// CLIENTE EXEMPLO DE USO
const loja = new LojaOnline();
const produtoReal = new Produto("Tablet");
const usuario = 'Julyana';
const cadastro = 'jtplara@gmail.com';

loja.realizarCompra(produtoReal, usuario, cadastro);

try {
    loja.realizarCompra(produtoReal);
} catch (error) {
    console.error('Erro na compra:', error.message);
}

const produtoReal2 = new Produto("LENOVO");
const proxyProduto = new ProxyProduto(produtoReal2);

proxyProduto.exibirDetalhes();
