import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { App } from './app';
import { store } from './services/store';
import './styles.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
	<StrictMode>
		<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</Provider>
	</StrictMode>
);
