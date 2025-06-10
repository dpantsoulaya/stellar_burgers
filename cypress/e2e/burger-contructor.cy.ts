/// <reference types="cypress" />
import type {} from '../support/cypress';

const STELLAR_BURGERS_URL = 'http://localhost:8080/';

describe('Burger constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
		cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });

		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('test-accessToken')
		);
		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		cy.setCookie('accessToken', 'test-accessToken');

		cy.visit(STELLAR_BURGERS_URL);
	});

	it('visits constructor', () => {
		cy.getByTestId('header').should('have.text', 'Соберите бургер');
	});

	it('intercepts all ingredients', () => {
		cy.getByTestId('ingredient-card').should('have.length', 15);
	});

	it('opens ingredients details modal', () => {
		cy.openIngredientsDetailsModal();
		cy.getByTestId('ingredient-details-name').should(
			'have.text',
			'Краторная булка N-200i'
		);
	});

	it('closes modal by close icon', () => {
		cy.openIngredientsDetailsModal();
		cy.getByTestId('modal-close-icon').click();
		cy.getByTestId('ingredient-details').should('not.exist');
	});

	it('closes modal by overlay click', () => {
		cy.openIngredientsDetailsModal();
		cy.getByTestId('modal-overlay').click({ force: true });
		cy.getByTestId('ingredient-details').should('not.exist');
	});

	it('closes modal by esc press', () => {
		cy.openIngredientsDetailsModal();
		cy.get('body').type('{esc}');
	});

	it('drag bun', () => {
		cy.getByTestId('ingredient-card').eq(1).as('bun');
		cy.get('@bun').find('img').trigger('dragstart');
		cy.getByTestId('drop-container').first().trigger('drop');
		cy.get('.constructor-element_pos_top')
			.find('.constructor-element__text')
			.should('have.text', 'Флюоресцентная булка R2-D3 (верх)');
		cy.get('.constructor-element_pos_bottom')
			.find('.constructor-element__text')
			.should('have.text', 'Флюоресцентная булка R2-D3 (низ)');
		cy.get('@bun').find('.counter__num').should('have.text', '2');
	});

	it('drag element', () => {
		cy.getByTestId('ingredient-card').eq(4).as('gal_sauce');
		cy.get('@gal_sauce').find('img').trigger('dragstart');
		cy.getByTestId('drop-container').eq(1).as('dropContainer');
		cy.get('@dropContainer').trigger('drop');
		cy.get('.constructor-element__text').should(
			'have.text',
			'Соус традиционный галактический'
		);
		cy.get('@gal_sauce').find('.counter__num').should('have.text', '1');
	});

	it('make order', () => {
		cy.intercept('POST', 'orders', { fixture: 'orders' });

		cy.getByTestId('ingredient-card').eq(1).find('img').trigger('dragstart');
		cy.getByTestId('drop-container').first().trigger('drop');

		cy.getByTestId('drop-container').eq(1).as('drop-ingredient');
		cy.getByTestId('ingredient-card').eq(4).find('img').trigger('dragstart');
		cy.get('@drop-ingredient').trigger('drop');
		cy.getByTestId('ingredient-card').eq(11).find('img').trigger('dragstart');
		cy.get('@drop-ingredient').trigger('drop');

		cy.get('button').contains('Оформить заказ').click();

		cy.getByTestId('order-number').should('have.text', '80847');
	});
});
