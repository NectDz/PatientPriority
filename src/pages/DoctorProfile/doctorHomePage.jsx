// DoctorHome.js
import {
  Card,
  CardHeader,
  CardBody,
  ChakraProvider,
  Heading,
  Icon,
  Text,
  Avatar,
  VStack,
  HStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaUserFriends, FaUserMd } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

//Team Images
import Deedat from "../../assets/Team/Deedat.png";
import Abir from "../../assets/Team/Abir.png";
import Rahat from "../../assets/Team/Rahat.png";
import Kazi from "../../assets/Team/Kazi.png";
import Kevin from "../../assets/Team/Kevin.png";
import Lubna from "../../assets/Team/Lubna.png";

//firebase init
const db = getFirestore();

function DoctorHome() {
  // reuse same code from appointments page to get patient appointments

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchAppointments() {
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

          const patientIds = patientSnapshot.docs.map((doc) => ({
            id: doc.data().id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
          }));

          //3 - get appointments for each patient and display their first and last name
          const appointmentPromises = patientIds.map(async (patient) => {
            const appointmentQuery = query(
              collection(db, "appointment"),
              where("patient_id", "==", patient.id)
            );
            const appointmentSnapshot = await getDocs(appointmentQuery);

            return appointmentSnapshot.docs.map((doc) => ({
              id: doc.id,
              date: doc.data().appointmentDate,
              description: doc.data().appointmentDescription,
              patientName: `${patient.firstName} ${patient.lastName}`,
            }));
          });

          const fetchedAppointments = (
            await Promise.all(appointmentPromises)
          ).flat();

          // filter out appointments any date made during and after current date
          const currentDate = new Date();
          const pastAppointments = fetchedAppointments.filter(
            (appointment) => appointment.date.toDate() < currentDate
          );

          // sort the dates in descending order and take the 3 latest appointments
          const latestAppointments = pastAppointments
            .sort((a, b) => b.date - a.date)
            .slice(0, 5);

          setAppointments(latestAppointments);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user]);

  return (
    <ChakraProvider>
      <Card
        borderRadius="20px"
        height="100%"
        width="100%"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        //padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
      >
        <CardHeader bg="#ddeeff" borderRadius="20px 20px 0px 0px">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={CalendarIcon} mr={2} />
            My Day
          </Heading>
        </CardHeader>
        <CardBody
          display="flex"
          flexDirection="column"
          justifyContent="center"
          borderRadius="0px 0px 20px 20px"
        >
          <Text fontSize="lg" color="#737373">
            View your schedule and daily tasks here.
          </Text>
        </CardBody>
      </Card>

      {/* RECENT PATIENTS CARD */}
      <Card
        // bg="#ddeeff"
        borderRadius="20px"
        height="100%"
        width="100%"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        //padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
      >
        <CardHeader bg="#ddeeff" borderRadius="20px 20px 0px 0px">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={FaUserMd} mr={2} />
            Recent Patients
          </Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="lg" color="#737373">
            See your most recent patient interactions here.
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <TableContainer mt={5}>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Date</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {appointments.map((appointment) => (
                    <Tr key={appointment.id}>
                      <Td>{appointment.patientName}</Td>
                      <Td>
                        {new Date(
                          appointment.date.seconds * 1000
                        ).toLocaleDateString()}
                      </Td>
                      <Td>{appointment.description}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Divider />
            </TableContainer>
          )}
        </CardBody>
      </Card>

      {/* DOCTOR TEAM CARD */}
      <Card
        borderRadius="20px"
        height="100%"
        width="100%"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        //padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
      >
        <CardHeader bg="#ddeeff" borderRadius="20px 20px 0px 0px">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={FaUserFriends} mr={2} />
            My Team
          </Heading>
        </CardHeader>
        <CardBody
          display="flex"
          flexDirection="column"
          justifyContent="center"
          borderRadius="0px 0px 20px 20px"
          overflowY="auto"
          padding={4}
        >
          <HStack align="center" justify="center" spacing={20}>
            <VStack>
              <Avatar size="2xl" name="Dr. A Bear" src={Abir} />
              <Text fontSize="lg" color="#737373">
                Dr. A Bear
              </Text>
            </VStack>
            <VStack>
              <Avatar size="2xl" name="Dr. Kave" src={Kevin} />
              <Text fontSize="lg" color="#737373">
                Dr. Kave
              </Text>
            </VStack>
            <VStack>
              <Avatar size="2xl" name="Dr. Rahhh" src={Rahat} />
              <Text fontSize="lg" color="#737373">
                Dr. Rahhh
              </Text>
            </VStack>
            <VStack>
              <Avatar size="2xl" name="Dr. Lube" src={Lubna} />
              <Text fontSize="lg" color="#737373">
                Dr. Lube
              </Text>
            </VStack>
            <VStack>
              <Avatar size="2xl" name="Dr. Deed" src={Deedat} />
              <Text fontSize="lg" color="#737373">
                Dr. Deed
              </Text>
            </VStack>
            <VStack>
              <Avatar size="2xl" name="Dr. Kazoo" src={Kazi} />
              <Text fontSize="lg" color="#737373">
                Dr. Kazoo
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>
    </ChakraProvider>
  );
}

export default DoctorHome;
