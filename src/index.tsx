import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Test1 from "./test1/test1";
import Test2 from "./test2/test2";
import { Provider } from "react-redux";
import store from "./test2/slice/store";
import langTh from "./translation/th/translation.json";
import langEn from "./translation/en/translation.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "test1",
    element: <Test1 />,
  },
  {
    path: "test2",
    element: <Test2 />,
  },
]);

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    th: {
      global: langEn,
    },
    en: {
      global: langTh,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
