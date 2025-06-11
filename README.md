# 🧪 Testes Automatizados Helpdesk com Cypress (API + UI)

Este repositório contém testes automatizados para a aplicação **Helpdesk**, utilizando o framework [Cypress](https://www.cypress.io/) para validação das funcionalidades de **API** e **Interface do Usuário (UI)**.

---

## 📁 Estrutura do Projeto

cypress/

├── e2e/

│ ├── api/

│ │ ├── login.cy.js

│ │ ├── register.cy.js

│ │ ├── tickets.cy.js

│ │ └── users.cy.js

│ └── ui/

│ ├── login/

│ │ ├── login_ui.cy.js

│ │ └── register_ui.cy.js

│ ├── tickets/

│ │ └── tickets_ui.cy.js

│ └── users/

│ └── users_ui.cy.js

├── fixtures/

├── support/

├── .gitignore

├── cypress.config.js

├── package.json

└── package-lock.json


---

## ⚙️ Pré-requisitos

- Node.js instalado
- Projeto Helpdesk rodando localmente:
  - [Back-end (API)](https://github.com/automacaohml/helpdesk-api) em `http://localhost:3000`
  - Frontend servido via Live Server ou http-server em `http://127.0.0.1:5500/view`

---

## ▶️ Como Executar os Testes

### 1. Clonar o repositório

```bash
git clone https://github.com/thaixx/cypress_api_ui_helpdesk_test.git
cd cypress_api_ui_helpdesk_test
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar os testes (na interface gráfica)

```bash
npx cypress open
```

### 3. (ou) Rodar os testes (na terminal)

```bash
npx cypress run
```

👩‍💻 Autora
Desenvolvido por Thaís como parte de um projeto de automação de testes usando Cypress.

🔗 Repositório: https://github.com/thaixx/cypress_api_ui_helpdesk_test





