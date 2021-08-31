import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, HStack, Grid } from "@chakra-ui/react";
import Product from "./Product";
import { ProdContext } from "../../store/ProdContext";

const Products = () => {
  const { prod } = React.useContext(ProdContext);
  const [userProd, setUserProd] = prod;
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  //fetching all products
  useEffect(() => {
    fetch(`http://localhost:5000/products/?page=${pageNumber}`)
      .then((res) => res.json())
      .then(({ totalPages, prods }) => {
        console.log(totalPages, prods);
        setUserProd(prods);
        setNumberOfPages(totalPages);
      })
      .catch((err) => console.log(err));
  }, [pageNumber, setUserProd, setNumberOfPages]);

  //Deleting Product
  const removeProd = (id) => {
    fetch(`http://localhost:5000/products/delete/${id}`, {
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
        <Heading>product list</Heading>
      </Flex>
      <Grid mt={5} ml={12} gap={10} templateColumns="repeat(4, 1fr)">
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
