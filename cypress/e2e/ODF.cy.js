import 'cypress-file-upload'
require('cypress-xpath');
require('dotenv');


describe("test1",() => {

  it('should verify that the user is on the Homepage', () => {

    cy.visit('https://cityfinance.in/home');


    cy.url().should('eq', 'https://cityfinance.in/home');

    
    cy.title().should('eq', 'City finance');

    cy.get('.ds-i-c span:first-child').should('contain.text', 'city');
    cy.get('.ds-i-c span:last-child').should('contain.text', 'finance.in');
  });

  it('Verify navigation to the XV FC Grant page.', () => {
    
    cy.visit('https://cityfinance.in/home'); 
   
    cy.get('#loginDrp').should('be.visible').contains( 'Login');
    cy.get('#loginDrp').click();
    cy.get(".dropdown-menu.dropdown-menu-login").should('be.visible');
    
    cy.get('.dropdown-menu.dropdown-menu-login.show li ').each(($el, index, $list) => {
      const option =$el.find('a').text();
              if (option.includes("XV FC Grant")) {
             
             
                cy.wrap($el).click();
                cy.wait(1000);
              cy.url().should('eq', 'https://cityfinance.in/fc_grant');
          }});
        })
  it('Navigate to login Page',()=>{
    cy.visit('https://staging.cityfinance.in/fc_grant');
    cy.get("input[value='LOGIN']").click();
    cy.get("#ulb i").click();
    cy.url().should('eq', 'https://staging.cityfinance.in/login');
  })
  it('sign in box UI',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get(".formTitle b").should('be.visible')
    .and('have.text', 'Sign In');
    cy.get('input[formcontrolname="email"]').should('be.visible');
    cy.get('input[formcontrolname="password"]').should('be.visible');
    cy.get('.img-responsive').should('be.visible');
    cy.get("mat-icon[role='img']").should('be.visible');
    cy.get("a[href='mailto:15fcgrant@cityfinance.in']").should('have.text','15fcgrant@cityfinance.in');
  });
   
it ('Both empty submit',()=>{
     cy.visit("https://staging.cityfinance.in/login");
     cy.get("#ulb i").click();
     cy.get("button[type='submit']").click();
     cy.get('form mat-form-field').eq(0)  // Select the first mat-form-field within a form
     .find('.mat-form-field-outline.mat-form-field-outline-thick')  // Find an element with the class 'my-class' inside the selected mat-form-field
     .should('have.css', 'color', 'rgb(244, 67, 54)');
     cy.get('.forget-password div .mat-form-field-outline.mat-form-field-outline-thick').should('have.css', 'color', 'rgb(244, 67, 54)');
    
})
it('successful Signin',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get("button[type='submit']").click();
})

  
    


  
  it('Invalid Email',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type('808800');
 
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    

    cy.get("button[type='submit']").click();
    cy.get('.error-message span').should('be.visible')
      .and('have.text', 'User not found');
  });
  it('Invalid Password',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get('input[formcontrolname="password"]').type('ulb@124');
    cy.get("button[type='submit']").click();
    cy.get('.error-message span').should('be.visible')
      .and('have.text', 'Invalid credentials.');
  });
  it('Both Invalid',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type('800964');
    cy.get('input[formcontrolname="password"]').type('ulb@124');
    cy.get("button[type='submit']").click();
    cy.get('.error-message span').should('be.visible')
      .and('have.text', 'Invalid credentials.');
  });
  it('eye icon',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();

    cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'password');
   
    cy.get("mat-icon[role='img']").click();
    cy.get('input[formcontrolname="password"]').should('have.attr', 'type', 'text');
  });
  it('Navigate to ODF form',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(3000);
    cy.contains('button', '2024-25').click();
    cy.wait(3000);
    cy.wait(1000);
    cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
    
  });
  it('ODF FORM UI' ,()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(3000);
    cy.contains('button', '2024-25').click();
    cy.wait(3000);
    cy.wait(1000);
    cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
    cy.wait(1000);
    cy.get('.form-h').should('be.visible')
      .and('contain.text', 'Open Defecation Free (ODF)');
    cy.xpath('//label[text()="Open Defecation Free (ODF) Rating"]').should('be.visible')
      .and('contain.text', 'Open Defecation Free (ODF) Rating*');
    cy.xpath('//div[contains(text(), "Upload Declaration?")]').should('be.visible')
      .and('contain.text', 'Upload Declaration?');
      cy.get('.scoreDiv')
      .should('have.css', 'background-color', 'rgb(50, 205, 50)');
  
      cy.get("mat-select[id='1']").should('be.visible');
      cy.xpath("//button[normalize-space()='Upload PDF']").should('be.visible');
      cy.xpath("//button[normalize-space()='Save as Draft']").should('be.visible');
      cy.xpath("//button[normalize-space()='Submit']").should('be.visible');


  })
it("error message displayed when PDF upload field is left blank",()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#ulb i").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.wait(3000);
  cy.wait(1000);
  cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
  cy.wait(1000);
  cy.get("mat-select[id='1']").click();
  cy.get('mat-option').contains('span', 'No Rating').click();
  cy.xpath("//button[normalize-space()='Submit']").click();
  cy.get('.custom-file div')
  .should('have.text', ' This is a required field ')
  .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  
})
  it('ODF Page Rating Search Functionality',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(3000);
    cy.contains('button', '2024-25').click();
    cy.wait(3000);
    cy.wait(1000);
    cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
    cy.wait(1000);
    cy.get("mat-select[id='1']").click();
    cy.get("input[id='1_dropDownSearch']").
    should('have.attr', 'placeholder', 'Search Open Defecation Free (ODF) Rating');
    cy.get("input[id='1_dropDownSearch']").type('ODF++');
    cy.get('mat-option').contains('span', 'ODF++').should('be.visible');
    cy.get("input[id='1_dropDownSearch']").type('+');
    cy.get('.mat-option-text').should('be.visible')
      .and('contain.text', 'No options available ');
  

  })
  it('selecting different ratings correctly displays the associated scores.',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(3000);
    cy.contains('button', '2024-25').click();
    cy.wait(3000);
    cy.wait(1000);
    cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
    cy.wait(1000);
    cy.get("mat-select[id='1']").click();
    cy.get('.mat-option-text span').each(($el, index, $list) => {
        
            if ($el.text()==='ODF++') {
              cy.wrap($el).click();

              cy.get('.scoreDiv div').should('have.text','Score = 10');
          }
          else if($el.text()==='ODF+') {
            cy.get("mat-select[id='1']").click();
            cy.wrap($el).click();

            cy.get('.scoreDiv div').should('have.text','Score = 8');
        }
        else  {
          cy.get("mat-select[id='1']").click();
          cy.wrap($el).click();

          cy.get('.scoreDiv div').should('have.text','Score = 0');
      }
  })
})


 


  it('Form is successfully saved as a draft',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(3000);
    cy.contains('button', '2024-25').click();
    cy.wait(3000);
    cy.wait(1000);
    cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
    cy.wait(1000);
    cy.get("mat-select[id='1']").click();
    cy.get('mat-option').contains('span', 'No Rating').click();
    cy.xpath("//button[normalize-space()='Upload PDF']").click();
    cy.get("input[accept$='application/pdf, 5120, 1']")
  .attachFile('ODF.pdf', { force: true });

   
    cy.wait(10000);
   
    cy.xpath("//button[normalize-space()='Save as Draft']").click();
    
  
    cy.get('.swal-icon.swal-icon--success').should('be.visible');
    cy.get('.swal-title').should('be.visible').and('have.text','Saved');
    cy.get('.swal-text').should('be.visible').and('have.text','Data saved as draft successfully');
    cy.xpath("//button[normalize-space()='OK']").click();
    
  });
  
 
  it('ODF form Preview',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#ulb i").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(3000);
    cy.contains('button', '2024-25').click();
    cy.wait(3000);
    cy.wait(1000);
    cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
    cy.wait(1000);
    cy.get("mat-select[id='1']").click();
    cy.get('mat-option').contains('span', 'No Rating').click();
    cy.xpath("//button[normalize-space()='Upload PDF']").click();
    cy.get("input[accept$='application/pdf, 5120, 1']")
  .attachFile('ODF.pdf', { force: true });

   
    cy.wait(10000);
   
    cy.xpath("//button[normalize-space()='Save as Draft']").click();
    cy.xpath("//button[normalize-space()='OK']").click();
    cy.xpath("//button[normalize-space()='Preview']").click();
    cy.xpath("//span[normalize-space()='Submissions for 15th FC grant for FY 2024-25']").
    should('be.visible').and('have.text',' Submissions for 15th FC grant for FY 2024-25 ');
    cy.get('#donwloadButton').should('be.visible');
    cy.get(".form-h.text-center").
    should('be.visible').and('have.text',' Open Defecation Free (ODF) ');
    cy.get("a[class='ng-star-inserted']").should('be.visible');
  
  });
  


})
