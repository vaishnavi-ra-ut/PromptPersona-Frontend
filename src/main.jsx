import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css'; 
import { Provider } from "react-redux";
import { store } from "./utils/appStore";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
