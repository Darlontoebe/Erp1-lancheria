function loadDashboard() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <h2>📊 Dashboard</h2>
        <p>Bem-vindo ao ERP Lancheria!</p>
        <div class="row mt-4">
            <div class="col-md-4"><div class="card p-3 text-center"><h4>R$ 0,00</h4><p>Vendas Hoje</p></div></div>
            <div class="col-md-4"><div class="card p-3 text-center"><h4>12</h4><p>Pedidos Hoje</p></div></div>
            <div class="col-md-4"><div class="card p-3 text-center"><h4>45</h4><p>Produtos em Estoque</p></div></div>
        </div>
    `;
}