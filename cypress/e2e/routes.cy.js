it('displays correct heading at about page', () => {
  cy.visit('/');
  cy.findByRole('link', { name: /about page/i }).click();
  cy.findByRole('heading', { name: /about page/i }).should('exist');
});
