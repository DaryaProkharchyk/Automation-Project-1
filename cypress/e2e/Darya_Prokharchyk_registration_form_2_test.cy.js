beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {

        inputValidData('UsernameTest')
        cy.get('#confirm').clear().type('NewPass')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain.text', 'Passwords do not match!')
        cy.get('#confirm').clear().type('MyPass')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
    })

    it('User can submit form with all fields added', () => {

        inputValidData('UsernameTest')
        cy.get('#cssFavLanguage').click().should('be.checked')
        cy.get('#vehicle2').click().should('be.checked')
        cy.get('#cars').select('volvo')
        cy.get('#animal').select('dog')
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').should('contain.text', 'User successfully submitted registration')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {

        inputValidData('UsernameTest')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').and('contain.text', 'User successfully submitted registration')
    })

    it('User can not submit form with phone number missing', () => {
        inputValidData('UsernameTest')
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Phone number').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').and('contain', 'Mandatory input field is not valid or empty!')
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {

    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check Cerebrum Hub logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').eq(1).invoke('height').should('equal', 88)
        cy.get('img').eq(1).invoke('width').should('equal', 116)
    })

    it('Check the first navigation link', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html').click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check the second navigation link', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html').click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one should remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkboxes list is correct', () => {
        cy.get('input.checkbox').should('have.length', 3)
        cy.get('input.checkbox').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input.checkbox').next().eq(1).should('have.text', 'I have a car')
        cy.get('input.checkbox').next().eq(2).should('have.text', 'I have a boat')

        cy.get('input.checkbox').eq(0).should('not.be.checked')
        cy.get('input.checkbox').eq(1).should('not.be.checked')
        cy.get('input.checkbox').eq(2).should('not.be.checked')

        // Selecting one should NOT remove selection from other checkboxes
        cy.get('input.checkbox').eq(0).check().should('be.checked')
        cy.get('input.checkbox').eq(1).check().should('be.checked')
        cy.get('input.checkbox').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        // Advanced level how to check the content of the Animals dropdown
        // NB: Bug in the last choice should be 'horse' while the actual value="mouse"
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })
})

    function inputValidData(username) {
        cy.log('Username will be filled')
        cy.get('input[data-testid="user"]').type(username)
        cy.get('#email').type('validemail@yeap.com')
        cy.get('[data-cy="name"]').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('#password').type('MyPass')
        cy.get('#confirm').type('MyPass')
        cy.get('h2').contains('Password').click()
    }
