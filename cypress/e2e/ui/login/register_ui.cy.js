describe('User Registration Page', () => {
  const apiUrl = 'http://localhost:3000';
  const baseUrl = 'http://***/view'; // configure aqui o URL local correta

  beforeEach(() => {
    cy.visit(`${baseUrl}/signUp.html`);
  });

  it('should register a user with valid data', () => {
    const name = 'John Doe';
    const email = `john${Date.now()}@example.com`;
    const password = 'password123';

    cy.get('input[name="name"]').type(name);
    cy.get('input[type="email"]').type(email);
    cy.get('#password').type(password);

    cy.get('form').submit();

    cy.location('pathname').should('include', '/login.html');
  });

  it('should not allow registration with empty fields', () => {
    cy.get('form').submit();
    cy.location('pathname').should('include', '/signUp.html');
  });

  it('should show error for duplicate email registration', () => {
    const name = 'Jane Doe';
    const email = `duplicate@example.com`;
    const password = 'password123';

    cy.request({
      method: 'POST',
      url: `${apiUrl}/register`,
      failOnStatusCode: false,
      body: { name, email, password }
    });

    cy.get('input[name="name"]').type(name);
    cy.get('input[type="email"]').type(email);
    cy.get('#password').type(password);

    cy.get('form').submit();
    cy.location('pathname').should('include', '/signUp.html');
  });
  it('should navigate to login page when clicking "Logar-se"', () => {
  
    cy.visit(`${baseUrl}/signUp.html`);
    cy.contains('a', 'Logar-se').click();
    cy.location('pathname').should('include', '/login.html');
  });
});
