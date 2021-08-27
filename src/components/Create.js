import { Box, Button, Input, Stack, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { ProdContext } from "../store/ProdContext";

const Create = (props) => {
  const [Expanded, setExpanded] = useState(false);
  const { user } = React.useContext(ProdContext);
  const [product, setProduct] = user;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  const Submit = async (event) => {
    await props.onAdd(product);
    event.preventDefault();
    console.log("submitted");
    setProduct({
      title: "",
      category: "",
    });
  };

  function expand() {
    setExpanded(true);
  }

  return (
    <>
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
              type="text"
              name="title"
              id="title"
              onClick={expand}
              onChange={handleChange}
              value={product.title}
              placeholder="Title"
              bgColor="white"
              rows={Expanded ? 3 : 1}
            />
            {Expanded ? (
              <Input
                type="text"
                name="category"
                id="category"
                onChange={handleChange}
                value={product.category}
                placeholder="Category"
                bgColor="white"
              />
            ) : null}
            {Expanded ? (
              <Button type="submit" onClick={Submit} colorScheme="teal">
                Add Product
              </Button>
            ) : null}
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default Create;
