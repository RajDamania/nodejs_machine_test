import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Create from "./components/productsList/Create";
import Update from "./components/productsList/Update";
import Navbar from "./components/Navbar";
import Home from "./components/productsList/Products";
import Category from "./components/categoryList/Category";
import EditCategory from "./components/categoryList/EditCategory";
import Products from "./components/productsList/Products";
import CategoryCreate from "./components/categoryList/CategoryCreate";
import SubProducts from "./components/SubProducts";
import AddProducts from "./components/categoryList/AddProducts";

function App() {
  return (
    <>
      <Router>
        <ChakraProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/add-product" exact component={Create} />
            <Route path="/products/edit/:id" exact component={Update} />
            <Route
              path="/products/:id/productsCategories"
              exact
              component={CategoryCreate}
            />
            <Route
              path="/products/category/:id"
              exact
              component={SubProducts}
            />
            <Route
              path="/category/addProductsBycategory/:id"
              exact
              component={AddProducts}
            />
            <Route path="/category/edit/:id" exact component={EditCategory} />
          </Switch>
        </ChakraProvider>
      </Router>
    </>
  );
}

export default App;
