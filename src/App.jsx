import * as React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home/Home";
import Navbar from "./Components/navbar";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Home />
    </ChakraProvider>
  );
}

export default App;
