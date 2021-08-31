import React from "react";
import {
  IconButton,
  ButtonGroup,
  Button,
  Text,
  AddIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ProdContext } from "../../store/ProdContext";

const CategoryItem = (props) => {
  const { prod } = React.useContext(ProdContext);
  const [userProd, setUserProd] = prod;

  const handleDeleteClick = () => {
    props.onRemove(props.id);
  };

  // const filterItem = () => {
  //   const updatedCategoryList = userProd.filter((cateItem) => {
  //     return userProd.category === cateItem;
  //   });
  //   console.log(updatedCategoryList);
  //   setUserProd(updatedCategoryList);
  // };

  return (
    <>
      <ButtonGroup>
        <Link to={`/products/category/${props.id}`}>
          <Button ml="10px" width="100px" colorScheme="teal" size="sm">
            <Text fontSize="sm">{props.category}</Text>
          </Button>
        </Link>
        <IconButton
          colorScheme="red"
          size="xs"
          variant="outline"
          onClick={handleDeleteClick}
        >
          <Text fontSize="15px" fontWeight="semibold">
            -
          </Text>
        </IconButton>
        <Link to={`/category/edit/${props.id}`}>
          <IconButton colorScheme="blue" variant="outline" size="xs">
            <Text fontSize="10px" fontWeight="semibold">
              Edit
            </Text>
          </IconButton>
        </Link>
        <Link to={`/category/addProductsBycategory/${props.id}`}>
          <IconButton colorScheme="blue" variant="outline" size="xs">
            <Text fontSize="15px" fontWeight="semibold">
              +
            </Text>
          </IconButton>
        </Link>
      </ButtonGroup>
    </>
  );
};

export default CategoryItem;
