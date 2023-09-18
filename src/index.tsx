import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import './styles/global.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
