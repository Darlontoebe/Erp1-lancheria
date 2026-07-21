const mainContent = document.getElementById('main-content');

// Navegação
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const page = this.textContent.trim();
        
        if (page === 'Dashboard') loadDashboard();
        else if (page === 'Produtos') loadProdutos();
        else if (page === 'Estoque') loadEstoque();
        else if (page === 'Clientes') loadClientes();
        else if (page === 'Vendas') loadVendas();
        else if (page === 'Relatórios') loadRelatorios();
        else {
            mainContent.innerHTML = `<h2>${page}</h2><p class="text-muted">Módulo em desenvolvimento...</p>`;
        }
    });
});

// Iniciar com Dashboard
loadDashboard();