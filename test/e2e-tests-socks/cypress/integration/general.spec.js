describe("Test", () => {
    
    beforeEach(() => {
        cy.visit("/");
    });

    describe("Home", () => {
        it("Check main buttons", () => {
            cy.contains("Pepito");
            cy.contains("Catalogue ");
            cy.contains("Account");
        });

        it("Check main socks", () => {
            cy.contains("Holy");
            cy.contains("Colourful");
            cy.contains("SuperSport XL");
            cy.contains("Crossed");
            cy.contains("Figueroa");
        });
    });

    describe("Details", () => {
        it("See details sock", () => {
            cy.contains("SuperSport XL").click();
            
            cy.location('pathname').should('eq', '/detail.html')
    
            cy.contains("Product details");
            cy.contains("Material & care");
            cy.contains("Size & Fit");
        });
    });
    
});