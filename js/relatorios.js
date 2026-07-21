function loadRelatorios() {
    const mainContent = document.getElementById('main-content');
    const totalVendas = vendas.reduce((sum, v) => sum + parseFloat(v.total), 0);

    mainContent.innerHTML = `
        <h2>📈 Relatórios</h2>
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5>Resumo Geral</h5>
                        <p><strong>Total de Vendas:</strong> ${vendas.length}</p>
                        <p><strong>Valor Total Vendido:</strong> R$ ${totalVendas.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5>Produtos Cadastrados</h5>
                        <p><strong>Total de Produtos:</strong> ${produtos.length}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}