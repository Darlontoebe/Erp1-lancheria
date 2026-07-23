# 🍔 ERP Lancheria

Um sistema simples de gestão feito para lanchonetes, cafeterias e negócios de delivery. A ideia é ajudar o dono do negócio a organizar produtos, estoque, clientes e vendas em um só lugar, sem complicação.

Este projeto foi criado como parte dos meus estudos em Análise e Desenvolvimento de Sistemas, com o objetivo de aplicar na prática o que venho aprendendo.

---

## 💡 O que esse sistema faz?

Pensa em um caderninho de anotações de uma lancheria, só que digital, organizado e automático. O sistema tem 6 áreas principais:

### 📊 Dashboard
A tela inicial, com um resumo geral do negócio: quanto foi vendido, quantos pedidos foram feitos e quantos produtos existem no estoque.

### 📦 Produtos
Aqui você cadastra tudo que a lanchonete vende: nome, preço de venda, custo e a quantidade disponível. Dá pra ver a lista completa e apagar produtos que não existem mais.

### 🏬 Estoque
Controla quanto de cada produto ainda tem disponível. Toda vez que chega mercadoria nova, você registra uma "entrada". Se precisar tirar algo manualmente (por perda, validade vencida, etc), registra uma "saída".

### 👥 Clientes
Um cadastro simples com nome, telefone e endereço dos clientes, pra manter contato e organização.

### 🛒 Vendas (o "caixa" do sistema)
Esse é o coração do projeto. Funciona como um caixa de loja de verdade:
- Você escolhe os produtos e vai montando um carrinho de compras
- O sistema calcula o total automaticamente
- Quando a venda é finalizada, o estoque desses produtos diminui sozinho — sem precisar fazer essa conta na mão
- Se um produto não tiver mais em estoque, o sistema avisa e não deixa vender

### 📈 Relatórios
Um resumo rápido de tudo: quanto já foi vendido no total e quantos produtos estão cadastrados.

---

## 🔒 Um cuidado extra: segurança

Todo texto que o usuário digita (nome de produto, cliente, etc) passa por um tratamento antes de aparecer na tela. Isso evita que alguém, sem querer ou por má intenção, digite algo que "engane" o sistema e faça ele rodar um código estranho na página. É uma prática comum em sistemas profissionais, mesmo em projetos pequenos como esse.

---

## 🖥️ Como ele foi construído?

O projeto é todo "front-end" — ou seja, roda direto no navegador, sem precisar de um servidor complicado por trás. Isso foi uma escolha pensada: deixa o projeto leve, rápido de rodar e fácil de hospedar gratuitamente.

- **HTML, CSS e JavaScript puro** — a base de qualquer site, sem frameworks pesados
- **Bootstrap** — uma "caixa de ferramentas" pronta que ajuda a deixar o visual bonito e organizado mais rápido
- **LocalStorage** — uma forma do navegador guardar os dados (produtos, clientes, vendas) mesmo depois que você fecha a página. Funciona como uma "memória" do sistema

---

## 🌐 Como testar o projeto

O projeto está publicado e pode ser acessado direto pelo navegador, sem precisar instalar nada:

👉 *(coloque aqui o link do Netlify ou GitHub Pages)*

Se quiser rodar localmente no seu computador:

1. Baixe ou clone este repositório
2. Abra a pasta do projeto
3. Dê dois cliques no arquivo `index.html` (ou use a extensão "Live Server" do VS Code para uma experiência melhor)
4. Pronto! O sistema já vai abrir no navegador

---

## 📱 Funciona no celular?

Sim! O layout se ajusta para telas menores, então dá pra usar tanto no computador quanto no celular.

---

## 🎯 Por que eu fiz esse projeto?

Estou no curso de Análise e Desenvolvimento de Sistemas e queria colocar em prática, num projeto real e útil, conceitos como:
- Organização de um sistema em partes menores (cada função do sistema no seu próprio espaço)
- Como diferentes partes de um sistema podem "conversar" entre si (por exemplo: uma venda afeta o estoque automaticamente)
- Boas práticas básicas de segurança
- Como deixar uma interface bonita e fácil de usar

---

## 👤 Autor

Desenvolvido por **Darlon Toebe**
Estudante de Análise e Desenvolvimento de Sistemas (ADS) — Gran Faculdade

GitHub: [@Darlontoebe](https://github.com/Darlontoebe)