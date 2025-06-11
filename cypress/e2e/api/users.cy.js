import { faker } from '@faker-js/faker';

describe('Users API', () => {
  const apiUrl = 'http://localhost:3000/users';
  let userData = {};

  it('should create a new user', () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();

    cy.request('POST', apiUrl, { name, email }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(name);
      expect(response.body.email).to.eq(email);

    });
  });

  before(() => {
    const name = faker.person.fullName();
    const email = faker.internet.email();

    userData = { name, email };

    cy.request('POST', apiUrl, userData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      userData.id = response.body.id;
    });
  });


  it('should not allow creating a user with the same email', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      failOnStatusCode: false, 
      body: {
        name: faker.person.fullName(),
        email: userData.email 
      }
    }).then((response) => {
      expect(response.status).to.eq(409); 
      expect(response.body.error).to.eq('A user with this name or email already exists.'); 
    });
  });


  it('should find a user by id', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/12`,
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body.name).to.eq('Beyonce Knowless');
      expect(response.body.email).to.eq('Beyonce.kenowless@example.com');
    });
  });

  it('should find all users', () => {
    cy.request('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('should update a user', () => {
    const updatedName = faker.person.fullName();
    const updatedEmail = faker.internet.email();

     cy.wrap(userData.id).should('not.be.undefined').then((id) => {
      cy.request('PUT', `${apiUrl}/${id}`, {
        name: updatedName,
        email: updatedEmail
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.name).to.eq(updatedName);
        expect(response.body.user.email).to.eq(updatedEmail);
        expect(response.body.message).to.eq('User updated successfully.')
      });
    });
  }); 
  
  it('should delete the created user', () => {
    cy.request('DELETE', `${apiUrl}/${userData.id}`).then((response) => {
      expect(response.status).to.eq(200); 
    });
  });

});
