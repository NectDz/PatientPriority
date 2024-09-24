import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Team from "./pages/Team/Team";
import { AuthProvider } from "./Context/AuthContext.jsx";
import Layout from "./routes/Layout";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}></Route>
              <Route path="/team" element={<Team />}></Route>
            </Routes>
          </BrowserRouter>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
