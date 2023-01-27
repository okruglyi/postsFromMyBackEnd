import React from 'react';
import {createRoot} from "react-dom/client";
import {App} from "./App";
import {BrowserRouter, HashRouter} from 'react-router-dom';
import 'normalize.css';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    // <React.StrictMode>
        <HashRouter>
            <App/>
        </HashRouter>
    // </React.StrictMode>
)