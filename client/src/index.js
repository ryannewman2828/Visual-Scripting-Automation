import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './components/Main.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
	
	<BrowserRouter>
		<Main />
	</BrowserRouter>, 
	document.getElementById('root')
);

registerServiceWorker();
