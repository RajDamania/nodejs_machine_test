import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, HStack, Grid } from "@chakra-ui/react";
import Product from "./productsList/Product";
import Create from "./Create";
import { ProdContext } from "../store/ProdContext";

const Products = () => {
  const { prod } = React.useContext(ProdContext);
  const [userProd, setUserProd] = prod;
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`http://localhost:5000/prods/?page=${pageNumber}`)
      .then((res) => res.json())
      .then(({ totalPages, prods }) => {
        console.log(totalPages, prods);
        setUserProd(prods);
        setNumberOfPages(totalPages);
      })
      .catch((err) => console.log(err));
  }, [pageNumber, setUserProd, setNumberOfPages]);

  //creating Product
  const addChangeHandler = (prods) => {
    fetch("http://localhost:5000/add", {
      method: "POST",
      body: JSON.stringify(prods),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserProd((prevProd) => [
          ...prevProd,
          { id: responseData.name, ...prods },
        ]);
      })
      .catch((err) => console.log(err));

    console.log(prods);
  };

  //Deleting Product
  const removeProd = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
      setUserProd((prevProd) => {
        return prevProd.filter((prod, index) => {
          return prod._id !== id;
        }); //filter
      }); //setstate
    }); //response

    console.log("removeProd triggered");
  };

  return (
    <>
      <Flex direction="column" align="center">
        <Create onAdd={addChangeHandler} />
        <Heading mt={2} p="4px">
          product list
        </Heading>
      </Flex>
      <Grid ml={12} gap={10} templateColumns="repeat(4, 1fr)">
        {userProd.map((prod, _id) => {
          return (
            <Product
              key={_id}
              id={prod._id}
              title={prod.title}
              category={prod.category}
              onRemove={removeProd}
            />
          );
        })}
      </Grid>
      <HStack mt={7} spacing={10} align="center" justify="center">
        {pages.map((pageIndex) => {
          return (
            <Button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </Button>
          );
        })}
      </HStack>
    </>
  );
};

export default Products;
