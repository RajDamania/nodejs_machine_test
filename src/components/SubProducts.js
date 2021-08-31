import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, HStack, Grid } from "@chakra-ui/react";
import Product from "../components/productsList/Product";
import { ProdContext } from "../store/ProdContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const SubProducts = () => {
  const { prod } = React.useContext(ProdContext);
  const [userProd, setUserProd] = prod;
  //   const [pageNumber, setPageNumber] = useState(0);
  //   const [numberOfPages, setNumberOfPages] = useState(0);

  //   const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const { id } = useParams();

  // fetching all products assigned by Categories Id
  useEffect(() => {
    loadCatgeories();
  }, []);

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

  const loadCatgeories = async () => {
    const result = await axios.get(
      `http://localhost:5000/category/${id}/categoryByProducts`
    );
    setUserProd(result.data);
    console.log(result.data);
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
      {/* <HStack mt={7} spacing={10} align="center" justify="center">
        {pages.map((pageIndex) => {
          return (
            <Button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </Button>
          );
        })}
      </HStack> */}
    </>
  );
};

export default SubProducts;
