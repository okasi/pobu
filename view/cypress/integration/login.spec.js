describe('successfully login with user okan credentials', () => {

  it('navigate to login page', () => {
    cy.visit('http://localhost:3000/login')
  })

  it('input credentials', () => {
    cy.get('[aria-hidden="false"] > .auth-main > .auth-sub > center > .auth-form > :nth-child(1) > input').type("okan@okan.se", {force: true})
    cy.get('[aria-hidden="false"] > .auth-main > .auth-sub > center > .auth-form > :nth-child(2) > input').type("654321", {force: true})
  })

  it('login and go to profile route', () => {
    cy.get('[aria-hidden="false"] > .auth-main > .auth-sub > center > .auth-form > .auth-bar > .reg-btn').click({ force: true })
    cy.wait(2500)
    cy.get('[href="/profile"] > .nav-btns').click({ force: true })
    cy.url().should('include', '/profile')
  })

  it('check if firstname, lastname & email shows correctly', () => {
    cy.get(':nth-child(3) > h3').should('contain', 'Okan')
    cy.get(':nth-child(4) > h3').should('contain', 'Simsek')
    cy.get(':nth-child(5) > h3').should('contain', 'okan@okan.se')
  })

  it('logout redirects to login route', () => {
    cy.get('.profile-con > .reg-btn').click({ force: true })
    cy.url().should('include', '/login')
  })

})