describe("Forms App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const firstNameInput = () => cy.get("input[name=first_name]");
  const lastNameInput = () => cy.get("input[name=last_name]");
  const emailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const submitBtn = () => cy.get("button[name=submit]");
  const checkBox = () => cy.get("input[name=agree]");

  it("sanity check to make sure tests work", () => {
    expect(1 + 2).to.equal(3);
  });

  it("the proper elements are showing", () => {
    firstNameInput().should("exist");
    lastNameInput().should("exist");
    emailInput().should("exist");
    passwordInput().should("exist");
    submitBtn().should("exist");
    checkBox().should("exist");

    cy.contains("Submit").should("exist");
  });

  describe("filling out the inputs and cancelling", () => {
    it("can navigate to the site", () => {
      cy.url().should("include", "localhost");
    });

    it("submit button starts out disabled", () => {
      submitBtn().should("be.disabled");
    });

    it("can type in the inputs", () => {
      firstNameInput()
        .should("have.value", "")
        .type("cynthia")
        .should("have.value", "cynthia");
      lastNameInput()
        .should("have.value", "")
        .type("andrade")
        .should("have.value", "andrade");
      emailInput()
        .should("have.value", "")
        .type("imsocool@gmail.com")
        .should("have.value", "imsocool@gmail.com");
      passwordInput()
        .should("have.value", "")
        .type("imcool")
        .should("have.value", "imcool");
    });

    it(".check() - check a checkbox", () => {
      checkBox().should("be.not.checked").check().should("be.checked");
    });

    it("the submit button enables when inputs are filled out and submits it", () => {
      firstNameInput().type("cynthia");
      lastNameInput().type("andrade");
      emailInput().type("imsocool@gmail.com");
      passwordInput().type("imcool");
      checkBox().check().should("be.checked");
      submitBtn().should("not.be.disabled").click();
    });
  });
});
