import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import Team from "./pages/Team/Team";
import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";
import Login from "./pages/Login/Login.jsx";
import Layout from "./routes/Layout";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import AudioTest from "./pages/AudioTest/AudioTest.jsx";
import DoctorLogin from "./pages/DoctorLogin/DoctorLogin.jsx";
import PatientLogin from "./pages/PatientLogin/PatientLogin.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";

// PatientProfile SidePanel Routes
import HealthRecords from "./pages/PatientProfile/SidePanelPages/HealthRecords.jsx";
import LabTestResults from "./pages/PatientProfile/SidePanelPages/LabTestResults.jsx";
import CareTeam from "./pages/PatientProfile/SidePanelPages/CareTeam.jsx";
import MedicalHistory from "./pages/PatientProfile/SidePanelPages/HealthRecords.jsx";

import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import Appointments from "./pages/DoctorProfile/Appointment/Appointment.jsx";
import AppointmentCreation from "./pages/DoctorProfile/Appointment/AppointmentCreation.jsx";
import AppointmentDetail from "./pages/DoctorProfile/Appointment/AppointmentDetail.jsx";
import DoctorSignUp from "./pages/DoctorSignup/DoctorSignUp.jsx";

import AddPatient from "./pages/Patients/AddPatient"; //need to update after kazi's patient tab is added

//a wrapper for the protected route
function PrivateRoute({ children }) {
  const { currentUser } = useAuth(); //get current user from the AuthContext

  return currentUser ? children : <Navigate to="/doctor-login" />;
}

function HomeRoute() {
  const { currentUser } = useAuth();

  //if logged in, redirect to doctor profile page
  if (currentUser) {
    return <Navigate to="/doctor-profile" />;
  }

  //else render the home page (App component)
  return <App />;
}

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Layout>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/team" element={<Team />} />
              <Route path="/login" element={<Login />} />
              <Route path="/patient-profile" element={<PatientProfile />} />
              <Route path="/patientLogin" element={<PatientLogin />} />
              <Route path="/audio-test" element={<AudioTest />} />
              <Route path="/signUp" element={<SignUp />} />

              {/* PatientProfile SidePanel Routes */}
              <Route
                path="/patient-health-records"
                element={<HealthRecords />}
              />
              <Route
                path="/patient-lab-test-results"
                element={<LabTestResults />}
              />
              <Route path="/patient-care-team" element={<CareTeam />} />
              <Route
                path="/patient-medical-history"
                element={<MedicalHistory />}
              />

              {/* Protect the doctor profile route */}
              <Route
                path="/doctor-profile/*"
                element={
                  <PrivateRoute>
                    <DoctorProfile />
                  </PrivateRoute>
                }
              >
                {/* Nested Routes within DoctorProfile */}
                <Route path="appointments" element={<Appointments />} />
                <Route
                  path="appointments/create-appointment"
                  element={<AppointmentCreation />}
                />
                <Route
                  path="appointments/:id"
                  element={<AppointmentDetail />}
                />
              </Route>

              {/* Doctor Routes */}
              <Route path="/doctor-login" element={<DoctorLogin />} />
              <Route path="/doctor-signup" element={<DoctorSignUp />} />

              {/* Nested protected route for adding a patient under /patients */}
              <Route
                path="/patients/*"
                element={
                  <PrivateRoute>
                    <Routes>
                      <Route path="AddPatient" element={<AddPatient />} />
                    </Routes>
                  </PrivateRoute>
                }
              />

            </Routes>
          </BrowserRouter>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
