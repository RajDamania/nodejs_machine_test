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
        <Box w="250px" h="20vh" bg="gray.300" boxShadow="md" rounded="lg">
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
              <Text fontSize="sm">Category:{props.category}</Text>
            </Stack>
          </Box>

          <HStack spacing="24px" m="20px" justify="center">
            <Link to={`/${props.id}`}>
              <Button colorScheme="teal" size="sm">
                Edit
              </Button>
            </Link>
            <Button onClick={handleClick} colorScheme="teal" size="sm">
              Delete
            </Button>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default Product;
