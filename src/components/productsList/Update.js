import { Box, Button, Heading, Input, Stack, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";

const Update = () => {
  let history = useHistory();
  const [newProduct, setNewProduct] = useState({
    title: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadProd();
  }, []);

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;

    setNewProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };

  const loadProd = async () => {
    const result = await axios.get(`http://localhost:5000/products/edit/${id}`);
    console.log(result.data);
    setNewProduct(result.data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:5000/products/edit/${id}`, newProduct);
    setNewProduct({
      title: "",
    });

    history.push("/products");
  };

  return (
    <>
      <HStack mt={15} align="center" justify="center">
        <Box
          w="251px"
          h="101%"
          p="21px"
          mt={3}
          boxShadow="md"
          rounded="lg"
          bg="gray.300"
        >
          <Heading size="lg" align="center">
            Edit product Title
          </Heading>
          <form method="POST">
            <Stack spacing={5} mt={4}>
              <Input
                type="text"
                name="title"
                id="title"
                value={newProduct.title}
                placeholder="Title"
                bgColor="white"
                onChange={handleUpdateChange}
              />

              <Button onClick={onSubmit} type="submit" colorScheme="teal">
                Update Title
              </Button>
            </Stack>
          </form>
        </Box>
      </HStack>
    </>
  );
};

export default Update;
