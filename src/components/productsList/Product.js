import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  HStack,
  Button,
  Text,
  Heading,
  Stack,
  Flex,
} from "@chakra-ui/react";

const Product = (props) => {
  const handleClick = () => {
    props.onRemove(props.id);
  };

  return (
    <>
      <Flex>
        <Box w="250px" h="35vh" bg="gray.200" boxShadow="md" rounded="lg">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            textAlign="center"
          >
            <Stack pt="10px">
              <Heading fontSize="sm">{props.title}</Heading>
              <Text fontSize="sm">{props.category}</Text>
            </Stack>
          </Box>
          <Stack pt="10px" align="center" justify="center">
            <Link to={`/products/${props.id}/productsCategories`}>
              <Button
                size="xs"
                fontSize="14px"
                fontWeight="semibold"
                variant="outline"
                colorScheme="black"
              >
                Add Category
              </Button>
            </Link>
          </Stack>
          <HStack spacing="24px" m="20px" justify="center">
            <Link to={`/products/edit/${props.id}`}>
              <Button variant="outline" colorScheme="teal" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleClick}
              colorScheme="teal"
              size="sm"
            >
              Delete
            </Button>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default Product;
