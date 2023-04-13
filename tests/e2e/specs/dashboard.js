describe('Auth0', function () {
  beforeEach(function () {
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
  })

  it('switch between transactions and customers', function () {
    cy.visit('/')
    cy.get('table').children().first().should('have.text', 'Customers');
    cy.get('button').contains('transactions').click();
    cy.get('table').children().first().should('have.text', 'Transactions');
    cy.get('button').contains('customers').click();
    cy.get('table').children().first().should('have.text', 'Customers');
  })

  it('change amount of rows', function () {
    cy.visit('/')
    cy.get('table').find('tbody').find('tr').should('have.length', 5);
    cy.get('select').select('10');
    cy.get('table').find('tbody').find('tr').should('have.length', 10);
    cy.get('select').select('5');
    cy.get('table').find('tbody').find('tr').should('have.length', 5);
  })

  it('check customer search', function () {
    cy.visit('/')
    cy.get('input').type('ZZZ');
    cy.get('table').find('tbody').find('tr').should('have.length', 0);
  })

  it('check pagination', function () {
    cy.visit('/')
    cy.get('nav button').contains('2').click();
    cy.get('progress').next().should('have.text', '2/2');
    cy.get('button').contains('transactions').click();
    cy.get('progress').next().should('have.text', '1/13');
    cy.get('nav button').last().contains('>>').click();
    cy.get('progress').next().should('have.text', '13/13');
    cy.get('nav button').next().contains('<').click();
    cy.get('progress').next().should('have.text', '12/13');
    cy.get('nav button').next().next().contains('10').click();
    cy.get('progress').next().should('have.text', '10/13');
    cy.get('nav button').contains('<<').click();
    cy.get('progress').next().should('have.text', '1/13');
  })

})

