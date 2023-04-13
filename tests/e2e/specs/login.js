describe('Auth0', function () {
  beforeEach(function () {
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
  })

  it('go to dashboard automatically', function () {
    cy.visit('/')
    cy.url().should('equal', 'http://localhost:8080/dashboard')
  })

  it('switch between transactions and customers', function () {
    cy.visit('/')
    cy.get('table').children().first().should('have.text', 'Customers');
    cy.get('button').contains('transactions').click();
    cy.get('table').children().first().should('have.text', 'Transactions');
    cy.get('button').contains('customers').click();
    cy.get('table').children().first().should('have.text', 'Customers');
  })


  it('view profile and logout', function () {
    cy.visit('/dashboard')
    cy.get('a').contains('User Profile').click();
    cy.get('.textinfo').children().first().should('have.text', 'test@example.com');
    cy.get('button').contains('Log out').click();
    cy.get('button').should('have.text', 'Log in');
  })
})

