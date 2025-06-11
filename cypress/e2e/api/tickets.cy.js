import { faker } from '@faker-js/faker';

describe('Tickets API', () => {
  const apiUrl = 'http://localhost:3000';
  const name = faker.person.fullName();
  const email = faker.internet.email();
  let userId;
  let ticketId;

  before(() => {
    cy.request('POST', `${apiUrl}/users`, {
      name: name,
      email: email
    }).then((res) => {
      expect(res.status).to.eq(201); 
      expect(res.body).to.have.property('id');
      userId = res.body.id;
    });
  });

  it('should create a new ticket', () => {
    const description = 'This is a test ticket';

    cy.request('POST', `${apiUrl}/tickets`, {
      userId,
      description
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      expect(res.body.description).to.eq(description);
      expect(res.body.status).to.eq('Open');
      ticketId = res.body.id;
    });
  });

  it('should fetch a ticket by ID', () => {
    cy.request('GET', `${apiUrl}/tickets/${ticketId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', ticketId);
    });
  });

  it('should update ticket status', () => {
    const newStatus = 'Closed';

    cy.request('PUT', `${apiUrl}/tickets/${ticketId}/status`, {
      status: newStatus
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.ticket.status).to.eq(newStatus);
    });
  });

  it('should delete a ticket', () => {
    cy.request('DELETE', `${apiUrl}/tickets/${ticketId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq('Ticket deleted successfully.');
    });
  });

  it('should return 404 for non-existent ticket', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/tickets/99999`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.error).to.eq('Ticket not found.');
    });
  });
});
