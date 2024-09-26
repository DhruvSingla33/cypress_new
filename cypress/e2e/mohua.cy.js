import 'cypress-file-upload'
require('cypress-xpath');
require('dotenv');
const neatCSV=require('neat-csv');

describe("test2",()=>{
 
it('Review Grant Application UI',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get('.header2').should('contain.text',' Review Grant Application ');
  cy.contains('button', 'Approve all').should("be.visible");
  cy.contains('button', 'Return all').should("be.visible");
  cy.contains('button', 'Download').should("be.visible");
  cy.contains('button', 'Reset').should("be.visible");
  cy.contains('a','Take Action').should("be.visible");
  cy.get(".m-head").should("be.visible");

  cy.get('thead tr:nth-child(1)').should('have.css', 'background-color', 'rgb(4, 116, 116)')
  .and('have.css', 'color', 'rgb(255, 255, 255)');
  cy.get('thead tr:nth-child(1)')
      .should('be.visible') 
      .within(() => {
       
       
        
        cy.get('th.ng-star-inserted').eq(0).should('contain.text', 'S No.');
        cy.get('th.ng-star-inserted').eq(1).should('contain.text', 'ULB Name');
        cy.get('th.ng-star-inserted').eq(2).should('contain.text', 'Census/SB Code');
        cy.get('th.ng-star-inserted').eq(3).should('contain.text', 'ULB Type');
        cy.get('th.ng-star-inserted').eq(4).should('contain.text', 'Population Type');
        cy.get('th.ng-star-inserted').eq(5).should('contain.text', 'UA');
        cy.get('th.ng-star-inserted').eq(6).should('contain.text', 'Form Status');
        cy.get('th.ng-star-inserted').eq(7).should('contain.text', 'Filled Status');
        cy.get('th.ng-star-inserted').eq(8).should('contain.text', 'Action');
      });
})
it('ODF Preview UI',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#mohua").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(2000);
    cy.contains('button', '2024-25').click();
    cy.contains('a', 'Review Grant Application').click() 
    cy.get('#form').select('Open Defecation Free (ODF)');
    cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
    cy.get("input[placeholder='Ulb Code']").next().click();
    cy.contains('a','Take Action').click();
    cy.contains('button','Preview').click();
    cy.xpath("//span[normalize-space()='Submissions for 15th FC grant for FY 2024-25']").
      should('be.visible').and('have.text',' Submissions for 15th FC grant for FY 2024-25 ');
      cy.get('#donwloadButton').should('be.visible');
      cy.get(".form-h.text-center").
      should('be.visible').and('have.text',' Open Defecation Free (ODF) ');
      cy.get('p').should("be.visible");
      cy.get('.d-ans').each(($el) => {
     
        cy.wrap($el).should('be.visible');
      });
      
  
  })

  it('Search Ulb Name Functionality',()=>{
    cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Name']").type(Cypress.env('ULB_NAME'));
  cy.get("input[placeholder='Ulb Name']").next().click();
  const tdTexts = [];
    cy.get('tr.ng-star-inserted').within(() => {
    
      cy.get('td').each(($td) => {
        const text = $td.text().trim();
        if (text) {  
          tdTexts.push(text);
        }
      }).then(() => {
        
        cy.log(tdTexts); 
        const ULB_name=tdTexts[1];
        expect(Cypress.env('ULB_NAME')).to.equal(ULB_name);
      });
    });
    
  
  })
  it('Reset Functionality',()=>{
    cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Name']").type("Todabhim Municipality");
  cy.contains('button', 'Reset').click();
  cy.contains('button', 'Reset').click();
  cy.wait(3000);
  cy.get("input[placeholder='Ulb Name") 
  .invoke('val')
  .then((inputValue) => {
    expect(inputValue).to.equal("");
  });
  })
  it('Search Ulb code',()=>{
    cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Code']").type();
  cy.contains('button', 'Reset').click();
  cy.get("input[placeholder='Ulb Code']").next().click();
  const tdTexts = [];
    cy.get('tr.ng-star-inserted').within(() => {
    
      cy.get('td').each(($td) => {
        const text = $td.text().trim();
        if (text) {  
          tdTexts.push(text);
        }
      }).then(() => {
        
        cy.log(tdTexts); 
        const Census_code=tdTexts[2];
        expect(Cypress.env('code')).to.equal(Census_code);
      });
    });
    

  })
    it('Verify the error message displayed when submitting the Review Grant Application Mohua ODF form without a status',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
  cy.get("input[placeholder='Ulb Code']").next().click();
  cy.contains('a','Take Action').click();
  cy.contains('button','Submit').click();
  cy.get(".swal-icon.swal-icon--error").should("be.visible");
  cy.get('.swal-title').should('contain.text', 'Error');
  cy.get('.swal-text').should('contain.text', 'Status is mandatory');
  cy.get('.swal-button-container').click();
  cy.get('.text-danger').should('contain.text', ' This is the required field. ');

})
it('Take Action Functionality without Reject Reason',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
  cy.get("input[placeholder='Ulb Code']").next().click();
  cy.contains('a','Take Action').click();
  cy.contains('label','Return').click();
  cy.contains('button','Submit').click();
  cy.get(".swal-icon.swal-icon--error").should("be.visible");
  cy.get('.swal-title').should('contain.text', 'Error');
  cy.get('.swal-text').should('contain.text', 'Reject reason is mandatory');
  cy.get('.swal-button-container').click();
  cy.get('.text-danger').should('contain.text', ' This is the required field. ');

})

  it('Verify that the Odf form is successfully returned by Mohua.',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
  cy.get("input[placeholder='Ulb Code']").next().click();
  cy.contains('a','Take Action').click();
  cy.contains('label','Approve').should("be.visible");
  cy.contains('label','Return').should("be.visible");
  cy.get("#reason").type("The uploaded document is incorrect.");
  cy.get("input[accept$='.pdf']").next().click();
  cy.get("input[accept$='.pdf']")
  .attachFile('ODF.pdf', { force: true });
  cy.contains('label','Return').click();
  cy.contains('button','Submit').click();
  cy.get(".swal-button.swal-button--Submit").click();
   
})
it('odf submit',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#ulb i").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
 
  cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
  cy.wait(1000);
  cy.get("mat-select[id='1']").click();
  cy.get('mat-option').contains('span', 'ODF').click();
  cy.xpath("//button[normalize-space()='Upload PDF']").click();
  cy.get("input[accept$='application/pdf, 5120, 1']")
.attachFile('ODF.pdf', { force: true });

cy.get('input[type="date"]').then(($input) => {

$input[0].value = '2023-09-10';  
$input[0].dispatchEvent(new Event('input', { bubbles: true }));
$input[0].dispatchEvent(new Event('change', { bubbles: true }));

});
 
  cy.wait(2000);
 
  cy.xpath("//button[normalize-space()='Submit']").click();
  cy.get(".swal-icon.swal-icon--warning").should("be.visible");
  cy.get(".swal-title").should('have.text',"Confirmation !");
  cy.get(".swal-button.swal-button--Submit").click();
  cy.wait(1000);
})
it('state approval',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#state").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('state_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('state_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
  cy.get("input[placeholder='Ulb Code']").next().click();
  cy.contains('a','Take Action').click();
  cy.contains('label','Approve').click();
  cy.contains('button','Submit').click();
  cy.get(".swal-button.swal-button--Submit").click();
})
it('check box functionality',()=>{
    
 
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#mohua").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
    cy.get("button[type='submit']").click();

    
      cy.contains('a', '15th FC Grants').click();
      cy.contains('button', '2024-25').click();
      cy.contains('a', 'Review Grant Application').click(); 
      cy.get('#form').select('Open Defecation Free (ODF)');
      cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
      cy.get("input[placeholder='Ulb Code']").next().click();
      cy.get('.mat-checkbox').click();
      cy.contains('button', 'Return all').click();
      cy.get('.card').should("be.visible");
      cy.get('.a-h h4').should('contain.text','Action Form');
      cy.get("#reason").type("The uploaded document is incorrect.");
      cy.get("label[for='cin3'] a").click();
      cy.get("#cin3").attachFile('ODF.pdf', { force: true });
      cy.get("button[type='submit']").click();
      cy.get('.swal-title').should('contain.text','Confirmation');
      cy.get("div[role='dialog']").should("be.visible");
      cy.get('.swal-button.swal-button--Submit').click();

  })
  it('odf submit',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#ulb i").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('code'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
 
  cy.get('a').contains('span', 'Open Defecation Free (ODF)').click();
  cy.wait(1000);
  cy.get("mat-select[id='1']").click();
  cy.get('mat-option').contains('span', 'ODF').click();
  cy.xpath("//button[normalize-space()='Upload PDF']").click();
  cy.get("input[accept$='application/pdf, 5120, 1']")
.attachFile('ODF.pdf', { force: true });

cy.get('input[type="date"]').then(($input) => {

$input[0].value = '2023-09-10';  
$input[0].dispatchEvent(new Event('input', { bubbles: true }));
$input[0].dispatchEvent(new Event('change', { bubbles: true }));

});
 
  cy.wait(2000);
 
  cy.xpath("//button[normalize-space()='Submit']").click();
  cy.get(".swal-icon.swal-icon--warning").should("be.visible");
  cy.get(".swal-title").should('have.text',"Confirmation !");
  cy.get(".swal-button.swal-button--Submit").click();
  cy.wait(1000);
})
it('state approval',()=>{
  cy.visit("https://staging.cityfinance.in/login");
  cy.get("#state").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('state_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('state_password'));
  cy.get("button[type='submit']").click();
  cy.contains('a', '15th FC Grants').click();
  cy.wait(3000);
  cy.contains('button', '2024-25').click();
  cy.contains('a', 'Review Grant Application').click(); 
  cy.get('#form').select('Open Defecation Free (ODF)');
  cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
  cy.get("input[placeholder='Ulb Code']").next().click();
  cy.contains('a','Take Action').click();
  cy.contains('label','Approve').click();
  cy.contains('button','Submit').click();
  cy.get(".swal-button.swal-button--Submit").click();
})
  it('Take Action Functionality Approving Form by Mohua',()=>{
    cy.visit("https://staging.cityfinance.in/login");
  cy.get("#mohua").click();
  cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
  cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.contains('button', '2024-25').click();
    cy.contains('a', 'Review Grant Application').click(); 
    cy.get('#form').select('Open Defecation Free (ODF)');
    cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
    cy.get("input[placeholder='Ulb Code']").next().click();
    cy.contains('a','Take Action').click();
    cy.contains('label','Approve').click();
    cy.contains('button','Submit').click();
    cy.get(".swal-button.swal-button--Submit").click();
     
  })
  it('Validating CSV Mohua',()=>{
    cy.visit("https://staging.cityfinance.in/login");
    cy.get("#mohua").click();
    cy.get('input[formcontrolname="email"]').type(Cypress.env('MoHUA_id'));
    cy.get('input[formcontrolname="password"]').type(Cypress.env('MoHUA_password'));
    cy.get("button[type='submit']").click();
    cy.contains('a', '15th FC Grants').click();
    cy.wait(3000);
    let Financial_year="";
    cy.contains('button', '2024-25').invoke('text').then((text) => {
      Financial_year = text.trim();
    
    });
    cy.contains('button', '2024-25').click();
    cy.wait(3000);
    cy.contains('a', 'Review Grant Application').click(); 
    cy.get('#form').select('Open Defecation Free (ODF)');
    cy.get("input[placeholder='Ulb Code']").type(Cypress.env('code'));
    cy.get("input[placeholder='Ulb Code']").next().click();
    const tdTexts = [];
    cy.get('tr.ng-star-inserted').within(() => {
    
      cy.get('td').each(($td) => {
        const text = $td.text().trim();
        if (text) {  
          tdTexts.push(text);
        }
      }).then(() => {
        
        cy.log(tdTexts); 
      
      });
    });
    
    cy.wait(3000);
    cy.get('.btn-danger').click();
    cy.get("mat-icon[mattooltipclass$='tooltip-red']").click();
    cy.wait(1000);
    cy.contains('button', 'Preview').click();
 
    cy.wait(1000);
    let textArray = [];

    cy.get('.d-ans').then(($elements) => {
      textArray = [...$elements].map(el => el.innerText.trim());
      cy.log(textArray);
    });
    cy.go('back');
    // cy.go('back');
    cy.wait(1000);
    


    cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/Review_ULB-ODF.csv")
    .then(async (text)=>{
     
      const csv=await neatCSV(text);
      const rowData = csv[0];
      const ULB_name=tdTexts[1];
      const Census_code=tdTexts[2];
      const Population_Category=tdTexts[4];
      const Form_Status=tdTexts[6];
      const Filled_Status=tdTexts[7];
      const state_comment_string="The uploaded document is incorrect.";
     
      const Certificate_Name= textArray[2];
      const  Certificate_Issue_Date= textArray[3];
      const rating = textArray[0];
      const score = textArray[1];
      const scoree = score.match(/(\d+)/)[0];

      let state_review_status = "";

      if (rowData["Form Status"].includes('Returned By State')) {
        state_review_status = 'REJECTED';
      } else {
        state_review_status = 'APPROVED';  
      }
      let mohua_review_status = "";

      if (rowData["Form Status"].includes('Returned By MoHUA')) {
        mohua_review_status = 'REJECTED';
      } else {
        mohua_review_status = 'APPROVED';  
      }
  
 
      cy.log(state_review_status);
      
        

      console.log('Row 1 Data:', rowData);
       cy.wait(1000);
       
      expect(rowData[' Census Code']).to.equal(Census_code);
      expect(rowData[' Population Category']).to.equal(Population_Category);
      expect(rowData[' ULB Name']).to.contain( ULB_name);
      expect(rowData["Form Status"]).to.contain(Form_Status);
      expect(rowData[' Filled Status']).to.contain(Filled_Status);
      expect(rowData[' Certificate Name']).to.contain(Certificate_Name);
      expect(rowData[' Financial Year']).to.contain( Financial_year);
      expect(rowData[' Score']).to.equal(scoree);
      expect(rowData[' Rating']).to.contain(rating);
      expect(rowData[' Certificate Issue Date']).to.match(/^\d{2}\/\d{2}\/\d{4}$/);
      expect(rowData[' Certificate Issue Date']).to.contain(Certificate_Issue_Date);
      expect(rowData[' Certificate Issue Date']).to.contain(Certificate_Issue_Date);
      
      
      expect(  rowData['State Review Status']).to.contain(state_review_status );
      expect(  rowData['MoHUA Review Status']).to.contain(mohua_review_status );
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
    
      
      expect(rowData[' Submitted On']).to.contain(formattedDate);


      cy.get('.bl-ln').click();
      cy.get('.table.tracking-history-table tbody tr:nth-child(1) td:last-child').invoke('text').then((dateText) => {
        const trimmedDate = dateText.trim();
        
        const dateObject = new Date(trimmedDate);
        const formattedDate = ("0" + dateObject.getDate()).slice(-2) + '/' + 
                              ("0" + (dateObject.getMonth() + 1)).slice(-2) + '/' + 
                              dateObject.getFullYear();
        
        expect(rowData[' Created']).to.contain(formattedDate);
      });
      
     
      
    }
    )
    

    })
  

})