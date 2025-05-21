// removing bundle.js because in both SSG and ISR, the JavaScript fetch logic for regenerating the page (in ISR) is
//  bundled in chunks that are linked to the prebuilt HTML, but only ISR involves revalidation through
//  fetch requests after the page has been initially built and served.
// make fetching list is isr
it('removing bundle.js', () => {
  cy.request('/')
    .its('body')
    .then((html) => {
      const staticHtml = html.replace(/<script.*?>.*?><\/script>/gm, '');
      cy.document().then((doc) => {
        doc.open();
        doc.write(staticHtml);
        doc.close();

        cy.findByRole('heading', { name: 'first item from dev' }).should(
          'exist'
        );
      });
    });
});

//cy.request('/') makes an HTTP request to the root URL (/) of the application.
//.its('body') gets the body of the response (i.e., the HTML content of the page).
//g: Global flag — ensures it removes all script tags in the document.
//m: Multiline flag — useful for processing content across multiple lines (like multiline script tags).
//cy.state('document').write(staticHtml); in the test renders the HTML without the scripts in the Cypress test browser.
