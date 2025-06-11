import { faker } from '@faker-js/faker';

describe('Auth API - Register', () => {
  const apiUrl = 'http://localhost:3000/register';
  let testUser = {};

  it('should successfully register a new user', () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = 'Password123';

    testUser = { name, email, password };

    cy.request('POST', apiUrl, testUser).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('should not allow registration with an existing email', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      failOnStatusCode: false,
      body: testUser
    }).then((response) => {
      expect(response.status).to.eq(409); // or 400 depending on API
      expect(response.body.error).to.include('already exists');
    });
  });

  it('should return an error when email is missing', () => {
    const name = faker.person.fullName();
    const password = 'Password123';

    cy.request({
      method: 'POST',
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        name,
        password
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.include('email');
    });
  });

  it('should return an error when password is missing', () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();

    cy.request({
      method: 'POST',
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        name,
        email
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.include('password');
    });
  });

  it('should return an error when sending an empty body', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      failOnStatusCode: false,
      body: {}
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.include('required');
    });
  });
});
