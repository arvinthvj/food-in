import React, { createContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

interface SpinnerContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const SpinnerContext = createContext<SpinnerContextType>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

const SpinnerProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [loader, setLoader] = useState(false);

  const showLoader = () => {
    setLoader(true);
  };
  const hideLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };
  useEffect(() => {
  }, [loader]);
  return (
    <SpinnerContext.Provider
      value={{ isLoading: loader, showLoader, hideLoader }}
    >
      {props.children}
      {loader === true && (
        <div className="loading">
          <Spinner animation="border" variant="info" />
        </div>
      )}
    </SpinnerContext.Provider>
  );
};

export default SpinnerProvider;
