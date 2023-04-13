describe('Auth0', function () {
  beforeEach(function () {
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
  })

  it('go to dashboard', function () {
    cy.contains('button', 'Log in');
    cy.get('button').click()
    cy.url().should('equal', 'http://localhost:8080/dashboard')
  })
})

