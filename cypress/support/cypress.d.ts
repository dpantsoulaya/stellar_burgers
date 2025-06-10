import './commands';

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>;
			openIngredientsDetailsModal(): void;
		}
	}
}
