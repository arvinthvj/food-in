import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import Basicrouter from "./routers/basicrouter";

const AppRouter: React.FC = () => {
  return (
    <>
        <BrowserRouter>
          <Basicrouter />
        </BrowserRouter>
    </>
  );
};

export default AppRouter;
