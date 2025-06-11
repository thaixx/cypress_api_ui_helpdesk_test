
describe('Página de Login - Help Desk', () => {
  const baseUrl = 'http://***/view'; // configure aqui o URL local correta
   before(() => {
    Cypress.on('uncaught:exception', () => false) 
  })
  beforeEach(() => {
    cy.visit(`${baseUrl}/login.html`) 
  })

  it('Should display email, password fields and login button', () => {
    cy.get('input#user').should('be.visible').and('have.attr', 'type', 'email')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', 'Logar').should('be.visible')
  })

  it('Should not allow login with empty fields', () => {
    cy.contains('button', 'Logar').click()
    cy.url().should('not.include', 'user.html') 
  })

  it('Should attempt login with valid data and redirect (mocked API)', () => {

    cy.get('input#user').type('teste@teste.com')
    cy.get('input[type="password"]').type('senha123')
    cy.contains('button', 'Logar').click()
    cy.url().should('include', 'login?user=')
  })

})
