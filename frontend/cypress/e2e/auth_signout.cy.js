
describe('Sign Out', () => {
  it('can sign in then sign out and is redirected to home', () => {
    cy.visit('/signin');
    cy.get('#email').type('admin@portfolio.com');
    cy.get('#password').type('admin123');
    cy.contains('button', 'Sign In').click();
    cy.url().should('include', '/admin');

    
    cy.contains('button', 'Sign Out').click();

  
    cy.url().should('eq', Cypress.config('baseUrl') + '/');

   
    cy.contains('a', 'Admin Dashboard').should('not.exist');

    
    cy.contains('a', 'Sign In').should('be.visible');
  });
});
