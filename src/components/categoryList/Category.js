import React, { useEffect, useState } from "react";
import { Button, Stack, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import axios from "axios";

const Category = () => {
  const [newCategory, setNewCategory] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const result = await axios.get(
      "http://localhost:5000/category/categoryItem"
    );
    console.log(result.data);
    setNewCategory(result.data);
  };

  //Deleting Product
  const removeCategory = (id) => {
    fetch(`http://localhost:5000/category/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
      setNewCategory((prevCate) => {
        return prevCate.filter((cate, _id) => {
          return cate._id !== id;
        }); //filter
      }); //setstate
    }); //response

    console.log("remove Category triggered");
  };

  // const filterCategory = (filters, "category") => {

  // }

  return (
    <>
      <Stack spacing={3} direction="row" align="center" m="20px">
        <Link to="/products">
          <Button variant="outline" colorScheme="teal" size="sm">
            All
          </Button>
        </Link>
        <Grid mt={5} gap={2} templateColumns="repeat(4, 1fr)">
          {newCategory.map((cate, _id) => {
            return (
              <CategoryItem
                key={_id}
                id={cate._id}
                category={cate.category}
                onRemove={removeCategory}
                // onFilter={filterCategory}
              />
            );
          })}
        </Grid>
      </Stack>
    </>
  );
};

export default Category;
