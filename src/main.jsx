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
//changed the names -  health records to overview, lab test results to reminders/Appointments, Care Team to Meeting Summaries, Medical History to AI Insights
import Overview from "./pages/PatientProfile/SidePanelPages/Overview.jsx";
import RemindersAndAppointments from "./pages/PatientProfile/SidePanelPages/RemindersAndAppointments.jsx";
import MeetingSummaries from "./pages/PatientProfile/SidePanelPages/MeetingSummaries.jsx";
import AIInsights from "./pages/PatientProfile/SidePanelPages/AIInsights.jsx";

import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import Appointments from "./pages/DoctorProfile/Appointment/Appointment.jsx";
import AppointmentCreation from "./pages/DoctorProfile/Appointment/AppointmentCreation.jsx";
import AppointmentDetail from "./pages/DoctorProfile/Appointment/AppointmentDetail.jsx";
import DoctorSignUp from "./pages/DoctorSignup/DoctorSignUp.jsx";
import PatientsPage from "./pages/DoctorProfile/PatientsPage/PatientsPage.jsx";
import PatientSignUp from "./pages/PatientSignup/PatientSignUp.jsx";
import PatientDetails from "./pages/DoctorProfile/PatientsPage/PatientDetails.jsx";
import DoctorHomePage from "./pages/DoctorProfile/doctorHomePage.jsx";

import AddPatient from "./pages/Patients/AddPatient"; //need to update after kazi's patient tab is added

//a wrapper for the protected route
function PrivateRoute({ children }) {
  const { currentUser } = useAuth(); //get current user from the AuthContext

  return currentUser ? children : <Navigate to="/doctor-login" />;
}

function HomeRoute() {
  const { currentUser } = useAuth();

  //if logged in redirect to the doctor profile page
  if (currentUser) {
    return <Navigate to="/doctor-profile" />;
  }

  //else show homepage
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
              <Route path="/patient-login" element={<PatientLogin />} />
              <Route path="/audio-test" element={<AudioTest />} />
              <Route path="/signUp" element={<SignUp />} />

              {/* PatientProfile SidePanel Routes */}
              <Route path="/overview" element={<Overview />} />
              <Route
                path="/reminders-and-appointments"
                element={<RemindersAndAppointments />}
              />
              <Route path="/meeting-summaries" element={<MeetingSummaries />} />
              <Route path="/ai-insights" element={<AIInsights />} />

              {/*protect doctor profile route */}
              <Route
                path="/doctor-profile/*"
                element={
                  <PrivateRoute>
                    <DoctorProfile />
                  </PrivateRoute>
                }
              >
                {/*nested Routes within DoctorProfile */}
                <Route path="appointments" element={<Appointments />} />
                <Route
                  path="appointments/create-appointment"
                  element={<AppointmentCreation />}
                />
                <Route
                  path="appointments/:id"
                  element={<AppointmentDetail />}
                />
                <Route path="patients" element={<PatientsPage />} />
                <Route path="patients/:id" element={<PatientDetails />} />

                <Route path="home" element={<DoctorHomePage />} />
              </Route>

              <Route path="/patient-signup" element={<PatientSignUp />} />

              {/* Doctor Routes */}
              <Route path="/doctor-login" element={<DoctorLogin />} />
              <Route path="/doctor-signup" element={<DoctorSignUp />} />

              {/* Nested protected route for adding a patient under /patients */}
              <Route
                path="/doctor-profile/patients/add-new-patient"
                element={
                  <PrivateRoute>
                    <AddPatient />
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
