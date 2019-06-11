describe("Component", function () {
    describe("text section", function () {

        beforeEach(function () {
            cy.server()
            cy.fixture("basic-page/links.json").as("LinkPage")
            cy.route("GET", "/api/content/5.json", "@LinkPage").as("PageRequest")
        })
    
        it("displays an exit modal for a link to an external site", function () {
            cy.visit('/business-guide/launch-your-business/choose-your-business-name')
            cy.wait("@PageRequest")
            cy.contains("External non-.gov link")
              .and('have.class', 'external-link-marker')
              .click()
            cy.contains("You're leaving the Small Business Administration website.")
        })

        it("does not display an exit modal when the link is a relative link", function () {
            cy.visit('/business-guide/launch-your-business/choose-your-business-name')
            cy.wait("@PageRequest")
            cy.contains("Internal relative link")
              .and('not.have.class', 'external-link-marker')
              .click()
            cy.contains("You're leaving the Small Business Administration website.").should('not.exist')
        })
    
        it("does not put an exit modal class on a link to a .gov site", function () {
            cy.visit('/business-guide/launch-your-business/choose-your-business-name')
            cy.wait("@PageRequest")
            cy.contains("External .gov link")
              .and('not.have.class', 'external-link-marker')
            // exit modal should not display without an external-link-marker
        })
    
        it("does not put an exit modal class on a link to a .gov site with a path", function () {
            cy.visit('/business-guide/launch-your-business/choose-your-business-name')
            cy.wait("@PageRequest")
            cy.contains("External .gov link with path")
              .and('not.have.class', 'external-link-marker')
            // exit modal should not display without an external-link-marker
        })
    })
    
    describe("exit modal", function () {

        it("displays with accessible features", function () {
            cy.server()
            cy.route("GET", "/api/content/6134.json").as("HomepageContent")
            cy.visit("/")
            cy.wait("@HomepageContent")
            cy.get("[alt='SBA Facebook page']")
                .click()
            cy.contains("You're leaving the Small Business Administration website.")
            cy.get("[data-cy='close button']")
                .should('have.attr', "aria-label", "Close this modal.")
            cy.get('button').contains("CONTINUE")
            cy.get('button').contains("CANCEL")
        })

        it("closes with the escape button", function () {
            cy.server()
            cy.route("GET", "/api/content/6134.json").as("HomepageContent")
            cy.visit("/")
            cy.wait("@HomepageContent")
            cy.get("[alt='SBA Facebook page']")
                .click()
            cy.contains("You're leaving the Small Business Administration website.")
                .type('{esc}')
            cy.contains("You're leaving the Small Business Administration website.").should("not.exist")
        })

        it("closes when the cancel button is activated", function () {
            cy.server()
            cy.route("GET", "/api/content/6134.json").as("HomepageContent")
            cy.visit("/")
            cy.wait("@HomepageContent")
            cy.get("[alt='SBA Facebook page']")
                .click()
            cy.contains('CANCEL')
                .click()
            cy.contains("You're leaving the Small Business Administration website.").should("not.exist")
        })
    })
})