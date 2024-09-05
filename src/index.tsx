import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Test1 from "./test1/App";
import Test2 from "./test2/test2";
import { Provider } from "react-redux";
import store from "./test2/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Test1 />
      <Test2 />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
