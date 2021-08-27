import React, { useState, createContext } from "react";

export const ProdContext = createContext();

export const ProdProdvider = (props) => {
  const [product, setProduct] = useState({
    title: "",
    category: "",
  });
  const [userProd, setUserProd] = useState([]);

  return (
    <ProdContext.Provider
      value={{
        user: [product, setProduct],
        prod: [userProd, setUserProd],
      }}
    >
      {props.children}
    </ProdContext.Provider>
  );
};
