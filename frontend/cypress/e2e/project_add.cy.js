

describe('Add Project', () => {
  beforeEach(() => {
    
    cy.visit('/signin');
    cy.get('#email').type('admin@portfolio.com');
    cy.get('#password').type('admin123');
    cy.contains('button', 'Sign In').click();
    cy.url().should('include', '/admin');
  });

  it('can add a new project from the Admin Dashboard', () => {
    cy.visit('/admin/projects/new');

    cy.get('input[name="title"]').type('My Cypress Test Project');
    cy.get('textarea[name="description"], input[name="description"]').type('A project created by Cypress automated test.');
    cy.get('input[name="technologies"]').type('React, Node.js, Cypress');
    cy.get('input[name="url"]').type('https://example.com');

    cy.contains('button', /save|add|create/i).click();

    
    cy.url().should('include', '/admin/projects');
    cy.contains('My Cypress Test Project').should('be.visible');
  });
});
