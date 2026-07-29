

describe('Edit Project', () => {
  beforeEach(() => {
    cy.visit('/signin');
    cy.get('#email').type('admin@portfolio.com');
    cy.get('#password').type('admin123');
    cy.contains('button', 'Sign In').click();
    cy.url().should('include', '/admin');
  });

  it('can edit the first project in the list', () => {
    cy.visit('/admin/projects');

    
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Edit').click();
    });

    
    cy.url().should('match', /\/admin\/projects\/\d+\/edit/);

    
    cy.get('input[name="title"]').clear().type('Updated Cypress Project Title');

    cy.contains('button', /save|update/i).click();

    
    cy.url().should('include', '/admin/projects');
    cy.contains('Updated Cypress Project Title').should('be.visible');
  });
});
