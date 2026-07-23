// ====================== VENDAS.JS ======================

let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
let carrinho = [];

function loadVendas() {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <h2>🛒 Vendas - PDV</h2>
        
        <div class="row">
            <!-- Coluna dos Produtos -->
            <div class="col-lg-7">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5>Produtos Disponíveis</h5>
                        <input type="text" id="buscaProduto" class="form-control mb-3" placeholder="Buscar produto...">
                        <div class="row" id="listaProdutos"></div>
                    </div>
                </div>
            </div>

            <!-- Coluna do Carrinho -->
            <div class="col-lg-5">
                <div class="card mb-4" style="position: sticky; top: 20px;">
                    <div class="card-body">
                        <h5>Carrinho (${carrinho.length})</h5>
                        <div id="carrinhoItens"></div>
                        
                        <hr>
                        <div class="d-flex justify-content-between fs-4 mb-3">
                            <strong>Total:</strong>
                            <strong id="totalCarrinho">R$ 0,00</strong>
                        </div>
                        
                        <button onclick="finalizarVenda()" class="btn btn-success btn-lg w-100 mb-2">
                            ✅ Finalizar Venda
                        </button>
                        <button onclick="limparCarrinho()" class="btn btn-outline-danger w-100">
                            Limpar Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Histórico de Vendas -->
        <div class="card">
            <div class="card-body">
                <h5>Histórico de Vendas (${vendas.length})</h5>
                <table class="table table-hover" id="vendasTable">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Itens</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    `;

    renderProdutosDisponiveis();
    renderCarrinho();
    renderVendasTable();

    document.getElementById('buscaProduto').addEventListener('input', renderProdutosDisponiveis);
}

// Renderiza produtos disponíveis (com estoque)
function renderProdutosDisponiveis() {
    const container = document.getElementById('listaProdutos');
    const busca = document.getElementById('buscaProduto').value.toLowerCase().trim();
    
    let produtosFiltrados = produtos;
    
    if (busca) {
        produtosFiltrados = produtos.filter(p => 
            p.nome.toLowerCase().includes(busca)
        );
    }

    let html = '';
    if (produtosFiltrados.length === 0) {
        html = `<p class="text-muted">Nenhum produto encontrado.</p>`;
    } else {
        produtosFiltrados.forEach(prod => {
            const idxReal = produtos.indexOf(prod);
            const semEstoque = (prod.estoque || 0) <= 0;

            html += `
                <div class="col-md-6 col-lg-4 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6>${escapeHTML(prod.nome)}</h6>
                            <p class="text-success fw-bold">R$ ${prod.preco.toFixed(2)}</p>
                            <p class="text-muted small">Estoque: ${prod.estoque || 0} un</p>
                            <button onclick="adicionarAoCarrinho(${idxReal})" 
                                    class="btn btn-success btn-sm w-100" ${semEstoque ? 'disabled' : ''}>
                                ${semEstoque ? 'Sem estoque' : '+ Adicionar'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
}

// Adiciona produto ao carrinho (respeitando o estoque)
function adicionarAoCarrinho(index) {
    const produto = produtos[index];
    const itemExistente = carrinho.find(item => item.nome === produto.nome);
    const qtdNoCarrinho = itemExistente ? itemExistente.quantidade : 0;

    if (qtdNoCarrinho + 1 > (produto.estoque || 0)) {
        alert("Estoque insuficiente para esse produto!");
        return;
    }

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    renderCarrinho();
}

// Renderiza carrinho
function renderCarrinho() {
    const container = document.getElementById('carrinhoItens');
    let html = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        html += `
            <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                <div>
                    <small>${escapeHTML(item.nome)}</small><br>
                    <strong>R$ ${item.preco.toFixed(2)} × ${item.quantidade}</strong>
                </div>
                <div class="text-end">
                    <div class="btn-group btn-group-sm">
                        <button onclick="alterarQuantidade(${index}, -1)" class="btn btn-outline-secondary">-</button>
                        <button class="btn btn-outline-secondary">${item.quantidade}</button>
                        <button onclick="alterarQuantidade(${index}, 1)" class="btn btn-outline-secondary">+</button>
                    </div>
                    <button onclick="removerDoCarrinho(${index})" class="btn btn-danger btn-sm ms-2">×</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html || '<p class="text-muted">Carrinho vazio</p>';
    document.getElementById('totalCarrinho').textContent = `R$ ${total.toFixed(2)}`;
}

function alterarQuantidade(index, delta) {
    const item = carrinho[index];
    const produtoOriginal = produtos.find(p => p.nome === item.nome);

    const novaQtd = item.quantidade + delta;

    if (novaQtd < 1) return;
    if (novaQtd > (produtoOriginal.estoque || 0)) {
        alert("Estoque insuficiente!");
        return;
    }

    item.quantidade = novaQtd;
    renderCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    renderCarrinho();
}

function limparCarrinho() {
    if (confirm("Limpar todo o carrinho?")) {
        carrinho = [];
        renderCarrinho();
    }
}

// Finaliza a venda e desconta do estoque
function finalizarVenda() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

    // Desconta do estoque real
    carrinho.forEach(item => {
        const produtoOriginal = produtos.find(p => p.nome === item.nome);
        if (produtoOriginal) {
            produtoOriginal.estoque -= item.quantidade;
        }
    });
    localStorage.setItem('produtos', JSON.stringify(produtos));

    const venda = {
        data: new Date().toLocaleString('pt-BR'),
        total: total,
        itens: carrinho.map(item => `${item.nome} (${item.quantidade}x)`).join(", ")
    };

    vendas.unshift(venda);
    localStorage.setItem('vendas', JSON.stringify(vendas));

    alert(`✅ Venda finalizada com sucesso!\nTotal: R$ ${total.toFixed(2)}`);
    
    carrinho = [];
    loadVendas(); // recarrega a tela pra atualizar estoque na lista de produtos também
}

function renderVendasTable() {
    const tbody = document.querySelector('#vendasTable tbody');
    tbody.innerHTML = '';

    vendas.forEach(v => {
        tbody.innerHTML += `
            <tr>
                <td>${escapeHTML(v.data)}</td>
                <td>${escapeHTML(v.itens)}</td>
                <td><strong>R$ ${parseFloat(v.total).toFixed(2)}</strong></td>
            </tr>
        `;
    });
}