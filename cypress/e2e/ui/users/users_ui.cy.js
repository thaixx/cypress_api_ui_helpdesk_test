describe('User Page UI Tests', () => {
  const baseUrl = 'http://***/view'; // configure aqui o URL local correta

  beforeEach(() => {
    cy.visit(`${baseUrl}/user.html`);
  });

  it('should render user cards on page load', () => {
    cy.get('#user-card-container .card').should('exist');
  });

  it('should filter users based on search input', () => {
  
    cy.get('#user-card-container .card')
      .first()
      .invoke('text')
      .then(firstCardText => {
        const keyword = firstCardText.trim().split(' ')[0]; 
        cy.get('input[type="search"]').type(keyword);
        cy.wait(500);

        cy.get('#user-card-container .card').each($card => {
            cy.wrap($card).should('contain.text', keyword);
        });
    });
      
  });

  it('should open and close the create user modal', () => {
    cy.get('#modal').should('not.be.visible');
    cy.get('#addButton').click();
    cy.get('#modal').should('be.visible');

    cy.get('#modal .close').click();
    cy.get('#modal').should('not.be.visible');
  });

  it('should create a user from modal form', () => {
    const name = `Test User ${Date.now()}`;
    const email = `user${Date.now()}@example.com`;

    cy.get('#addButton').click();
    cy.get('#modal').should('be.visible');

    cy.get('#modal input#name').type(name);
    cy.get('#modal input#email').type(email);
    
    cy.intercept('GET', '/data/users.json').as('getUsers');

    cy.get('#modal button#modal-button').click();
    cy.wait('@getUsers'); 
    cy.get('#modal').should('not.be.visible');
    cy.contains('#user-card-container .card', name, { timeout: 10000 }).should('exist');
  });

  it('should logout and redirect to login page', () => {
    cy.window().then((win) => {
      cy.stub(win, 'location', 'replace').as('redirect');
    });
    cy.contains('Logout').click();
    cy.get('@redirect').should('have.been.called');
  });
});
