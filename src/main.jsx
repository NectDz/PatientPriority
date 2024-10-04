import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Team from "./pages/Team/Team";
import { AuthProvider } from "./Context/AuthContext.jsx";
import Login from "./pages/Login/Login.jsx";
import Layout from "./routes/Layout";
import AudioTest from "./pages/AudioTest/AudioTest.jsx";
import DoctorLogin from "./pages/DoctorLogin/DoctorLogin.jsx";
import PatientLogin from "./pages/PatientLogin/PatientLogin.jsx";

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
              <Route path="login" element={<Login />} />
              <Route path="/doctorLogin" element={<DoctorLogin />} />
              <Route path="/patientLogin" element={<DoctorLogin />} />
              <Route path="/audio-test" element={<AudioTest />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
