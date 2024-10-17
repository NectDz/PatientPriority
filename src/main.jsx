import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Team from "./pages/Team/Team";
import { AuthProvider } from "./Context/AuthContext.jsx";
import Login from "./pages/Login/Login.jsx";
import Layout from "./routes/Layout";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import AudioTest from "./pages/AudioTest/AudioTest.jsx";
import DoctorLogin from "./pages/DoctorLogin/DoctorLogin.jsx";
import PatientLogin from "./pages/PatientLogin/PatientLogin.jsx";

// PatientProfile SidePanel Routes
import HealthRecords from "./pages/PatientProfile/SidePanelPages/HealthRecords.jsx"
import LabTestResults from "./pages/PatientProfile/SidePanelPages/LabTestResults.jsx"
import CareTeam from "./pages/PatientProfile/SidePanelPages/CareTeam.jsx"
import MedicalHistory from "./pages/PatientProfile/SidePanelPages/HealthRecords.jsx"


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
              <Route path="/patient-profile" element={<PatientProfile />}></Route>
              <Route path="/doctorLogin" element={<DoctorLogin />} />
              <Route path="/patientLogin" element={<PatientLogin />} />
              <Route path="/audio-test" element={<AudioTest />} />

              {/* PatientProfile SidePanel Routes*/}
              <Route path="/patient-health-records" element={<HealthRecords/>} />
              <Route path="/patient-lab-test-results" element={<LabTestResults/>} />
              <Route path="/patient-care-team" element={<CareTeam/>} />
              <Route path="/patient-medical-history" element={<MedicalHistory/>} />

            </Routes>
          </BrowserRouter>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
