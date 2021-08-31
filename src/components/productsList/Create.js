import { Box, Button, Input, Stack, Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ProdContext } from "../../store/ProdContext";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Create = () => {
  let history = useHistory();
  const { id } = useParams();
  const { user } = React.useContext(ProdContext);
  const [product, setProduct] = user;
  const { title, category } = product;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:5000/products/add-product", product);
    setProduct({
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
            Add product
          </Heading>
          <form>
            <Stack spacing={5} mt={4}>
              <Input
                required
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={product.title}
                placeholder="Title"
                bgColor="white"
              />

              <Button type="submit" onClick={onSubmit} colorScheme="teal">
                Add Product Title
              </Button>
            </Stack>
          </form>
        </Box>
      </HStack>
    </>
  );
};

export default Create;
