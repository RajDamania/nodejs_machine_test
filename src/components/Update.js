import { Box, Button, Text, Input, Stack, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  let history = useHistory();
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
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
    const result = await axios.get(`http://localhost:5000/${id}`);
    console.log(result.data);
    setNewProduct(result.data);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { title, category } = newProduct;
    fetch(`http://localhost:5000/${id}`, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setNewProduct((prevProd) => [
          ...prevProd,
          { id: responseData.name, ...newProduct },
        ]);
      })
      .catch((err) => console.log(err));
    history.push("/");
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
          <Text align="center">Update product</Text>
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
              <Input
                type="text"
                name="category"
                id="category"
                value={newProduct.category}
                placeholder="Category"
                bgColor="white"
                onChange={handleUpdateChange}
              />
              <Button onClick={onSubmit} type="submit" colorScheme="teal">
                Update Product
              </Button>
            </Stack>
          </form>
        </Box>
      </HStack>
    </>
  );
};

export default Update;
