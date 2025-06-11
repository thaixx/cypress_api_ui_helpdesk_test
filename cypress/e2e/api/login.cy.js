describe('Auth API - Login & Logout', () => {
  const apiUrl = 'http://localhost:3000';

  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: '123456'
  };

  before(() => {
    
    cy.request({
      method: 'POST',
      url: `${apiUrl}/register`,
      body: testUser,
      failOnStatusCode: false 
    });
  });

  it('should login successfully with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: {
        email: testUser.email,
        password: testUser.password
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.eq('Logged in successfully.');
    });
  });
  
  //foi notado que o teste de login falha quando a senha está incorreta, ou seja tem um bug no codigo da api, ele não retorna o erro esperado
  it('should fail login with wrong password', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: {
        email: testUser.email,
        password: 'wrong-password'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Email/Password invalid');
    });
  });

  it('should fail login with wrong email', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: {
        email: 'wrong-email',
        password: 'wrong-password'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Email/Password invalid');
    });
  });

  it('should logout successfully if logged in', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/logout`,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.eq('Logged out successfully.');
    });
  });

  it('should fail logout if no one is logged in', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/logout`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid request');
    });
  });
});