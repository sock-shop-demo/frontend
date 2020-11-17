describe("Test", () => {
    
    beforeEach(() => {
        cy.visit("/");
    });
    

    describe("Home", () => {
        it("Check main buttons", () => {
            cy.contains("Home");
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
    
    describe("Buying", () => {
        it("Buy sock without account", () => {
            cy.contains("Holy").click();
            
            cy.location('pathname').should('eq', '/detail.html');
    
            cy.wait(500);
    
            cy.get("[id='buttonCart']").click();
            cy.contains("1 item(s) in cart", { timeout: 5000 });
            cy.visit("/basket.html");
    
            cy.contains("Shopping cart");
    
            cy.get(`form`).within(() => {
                cy.get("tbody>tr>td").eq(1).contains("Holy", { timeout: 5000 });
                cy.get("tbody>tr>td").eq(3).should("contain", "$99.99", { timeout: 5000 });
            });
    
            cy.get("[id='orderButton']").click();
    
            cy.contains("Could not place order. Missing shipping or payment information.");
        });
    
        it("Buy sock with account", () => {
            
            register()
            
            cy.contains("Colourful").click();
            
            cy.location('pathname').should('eq', '/detail.html');
    
            cy.contains("Product details");
            cy.contains("Material & care");
            cy.contains("Size & Fit");
    
            cy.get("[id='buttonCart']").click();
            cy.contains("1 item(s) in cart", { timeout: 5000 });
            cy.visit("/basket.html");
    
            cy.contains("Shopping cart");
    
            cy.get(`form`).within(() => {
                cy.get("tbody>tr>td").eq(1).contains("Colourful", { timeout: 5000 });
                cy.get("tbody>tr>td").eq(3).should("contain", "$18.00", { timeout: 5000 });
            });
    
            shippingAndPayment()
    
            cy.get("[id='orderButton']").click();
    
            cy.location('pathname').should('eq', '/customer-orders.html');
    
            cy.get("tbody>tr>td").eq(2).should("contain", "Shipped", { timeout: 5000 });
        });
    });
});

const register = () => {
    cy.contains("Register").click();
    
    cy.wait(500);

    cy.get(`form`).within(() => {
        cy.get("[id='register-username-modal']").type("ronDamon");
        cy.get("[id='register-first-modal']").type("Don Ramon");
        cy.get("[id='register-last-modal']").type("Valdes");
        cy.get("[id='register-email-modal']").type("rondamon@gmail.com");
        cy.get("[id='register-password-modal']").type("ronDamon5");
        cy.get("button").contains("Register").click();
    });

    cy.contains("Logged in as Don Ramon Valdes", { timeout: 5000 });
};

const shippingAndPayment = () => {
    cy.get("#basket > div:nth-child(2) > div:nth-child(1)").contains("Change").click()
    cy.wait(500);

    cy.get(`form`).within(() => {
        cy.get("[id='form-number']").type("1234");
        cy.get("[id='form-street']").type("Kennedy");
        cy.get("[id='form-city']").type("Toronto");
        cy.get("[id='form-post-code']").type("5896");
        cy.get("[id='form-country']").type("China - Corona warehouse");
        cy.get("button").contains("Update").click();
    });

    cy.get("#basket > div:nth-child(2) > div:nth-child(2)").contains("Change").click()
    cy.wait(500);

    cy.get(`form`).within(() => {
        cy.get("[id='form-card-number']").type("123456789");
        cy.get("[id='form-expires']").type("22/55");
        cy.get("[id='form-ccv']").type("789");            
    });
    cy.get("#card-modal > div > div > div.modal-body > p > button").contains("Update").click();
};