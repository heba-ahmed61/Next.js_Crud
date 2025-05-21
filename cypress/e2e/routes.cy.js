const { addPost } = require('../../app/actions/serverActions');

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

// testing for not existing item at build time at dynamic route
it('testing for not existing item at build time at dynamic route', () => {
  cy.visit('/posts/details/61');
  cy.findByRole('link', { name: /first item from dev/i }).should('not.exist');
});

// testing for existing item but after build time so now the version of build i run not have this item at dynamic route
it('testing for existing item but after build item so now the version of build I run not have this item at dynamic route', () => {
  const data = {
    userId: 1,
    id: 62,
    title: 'add item not at build for test',
    body: 'add item not at build for test',
  };

  // Pass the data directly to the task
  cy.task('addItem', data).then(() => {
    cy.visit('/posts/details/62'); // Visit the page after the item has been added
    cy.findAllByRole('heading', {
      name: /add item not at build for test/i,
    }).should('exist'); // Assert that the heading exists
  });
});

//note
// cy.request('POST', 'http://localhost:8888/users/admin', { name: 'Jane' }).then(
//   (response) => {
//     // response.body is automatically serialized into JSON
//     expect(response.body).to.have.property('name', 'Jane') // true
//   }
// )
