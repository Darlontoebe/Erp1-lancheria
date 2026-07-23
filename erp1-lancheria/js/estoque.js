// ====================== ESTOQUE.JS ======================

function loadEstoque() {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <h2>📦 Controle de Estoque</h2>
        
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5>📥 Entrada de Produtos</h5>
                        <select id="produtoEntrada" class="form-select mb-3"></select>
                        <div class="input-group">
                            <input type="number" id="qtdEntrada" class="form-control" placeholder="Quantidade" min="1">
                            <button onclick="entradaEstoque()" class="btn btn-success">Entrada</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5>📤 Saída Manual</h5>
                        <select id="produtoSaida" class="form-select mb-3"></select>
                        <div class="input-group">
                            <input type="number" id="qtdSaida" class="form-control" placeholder="Quantidade" min="1">
                            <button onclick="saidaEstoque()" class="btn btn-warning">Saída</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h5>📋 Produtos em Estoque</h5>
                <table class="table table-hover" id="estoqueTable">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Estoque</th>
                            <th>Preço</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    `;

    carregarSelects();
    atualizarTabelaEstoque();
}

function carregarSelects() {
    const html = produtos.map((p, i) => 
        `<option value="${i}">${escapeHTML(p.nome)} (${p.estoque || 0} un)</option>`
    ).join('');

    document.getElementById('produtoEntrada').innerHTML = `<option value="">Selecione...</option>` + html;
    document.getElementById('produtoSaida').innerHTML = `<option value="">Selecione...</option>` + html;
}

function atualizarTabelaEstoque() {
    const tbody = document.querySelector('#estoqueTable tbody');
    tbody.innerHTML = produtos.map(p => {
        const total = (p.preco * (p.estoque || 0)).toFixed(2);
        return `
            <tr>
                <td>${escapeHTML(p.nome)}</td>
                <td><strong>${p.estoque || 0}</strong></td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>R$ ${total}</td>
            </tr>
        `;
    }).join('');
}

function entradaEstoque() {
    const idx = document.getElementById('produtoEntrada').value;
    const qtd = parseInt(document.getElementById('qtdEntrada').value);

    if (!idx || !qtd) return alert("Preencha os campos!");

    produtos[idx].estoque = (produtos[idx].estoque || 0) + qtd;
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    alert("Entrada registrada!");
    carregarSelects();
    atualizarTabelaEstoque();
}

function saidaEstoque() {
    const idx = document.getElementById('produtoSaida').value;
    const qtd = parseInt(document.getElementById('qtdSaida').value);

    if (!idx || !qtd) return alert("Preencha os campos!");

    if (qtd > (produtos[idx].estoque || 0)) {
        return alert("Estoque insuficiente!");
    }

    produtos[idx].estoque -= qtd;
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
    alert("Saída registrada!");
    carregarSelects();
    atualizarTabelaEstoque();
}