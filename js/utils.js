// Função de segurança: transforma texto em HTML seguro (previne XSS)
function escapeHTML(texto) {
    if (texto === null || texto === undefined) return '';
    
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}