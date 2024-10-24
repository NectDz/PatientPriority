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
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaUserFriends, FaUserMd } from "react-icons/fa";

function DoctorHome() {
  return (
    <ChakraProvider>
      <Card borderRadius="20px" height="200px" width="100%">
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

      <Card
        // bg="#EFF8F8"
        borderRadius="20px"
        height="200px"
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
          justifyContent="center"
          borderRadius="0px 0px 20px 20px"
        >
          <Text fontSize="lg" color="#737373">
            See your most recent patient interactions.
          </Text>
        </CardBody>
      </Card>

      <Card borderRadius="20px" height="300px" width="100%">
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
        >
          <HStack align="center" justify="center" spacing={20}>
            <VStack>
              <Avatar
                size="xl"
                name="Dr. A Bear"
                src="https://bit.ly/dan-abramov" // random image
              />
              <Text fontSize="lg" color="#737373">
                Dr. A Bear
              </Text>
            </VStack>
            <VStack>
              <Avatar
                size="xl"
                name="Dr. Kave"
                src="https://bit.ly/kent-c-dodds" // random image
              />
              <Text fontSize="lg" color="#737373">
                Dr. Kave
              </Text>
            </VStack>
            <VStack>
              <Avatar
                size="xl"
                name="Dr. Rahhh"
                src="https://bit.ly/ryan-florence" // random image
              />
              <Text fontSize="lg" color="#737373">
                Dr. Rahhh
              </Text>
            </VStack>
            <VStack>
              <Avatar
                size="xl"
                name="Dr. Lube"
                src="https://bit.ly/ryan-florence" // random image
              />
              <Text fontSize="lg" color="#737373">
                Dr. Lube
              </Text>
            </VStack>
            <VStack>
              <Avatar
                size="xl"
                name="Dr. Deed"
                src="https://bit.ly/ryan-florence" // random image
              />
              <Text fontSize="lg" color="#737373">
                Dr. Deed
              </Text>
            </VStack>
            <VStack>
              <Avatar
                size="xl"
                name="Dr. Kazoo"
                src="https://bit.ly/ryan-florence" // random image
              />
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
