// https://docs.cypress.io/api/table-of-contents

describe('Visit root', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('button', 'Log in');
  });
});
