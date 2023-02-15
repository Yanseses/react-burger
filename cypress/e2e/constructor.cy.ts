///<reference types="cypress" />

describe('service is available', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Open start constructor page', () => {
    cy.contains('Соберите бургер')
  })

  it('Move ingridient to card', () => {
    const dataTransfer = new DataTransfer();
    cy.get('#60d3b41abdacab0026a733c6').trigger('dragstart', { 
      dataTransfer
    })
    cy.get('.constructorBuns_buns__top__wwjlX').trigger('drop', {
      dataTransfer
    })
    cy.get('#60d3b41abdacab0026a733cc').trigger('dragstart', {
      dataTransfer
    })
    cy.get('.constructorMain_main__31yDb').trigger('drop', {
      dataTransfer
    })
  })

  it('Open modal window', () => {
    cy.get('#60d3b41abdacab0026a733c6').click();
    cy.contains('Детали ингридиента')
  });

  it('Open modal window and modal have name ingridient', () => {
    cy.get('#60d3b41abdacab0026a733c6').click();
    cy.contains('Детали ингридиента')
    cy.contains('Калории, ккал')
    cy.contains('Белки, г')
    cy.contains('Жиры, г')
    cy.contains('Углеводы, г')
  });

  it('Open and close order modal', () => {
    const dataTransfer = new DataTransfer();
    cy.get('a[href*="/login"]').click()
    cy.get('input[name*="email"]').type('22@2.ru')
    cy.get('input[name*="password"]').type('1234567890')
    cy.get('button[type*="submit"]').click()
    cy.get('a[href="/"][class="item_item__e25Pp"]').click()
    cy.get('#60d3b41abdacab0026a733c6').trigger('dragstart', { 
      dataTransfer
    })
    cy.get('.constructorBuns_buns__top__wwjlX').trigger('drop', {
      dataTransfer
    })
    cy.get('#60d3b41abdacab0026a733cc').trigger('dragstart', {
      dataTransfer
    })
    cy.get('.constructorMain_main__31yDb').trigger('drop', {
      dataTransfer
    })
    cy.get('.button').contains('Оформить заказ').click()
    cy.wait(20000)
    cy.contains('идентификатор заказа')
    cy.get('button[class*="modal_modal"]').click()
  })

  it('Close opened ingridient modal window', () => {
    cy.get('#60d3b41abdacab0026a733c6').click();
    cy.contains('Детали ингридиента')
    cy.get('.modal_modal__cross__-ifD-').click();
  })
}); 