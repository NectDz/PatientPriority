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
  TableContainer,
  Button,
  Input,
  Select,
  Checkbox,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaUserFriends, FaUserMd, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

// Doctor Team Images
import Deedat from "../../assets/Team/Deedat.png";
import Abir from "../../assets/Team/Abir.png";
import Rahat from "../../assets/Team/Rahat.png";
import Kazi from "../../assets/Team/Kazi.png";
import Kevin from "../../assets/Team/Kevin.png";
import Lubna from "../../assets/Team/Lubna.png";

function DoctorHome() {
  const toast = useToast();
  const [user] = useAuthState(auth);

  // To-Do List States
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  // Appointments States
  const [appointments, setAppointments] = useState([]);

  // Static data for recent patients
  const recentPatients = [
    {
      id: 1,
      name: "Liam Payne",
      date: "October 16, 2024",
      type: "Drug Test",
      image: "https://via.placeholder.com/100",
    },
  ];

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
      setTasks(fetchedTasks);
    }
  };

  // Fetch appointments from Firestore
  const fetchAppointments = async () => {
    if (user) {
      const appointmentsRef = collection(db, "users", user.uid, "appointments");
      const snapshot = await getDocs(appointmentsRef);
      const fetchedAppointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(fetchedAppointments);
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
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (task) => {
    const taskRef = doc(db, "users", user.uid, "tasks", task.id);
    await updateDoc(taskRef, { completed: !task.completed });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const taskRef = doc(db, "users", user.uid, "tasks", taskId);
    await deleteDoc(taskRef);
    fetchTasks();
  };

  return (
    <ChakraProvider>
      {/* My Day Card with To-Do List */}
      <Card>
        <CardHeader bg="#ddeeff" borderRadius="10px">
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
                <Text color={task.priority === "High" ? "red.500" : task.priority === "Low" ? "green.500" : "orange.500"}>
                  {task.priority}
                </Text>
                <Button size="xs" colorScheme="red" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </HStack>
            ))}
            <HStack>
              <Input
                placeholder="New task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
              <Button colorScheme="blue" onClick={addTask}>Add</Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>

      {/* Appointments Section */}
      <Card mt={8}>
        <CardHeader bg="#ddeeff" borderRadius="10px">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={FaBell} mr={2} />
            Today's Appointments
          </Heading>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Time</Th>
                  <Th>Patient</Th>
                  <Th>Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointments.map((appointment) => (
                  <Tr key={appointment.id}>
                    <Td>{appointment.time}</Td>
                    <Td>{appointment.name}</Td>
                    <Td>{appointment.type}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      {/* Recent Patients Section */}
      <Card mt={8}>
        <CardHeader bg="#ddeeff">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={FaUserMd} mr={2} />
            Recent Patients
          </Heading>
        </CardHeader>
        <CardBody>
          {recentPatients.map((patient) => (
            <HStack key={patient.id} spacing={4}>
              <Avatar src={patient.image} size="lg" />
              <Text>{patient.name} - {patient.type}</Text>
            </HStack>
          ))}
        </CardBody>
      </Card>

      {/* Doctor Team Section */}
      <Card mt={8}>
        <CardHeader bg="#ddeeff">
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
