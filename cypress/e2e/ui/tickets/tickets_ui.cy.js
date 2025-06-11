describe('Ticket Page UI Tests', () => {
  const baseUrl = 'http://***/view'; // configure aqui o URL local correta

  beforeEach(() => {
    cy.visit(`${baseUrl}/ticket.html`);
  });

  it('should render ticket cards on page load', () => {
    cy.get('.card-container .card').should('have.length.greaterThan', 0);
  });

  ['Open', 'In Progress', 'Closed'].forEach(status => {
    it(`should filter tickets by status: ${status}`, () => {
      cy.get('select').select(status);
      cy.wait(500)
      cy.get('.card-container .card').each(card => {
        cy.wrap(card).contains(status);
      });
    });
  });

  it('should open the create ticket modal when clicking the add button', () => {
    cy.get('.modal').should('have.css', 'display', 'none');
    cy.get('.addButton').click();
    cy.get('.modal').should('have.css', 'display', 'block');
  });

  it('should close the modal when clicking the × icon', () => {
    cy.get('.addButton').click();
    cy.get('.modal').should('have.css', 'display', 'block');
    cy.get('.modal span').click();
    cy.get('.modal').should('have.css', 'display', 'none');
  });

  it('should create a new ticket with valid email and description', () => {
    const email = 'Beyonce.kenowless@example.com'; // <-- garanta que esse e-mail exista no backend
    const description = `Teste ticket ${Date.now()}`;

    cy.get('.addButton').click();
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="text"]').type(description);
    cy.contains('button', 'Criar').click();

    cy.get('.card-container').contains(description);
  });

  it('should logout and redirect to login page', () => {
    cy.contains('button', 'Logout').click();
    cy.url().should('include', '/login.html');
  });
});
