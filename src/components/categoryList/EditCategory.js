import { Box, Button, Heading, Input, Stack, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  let history = useHistory();
  const [newCategory, setNewCategory] = useState({
    category: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadProd();
  }, []);

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;

    setNewCategory((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };

  const loadProd = async () => {
    const result = await axios.get(`http://localhost:5000/category/edit/${id}`);
    console.log(result.data);
    setNewCategory(result.data);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:5000/category/edit/${id}`, newCategory);
    setNewCategory({
      category: "",
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
            Edit Category
          </Heading>
          <form>
            <Stack spacing={5} mt={4}>
              <Input
                required
                type="text"
                name="category"
                id="category"
                onChange={handleUpdateChange}
                value={newCategory.category}
                placeholder="category"
                bgColor="white"
              />

              <Button type="submit" onClick={onSubmit} colorScheme="teal">
                Update Category
              </Button>
            </Stack>
          </form>
        </Box>
      </HStack>
    </>
  );
};

export default EditCategory;
