

describe('Sign Up', () => {
  const timestamp = Date.now();
  const testEmail = `testuser_${timestamp}@example.com`;

  it('navigates to sign up page and creates an account', () => {
    cy.visit('/signup');

    cy.get('#name').type('Test User');
    cy.get('#email').type(testEmail);
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');

    cy.contains('button', 'Sign Up').click();

    
    cy.url().should('include', '/admin');
    cy.contains('Admin Dashboard').should('be.visible');
  });
});
