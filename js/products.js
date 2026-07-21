let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

function loadProdutos() {
    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = `
        <h2>📦 Produtos</h2>
        <div class="card mb-4">
            <div class="card-body">
                <h5>+ Novo Produto</h5>
                <form id="productForm">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="nome" placeholder="Nome do produto" required>
                        </div>
                        <div class="col-md-2">
                            <input type="number" step="0.01" class="form-control" id="preco" placeholder="Preço" required>
                        </div>
                        <div class="col-md-2">
                            <input type="number" step="0.01" class="form-control" id="custo" placeholder="Custo" required>
                        </div>
                        <div class="col-md-2">
                            <input type="number" class="form-control" id="estoque" placeholder="Estoque Inicial" value="0" required>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-success w-100">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h5>Lista de Produtos (${produtos.length})</h5>
                <table class="table table-hover" id="productsTable">
                    <thead>
                        <tr><th>Nome</th><th>Preço</th><th>Custo</th><th>Estoque</th><th>Ações</th></tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('productForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const preco = parseFloat(document.getElementById('preco').value);
        const custo = parseFloat(document.getElementById('custo').value);
        const estoque = parseInt(document.getElementById('estoque').value) || 0;

        if (nome && preco && custo >= 0) {
            produtos.push({ nome, preco, custo, estoque });
            localStorage.setItem('produtos', JSON.stringify(produtos));
            this.reset();
            renderProductsTable();
            alert("Produto salvo!");
        }
    });

    renderProductsTable();
}

function renderProductsTable() {
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';

    produtos.forEach((p, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${escapeHTML(p.nome)}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>R$ ${p.custo.toFixed(2)}</td>
                <td><strong>${p.estoque || 0}</strong> un</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function deleteProduct(i) {
    if (confirm("Excluir produto?")) {
        produtos.splice(i, 1);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        renderProductsTable();
    }
}

// Migração automática para produtos antigos
if (produtos.length > 0 && !produtos[0].hasOwnProperty('estoque')) {
    produtos.forEach(p => p.estoque = 0);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}