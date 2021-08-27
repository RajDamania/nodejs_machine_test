import React from "react";
import { Flex, Stack, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { ProdContext } from "../store/ProdContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { prod } = React.useContext(ProdContext);
  const [userProd, setUserProd] = prod;

  const filterItems = (categoryItem) => {
    const updateList = userProd.filter((elem) => {
      return elem.category === categoryItem;
    });
    setUserProd(updateList);
  };

  return (
    <Flex direction="column" pl="20px" mt="5px">
      <Heading as="h4" size="md" mt={4}>
        <Link to="/">Products</Link>
      </Heading>

      <Stack spacing={3} direction="row" align="center" mt="20px">
        <Link to="/">
          <Button colorScheme="teal" size="sm">
            All
          </Button>
        </Link>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => filterItems("smartphones")}
        >
          Smartphones
        </Button>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => filterItems("laptops")}
        >
          Laptops
        </Button>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => filterItems("consoles")}
        >
          Consoles
        </Button>
      </Stack>
    </Flex>
  );
};

export default Navbar;
