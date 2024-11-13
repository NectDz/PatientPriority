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
import { useState } from "react";

// Team Images
import Deedat from "../../assets/Team/Deedat.png";
import Abir from "../../assets/Team/Abir.png";
import Rahat from "../../assets/Team/Rahat.png";
import Kazi from "../../assets/Team/Kazi.png";
import Kevin from "../../assets/Team/Kevin.png";
import Lubna from "../../assets/Team/Lubna.png";

function DoctorHome() {
  const toast = useToast();

  // State for To-Do List
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  // State for Appointments
  const appointments = [
    { id: 1, name: "John Doe", time: "10:00 AM", type: "Follow-up" },
    { id: 2, name: "Jane Smith", time: "12:00 PM", type: "Consultation" },
  ];

  // State for Recent Patients
  const recentPatients = [
    {
      id: 1,
      name: "Liam Payne",
      date: "October 16, 2024",
      type: "Drug Test",
      image:
        "https://www.usatoday.com/gcdn/presto/2020/08/28/USAT/efafa6ba-5d7c-4218-8684-37436e378850-liam_payne.JPG?crop=2978,1676,x0,y447",
    },
  ];

  // Handle adding a new task
  const addTask = () => {
    if (newTask.trim() === "") {
      toast({
        title: "Task cannot be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { text: newTask, priority: taskPriority, completed: false }]);
    setNewTask("");
  };

  // Handle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <ChakraProvider>
      {/* MY DAY CARD with To-Do List */}
      <Card borderRadius="20px" height="100%" width="100%" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)" transition="all 0.3s" _hover={{ boxShadow: "2xl" }}>
        <CardHeader bg="#ddeeff" borderRadius="20px 20px 0px 0px">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={CalendarIcon} mr={2} />
            My Day
          </Heading>
        </CardHeader>
        <CardBody>
          {/* To-Do List */}
          <Stack spacing={4}>
            <Heading fontSize="lg" color="#00366d">To-Do List</Heading>
            {tasks.map((task, index) => (
              <HStack key={index} spacing={4}>
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                >
                  <Text as={task.completed ? "del" : ""}>{task.text}</Text>
                </Checkbox>
                <Text fontSize="sm" color={task.priority === "High" ? "red.500" : task.priority === "Low" ? "green.500" : "orange.500"}>
                  {task.priority}
                </Text>
                <Button size="xs" colorScheme="red" onClick={() => deleteTask(index)}>Delete</Button>
              </HStack>
            ))}
            <HStack>
              <Input
                placeholder="New task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Select width="120px" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
              <Button colorScheme="blue" onClick={addTask}>Add</Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>

      {/*
      {/* RECENT PATIENTS */}
      <Card mt={8} borderRadius="20px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)" _hover={{ boxShadow: "2xl" }}>
        <CardHeader bg="#ddeeff">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={FaUserMd} mr={2} />
            Recent Patients
          </Heading>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Date of Visit</Th>
                  <Th>Appointment Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentPatients.map((patient) => (
                  <Tr key={patient.id}>
                    <Td><Avatar size="xl" src={patient.image} /></Td>
                    <Td>{patient.name}</Td>
                    <Td>{patient.date}</Td>
                    <Td>{patient.type}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      {/* DOCTOR TEAM */}
      <Card mt={8} borderRadius="20px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)" _hover={{ boxShadow: "2xl" }}>
        <CardHeader bg="#ddeeff">
          <Heading fontSize="2xl" color="#00366d">
            <Icon as={FaUserFriends} mr={2} />
            My Team
          </Heading>
        </CardHeader>
        <CardBody>
          <HStack spacing={10} justifyContent="center">
            {[{ name: "Dr. A Bear", img: Abir }, { name: "Dr. Kave", img: Kevin }, { name: "Dr. Rahhh", img: Rahat }, { name: "Dr. Lube", img: Lubna }, { name: "Dr. Deed", img: Deedat }, { name: "Dr. Kazoo", img: Kazi }].map((doctor, index) => (
              <VStack key={index}>
                <Avatar size="2xl" src={doctor.img} />
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
