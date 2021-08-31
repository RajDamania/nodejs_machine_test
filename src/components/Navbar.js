import React from "react";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Category from "./categoryList/Category";

const Navbar = () => {
  return (
    <>
      <Flex direction="row" pl="20px" mt="5px">
        <HStack mt={4} spacing={10} align="center">
          <Link to="/products">
            <Heading as="h4" size="md">
              Products
            </Heading>
          </Link>
          <Link to="/products/add-product">
            <Button variant="outline" type="submit" colorScheme="teal">
              Add Product
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Category />
    </>
  );
};

export default Navbar;
