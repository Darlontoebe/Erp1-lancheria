let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

function loadClientes() {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <h2>👥 Clientes</h2>
        
        <div class="card mb-4">
            <div class="card-body">
                <h5>+ Novo Cliente</h5>
                <form id="clientForm">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="nome" placeholder="Nome completo" required>
                        </div>
                        <div class="col-md-4">
                            <input type="tel" class="form-control" id="telefone" placeholder="(51) 99999-8888" required>
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="endereco" placeholder="Endereço">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success mt-3">Salvar Cliente</button>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h5>Lista de Clientes (${clientes.length})</h5>
                <table class="table table-hover" id="clientesTable">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('clientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const endereco = document.getElementById('endereco').value.trim();

        if (nome && telefone) {
            clientes.push({ nome, telefone, endereco: endereco || "Não informado" });
            localStorage.setItem('clientes', JSON.stringify(clientes));
            this.reset();
            renderClientesTable();
            alert("Cliente salvo!");
        }
    });

    renderClientesTable();
}

function renderClientesTable() {
    const tbody = document.querySelector('#clientesTable tbody');
    tbody.innerHTML = '';

    clientes.forEach((c, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${escapeHTML(c.nome)}</td>
                <td>${escapeHTML(c.telefone)}</td>
                <td>${escapeHTML(c.endereco)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteClient(${i})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function deleteClient(i) {
    if (confirm("Excluir cliente?")) {
        clientes.splice(i, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        renderClientesTable();
    }
}