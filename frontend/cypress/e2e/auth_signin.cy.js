

describe('Sign In', () => {
  it('navigates to sign in page and logs in', () => {
    cy.visit('/signin');

    cy.get('#email').type('admin@portfolio.com');
    cy.get('#password').type('admin123');

    cy.contains('button', 'Sign In').click();

    
    cy.url().should('include', '/admin');
    cy.contains('Admin Dashboard').should('be.visible');
  });
});
