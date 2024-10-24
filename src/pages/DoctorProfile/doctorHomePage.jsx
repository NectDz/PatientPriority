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

//Team Images
import Deedat from "../../assets/Team/Deedat.png";
import Abir from "../../assets/Team/Abir.png";
import Rahat from "../../assets/Team/Rahat.png";
import Kazi from "../../assets/Team/Kazi.png";
import Kevin from "../../assets/Team/Kevin.png";
import Lubna from "../../assets/Team/Lubna.png";

function DoctorHome() {
  return (
    <ChakraProvider>
      <Card borderRadius="20px" height="100%" width="100%">
        <CardHeader bg="#EFF8F8" borderRadius="20px 20px 0px 0px">
          <Heading fontSize="2xl" color="black">
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
        // bg="#EFF8F8"
        borderRadius="20px"
        height="100%"
        width="100%"
      >
        <CardHeader bg="#EFF8F8" borderRadius="20px 20px 0px 0px">
          <Heading fontSize="2xl" color="#252B42">
            <Icon as={FaUserMd} mr={2} />
            Recent Patients
          </Heading>
        </CardHeader>
        <CardBody
          display="flex"
          flexDirection="column"
          //   justifyContent="center"
          borderRadius="0px 0px 20px 20px"
        >
          <Text fontSize="lg" color="#737373">
            See your most recent patient interactions.
          </Text>
        {/* Display patients using table component*/}
          <TableContainer mt={5}>
            <Table variant="striped"> {/* adds the color between rows */}

              <Thead> {/* this is the table head aka categories */}
                <Tr> 
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Date of Visit</Th>
                  <Th>Appointment Type</Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td>
                    <Avatar
                      size="xl"
                      name="Kazi"
                      src="https://www.usatoday.com/gcdn/presto/2020/08/28/USAT/efafa6ba-5d7c-4218-8684-37436e378850-liam_payne.JPG?crop=2978,1676,x0,y447"
                    />
                  </Td>
                  <Td>Liam Payne</Td>
                  <Td>October 16, 2024</Td>
                  <Td>Drug Test</Td>
                </Tr>
                
              </Tbody>

            </Table>
            <Divider />
          </TableContainer>
        </CardBody>
      </Card>

      {/* DOCTOR TEAM CARD */}
      <Card borderRadius="20px" height="100%" width="100%">
        <CardHeader bg="#EFF8F8" borderRadius="20px 20px 0px 0px">
          <Heading fontSize="2xl" color="black">
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
