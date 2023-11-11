import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStor, store } from "./app/store/store.js";
import { PersistGate } from "redux-persist/lib/integration/react";

//

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistStor}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </PersistGate>
);
