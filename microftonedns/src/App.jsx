import React from "react";
import ReactDOM from "react-dom/client";
import { Counter } from 'welcome/Counter';
import { List } from 'list/List';

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: microftonedns</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    
    <Counter />
    <List />
  </div>
);

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)