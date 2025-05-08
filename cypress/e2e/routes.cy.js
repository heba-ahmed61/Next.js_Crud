it('displays correct heading at about page', () => {
  cy.visit('/');
  cy.findByRole('link', { name: /about page/i }).click();
  cy.findByRole('heading', { name: /about page/i }).should('exist');
});

// testing for existing item at build time at dynamic route
it('testing for existing item at build time at dynamic route', () => {
  cy.visit('/posts/details/2025-02-24T12:00:38.403Z');
  cy.findByRole('link', { name: /first item from dev/i }).should('exist');
});
