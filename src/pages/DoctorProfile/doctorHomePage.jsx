import {
  Box,
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
  TableContainer,
  Button,
  Input,
  Select,
  Checkbox,
  useToast,
  Stack,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaUserFriends, FaUserMd, FaBell } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Deedat from "../../assets/Team/Deedat.png";
import Abir from "../../assets/Team/Abir.png";
import Rahat from "../../assets/Team/Rahat.png";
import Kazi from "../../assets/Team/Kazi.png";
import Kevin from "../../assets/Team/Kevin.png";
import Lubna from "../../assets/Team/Lubna.png";

const storage = getStorage();

function DoctorHome() {
  const toast = useToast();
  const [user] = useAuthState(auth);

  // Image States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // To-Do List States
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("Choose priority");

  // Appointments States
  const [appointments, setAppointments] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [doctorName, setDoctorName] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [doctorImage, setDoctorImage] = useState("");

  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  // Fetch doctor data (name, id) from Firebase
  const fetchDoctorInfo = async () => {
    if (user) {
      const doctorQuery = query(
        collection(db, "doctor"),
        where("email", "==", user.email)
      );
      const doctorSnapshot = await getDocs(doctorQuery);
      if (!doctorSnapshot.empty) {
        const doctorData = doctorSnapshot.docs[0].data();
        setDoctorName(doctorData.firstName);
      }
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, [user]);

  // Static data for doctor team
  const team = [
    { name: "Dr. Abir", img: Abir },
    { name: "Dr. Kevin", img: Kevin },
    { name: "Dr. Rahat", img: Rahat },
    { name: "Dr. Lubna", img: Lubna },
    { name: "Dr. Deedat", img: Deedat },
    { name: "Dr. Kazi", img: Kazi },
  ];

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    if (user) {
      const tasksRef = collection(db, "users", user.uid, "tasks");
      const snapshot = await getDocs(tasksRef);
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(
        fetchedTasks.sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
      );
    }
  };

  // Fetch appointments from Firestore
  const fetchAppointments = async () => {
    // reuse same code from appointments page to get patient appointments

    if (!user) return;

    try {
      setLoading(true);
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
        setDoctorID(doctorId);
        // console.log("Doctor ID:" + doctorId);
        setDoctorImage(doctorData.profilePicture);

        //2 - get patients associated with this doctor
        const patientQuery = query(
          collection(db, "patients"),
          where("doctor_id", "==", doctorId)
        );
        const patientSnapshot = await getDocs(patientQuery);

        // const patientIds = patientSnapshot.docs.map((doc) => ({
        //   id: doc.data().id,
        //   firstName: doc.data().firstName,
        //   lastName: doc.data().lastName,
        // }));
        const patientIds = patientSnapshot.docs
          // filter out the patients with an ID (because new patients don't have an ID which causes an error)
          .filter((doc) => doc.data().id)
          .map((doc) => ({
            id: doc.data().id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            profilePicture: doc.data().profilePicture || null,
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
            profilePicture: patient.profilePicture,
          }));
        });

        const fetchedAppointments = (
          await Promise.all(appointmentPromises)
        ).flat();
        // console.log("Fetched appointments:", fetchedAppointments);

        // Get current date at midnight for date comparison
        const currentDate = new Date();
        const today = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // filter out appointments set on the current date
        const todaysAppointments = fetchedAppointments
          .filter((appointment) => {
            const appointmentDate = appointment.date.toDate();
            return appointmentDate >= today && appointmentDate < tomorrow;
          })
          .sort((a, b) => a.date.toDate() - b.date.toDate()); // Sort by time ascending

        // filter out appointments any date made during and after current date
        const pastAppointments = fetchedAppointments.filter(
          (appointment) => appointment.date.toDate() < today
        );

        // sort the dates in descending order and take the 5 latest appointments
        const latestAppointments = pastAppointments
          .sort((a, b) => b.date.toDate() - a.date.toDate())
          .slice(0, 5);

        setAppointments(fetchedAppointments);
        setRecentAppointments(latestAppointments);
        setTodaysAppointments(todaysAppointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error loading appointments.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      // console.log("Fetched today's appointments:", todaysAppointments);
      // console.log("Fetched recent appointments:", recentAppointments);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchAppointments();
  }, [user]);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "") {
      toast({
        title: "Task cannot be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const taskObj = { text: newTask, priority: taskPriority, completed: false };
    if (user) {
      await addDoc(collection(db, "users", user.uid, "tasks"), taskObj);
      fetchTasks();
      setNewTask("");
      toast({
        title: "Task added successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (task) => {
    const taskRef = doc(db, "users", user.uid, "tasks", task.id);
    await updateDoc(taskRef, { completed: !task.completed });
    fetchTasks();
    toast({
      title: task.completed ? "Task marked as incomplete" : "Task completed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const taskRef = doc(db, "users", user.uid, "tasks", taskId);
    await deleteDoc(taskRef);
    fetchTasks();
    toast({
      title: "Task deleted successfully",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  // Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file from the file input
    if (file) {
      setSelectedImage(file); // Store the file object in state for uploading
    }
  };

  // Save Changes
  const saveChanges = async () => {
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "No image uploaded",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // create unique file name for image
      const fileName = `${doctorName}_profile_picture`;
      // create a ref path for the image
      const imageRef = ref(storage, `ProfileImages/${fileName}`);
      await uploadBytes(imageRef, selectedImage);
      // get the firebase Storage URL
      const downloadURL = await getDownloadURL(imageRef);

      // query the firestore to find the patient document
      const doctorQuery = query(
        collection(db, "doctor"),
        where("id", "==", doctorID)
      );

      const doctorSnapshot = await getDocs(doctorQuery);

      if (!doctorSnapshot.empty) {
        // get the first document from the patientSnapshot array (there should only be one thing in the array anyways)
        const doctorDoc = doctorSnapshot.docs[0];
        // get the path reference for the patient document
        const doctorDocRef = doc(db, "doctor", doctorDoc.id);

        // update the profilePicture field in Firestore
        await updateDoc(doctorDocRef, {
          profilePicture: downloadURL,
        });

        //update the patient state
        setDoctorImage(downloadURL);

        toast({
          title: "Success",
          description: "Profile picture updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setIsModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Patient document not found in Firestore.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast({
        title: "Error",
        description: "Failed to update profile picture.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Card
        mt={4}
        pl={2}
        height="90%"
        width="100%"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
        bg="#ddeeff"
        borderRadius="20px"
      >
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="20px 20px 0px 0px"
        >
          {doctorImage ? (
            <Box
              position="relative"
              borderRadius="full"
              boxSize="120px"
              mr={4}
              overflow="hidden"
              _hover={{
                "& .edit-overlay": {
                  opacity: 1,
                  visibility: "visible",
                },
              }}
            >
              <Image
                borderRadius="full"
                boxSize="120px"
                src={doctorImage}
                alt="Profile"
                border="4px solid"
                borderColor="#00366d"
                objectFit="cover"
              />
              <Box
                className="edit-overlay"
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                height="40%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="rgba(0,0,0,0.5)"
                color="white"
                borderBottomRadius="full"
                opacity={0}
                visibility="hidden"
                transition="opacity 0.2s, visibility 0.2s"
                cursor="pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Edit
              </Box>
            </Box>
          ) : (
            <Box
              position="relative"
              borderRadius="full"
              boxSize="120px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              bg="gray.200"
              color="gray.600"
              fontSize="sm"
              mr={4}
              border="4px solid"
              borderColor="#00366d"
              _hover={{
                "& .edit-overlay": {
                  opacity: 1,
                  visibility: "visible",
                },
              }}
            >
              <Text>No Image Available</Text>
              <Box
                className="edit-overlay"
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                height="40%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="rgba(0,0,0,0.5)"
                color="white"
                borderBottomRadius="full"
                opacity={0}
                visibility="hidden"
                transition="opacity 0.2s, visibility 0.2s"
                cursor="pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Edit
              </Box>
            </Box>
          )}

          <Heading fontSize="2xl" color="#00366d" flex="1">
            Welcome to Patient Priority, Dr. {doctorName || "Loading..."} !
          </Heading>

          <Text fontSize="xl" color="gray.500">
            {todayDate}
          </Text>
        </CardHeader>
      </Card>

      {/* Edit Image Modal*/}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={handleImageUpload} />
          </ModalBody>
          <ModalFooter>
            <Button color="#335d8f" mr={3} onClick={saveChanges}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* To-Do List */}
      <Card
        mt={4}
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
            <Icon as={CalendarIcon} mr={2} />
            My Day
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <Heading fontSize="lg">To-Do List</Heading>
            {tasks.map((task) => (
              <HStack key={task.id} spacing={4}>
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(task)}
                >
                  <Text as={task.completed ? "del" : ""}>{task.text}</Text>
                </Checkbox>
                <Text
                  color={
                    task.priority === "High"
                      ? "red.500"
                      : task.priority === "Low"
                      ? "green.500"
                      : "orange.500"
                  }
                >
                  {task.priority}
                </Text>
                <Button
                  size="xs"
                  colorScheme="red"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </HStack>
            ))}
            <HStack>
              <Input
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                placeholder="Choose priority"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </Select>
              <Button colorScheme="blue" onClick={addTask} minWidth="120px">
                Add Task
              </Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>

      {/* TODAYS APPOINTMENTS CARD */}
      <Card
        mt={8}
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
            <Icon as={FaBell} mr={2} />
            Today's Appointments
          </Heading>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Profile</Th>
                    <Th>Patient</Th>
                    <Th>Time</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {todaysAppointments.map((appointment) => (
                    <Tr key={appointment.id}>
                      <Td>
                        <Avatar
                          size="lg"
                          src={
                            appointment.profilePicture || "default-profile.png"
                          }
                          name={appointment.patientName}
                        />
                      </Td>
                      <Td>{appointment.patientName}</Td>
                      <Td>{appointment.date.toDate().toLocaleTimeString()}</Td>
                      <Td>{appointment.description}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </CardBody>
      </Card>

      {/* Recent Patients */}
      <Card
        mt={8}
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
                    <Th>Profile</Th>
                    <Th>Name</Th>
                    <Th>Date</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentAppointments.map((appointment) => (
                    <Tr key={appointment.id}>
                      <Td>
                        <Avatar
                          size="lg"
                          src={
                            appointment.profilePicture || "default-profile.png"
                          }
                          name={appointment.patientName}
                        />
                      </Td>
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

      {/* Doctor Team */}
      <Card
        mt={8}
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
        <CardBody>
          <HStack spacing={10} justifyContent="center">
            {team.map((doctor, index) => (
              <VStack key={index}>
                <Avatar src={doctor.img} size="2xl" />
                <Text>{doctor.name}</Text>
              </VStack>
            ))}
          </HStack>
        </CardBody>
      </Card>
    </ChakraProvider>
  );
}

export default DoctorHome;
