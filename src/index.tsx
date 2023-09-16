import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import './styles/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
