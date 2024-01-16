Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('gustavo@email.com')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    cy.contains('button', 'Enviar').click()
})

