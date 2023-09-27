import React from "react";
import AppRouter from "./app.router";
import "./assets/plugins/fontawesome/css/fontawesome.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import AxiosProvider from "./core/interceptor/interceptor";
import ApiServiceProvider from "./core/Api/api.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import SpinnerProvider from "./core/spinner/spinner";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <>
      <SpinnerProvider>
      <Provider store={store}>
        <AxiosProvider>
          <ApiServiceProvider>
            <AppRouter />
          </ApiServiceProvider>
        </AxiosProvider>
        </Provider>
      </SpinnerProvider>

      <ToastContainer />
    </>
  );
};

export default App;
