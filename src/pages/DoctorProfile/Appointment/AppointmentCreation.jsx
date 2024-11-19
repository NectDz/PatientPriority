import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

function AppointmentCreation() {
  const navigate = useNavigate();
  const toast = useToast();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchPatients() {
      try {
        if (!user) {
          return;
        }

        const doctorEmail = user.email;

        //1 - get the doctor's ID by matching the email in the "doctor" collection
        const doctorQuery = query(
          collection(db, "doctor"),
          where("email", "==", doctorEmail)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorData = doctorSnapshot.docs[0].data();
          const doctorId = doctorData.id;

          //2 - get patients associated with this doctor
          const patientQuery = query(
            collection(db, "patients"),
            where("doctor_id", "==", doctorId)
          );
          const patientSnapshot = await getDocs(patientQuery);

          const patientList = patientSnapshot.docs.map((doc) => ({
            value: doc.data().id, //use patient_id as value
            label: `${doc.data().firstName} ${doc.data().lastName}`, //combine first and last name
          }));

          setPatients(patientList);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false);
      }
    }

    fetchPatients();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate
    if (!selectedPatient || !date || !time || !description) {
      alert("Please fill out all fields");
      return;
    }

    try {
      // First check if the selected patient has an ID (meaning if they signed up), else throw a toast to let doc know
      if (!selectedPatient.value) {
        toast({
          title: "Patient Not Registered",
          description: "This patient hasn't signed up yet.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      //get doctor ID again for this session
      const doctorQuery = query(
        collection(db, "doctor"),
        where("email", "==", user.email)
      );
      const doctorSnapshot = await getDocs(doctorQuery);

      if (!doctorSnapshot.empty) {
        const doctorData = doctorSnapshot.docs[0].data();
        const doctorId = doctorData.id;

        //create new appointment object
        const newAppointment = {
          appointmentDate: new Date(`${date}T${time}:00`),
          appointmentDescription: description,
          appointmentTranscript: "",
          doctor_id: doctorId,
          patient_id: selectedPatient.value,
        };

        //3 - save new appointment to Firestore in the "appointment"
        await addDoc(collection(db, "appointment"), newAppointment);

        console.log("New Appointment:", newAppointment);

        //navigate back to the appointments page after creating an appointment
        navigate("/doctor-profile/appointments");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6} color="#00366d" >
        Create New Appointment
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="patient" mb={4}>
          <FormLabel>Select Patient</FormLabel>
          <Select
            value={selectedPatient}
            onChange={setSelectedPatient}
            options={patients}
            placeholder="Select a patient"
          />
        </FormControl>

        <FormControl id="date" mb={4}>
          <FormLabel>Appointment Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Select appointment date"
          />
        </FormControl>

        <FormControl id="time" mb={4}>
          <FormLabel>Appointment Time</FormLabel>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Select appointment time"
          />
        </FormControl>

        <FormControl id="description" mb={4}>
          <FormLabel>Appointment Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter appointment details"
          />
        </FormControl>

        <Button type="submit" width="full"
        _hover={{ bg: "#4d7098" }}
        color="#f1f8ff"
        bg="#335d8f"
        >
          Create Appointment
        </Button>
      </form>
    </Box>
  );
}

export default AppointmentCreation;
