import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Update from "./components/Update";

function App() {
  return (
    <>
      <Router>
        <ChakraProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/:id" exact component={Update} />
          </Switch>
        </ChakraProvider>
      </Router>
    </>
  );
}

export default App;
