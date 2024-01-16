/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function (){
        cy.visit('./src/index.html')
    })

    it('Check the application title', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Fill in the mandatory fields and submit the form', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('gustavo@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Display error message when submitting the form with an invalid email format', function() {
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('gustavo@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Telephone field remains empty when non-numeric value is entered', function() {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    it('Displays an error message when the telephone number becomes mandatory but is not filled in', function() {
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('gustavo@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Fill in and clear the first name, last name, email and telephone fields', function() {
        cy.get('#firstName')
            .type('Gustavo')
            .should('have.value', 'Gustavo')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Souza')
            .should('have.value', 'Souza')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('gustavo@email.com')
            .should('have.value', 'gustavo@email.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    it('Displays an error message when submitting the form without filling in the required fields', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Submits the form successfully using a custom command', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Select a product (Youtube) by its text', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Select a product (Mentoria) based on its value (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Select a product (Blog) by its index', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Select the type of service "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Mark each type of service', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Select both checkboxes and then uncheck the last one of them', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
            })

    it('Select both checkboxes and then uncheck the last one of them', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
            })
        
    it('Select a file from the fixtures folder', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })   
        })
    
    it('Select a file by simulating drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })   
        }) 

    it('Selected a file using a fixture for which an alias was given', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
                .should(function($input) {
                    expect($input[0].files[0].name).to.equal('example.json')
                })   
        })
        
    it('Selected a file using a fixture for which an alias was given', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })  
    
    it('Access the privacy policy page by removing the target and then clicking on the link', function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
      })  
})