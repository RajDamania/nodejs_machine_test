import { Box, Button, Input, Stack, Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const CategoryCreate = () => {
  const { id } = useParams();
  let history = useHistory();
  const [category, setCategory] = useState({
    category: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCategory((prevCategory) => {
      return {
        ...prevCategory,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      `http://localhost:5000/products/${id}/productsCategories`,
      category
    );
    setCategory({
      category: "",
    });
    history.push("/products");

    console.log(category);
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
            Add Category
          </Heading>
          <form>
            <Stack spacing={5} mt={4}>
              <Input
                required
                type="text"
                name="category"
                id="category"
                onChange={handleChange}
                value={category.category}
                placeholder="category"
                bgColor="white"
              />

              <Button type="submit" onClick={onSubmit} colorScheme="teal">
                Submit Product
              </Button>
            </Stack>
          </form>
        </Box>
      </HStack>
    </>
  );
};

export default CategoryCreate;
