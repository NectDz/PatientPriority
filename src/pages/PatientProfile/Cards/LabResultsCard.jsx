import { Card, CardHeader, CardBody, Box, Text, Flex, Spacer, Link, color} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ExternalLinkIcon, ChevronRightIcon } from "@chakra-ui/icons";

function LabResultsCard() {

  return (
    <Card width="100%" height="100%" border="1px solid" borderColor="gray.300">
      <CardHeader
        p="0"
        fontWeight="bold"
        textAlign="center"
        fontSize="x-large"
        textDecoration="underline"
      >
        Lab Test Results
      </CardHeader>

      <CardBody display="flex" maxHeight="450px" pt="20px" overflowY="auto">
        <Box p="4" maxW="500px">

          <Box border="1px solid" width="25vw" maxWidth="100%">
            <Flex p="1">
              <Text> some really extra long name </Text>
              <Spacer />  {/* makes the date stay on the right side */}
              <Text> some really long date </Text>
            </Flex>
            <Box height="20px"/>
            <Link p="1" textDecoration={"underline"}> link to the pdf which should open up in new tab </Link>
            <ExternalLinkIcon />
          </Box>
          
          <Box border="1px solid" width="25vw" maxWidth="100%">
            <Flex p="1">
              <Text> some really extra long name </Text>
              <Spacer />  {/* makes the date stay on the right side */}
              <Text> some really long date </Text>
            </Flex>
            <Box height="20px"/>
            <Link p="1" textDecoration={"underline"}> link to the pdf which should open up in new tab </Link>
            <ExternalLinkIcon />
          </Box>

          <Box border="1px solid" width="25vw" maxWidth="100%">
            <Flex p="1">
              <Text> some really extra long name </Text>
              <Spacer />  {/* makes the date stay on the right side */}
              <Text> some really long date </Text>
            </Flex>
            <Box height="20px"/>
            <Link p="1" textDecoration={"underline"}> link to the pdf which should open up in new tab </Link>
            <ExternalLinkIcon />
          </Box>

          <Box border="1px solid" width="25vw" maxWidth="100%">
            <Flex p="1">
              <Text> some really extra long name </Text>
              <Spacer />  {/* makes the date stay on the right side */}
              <Text> some really long date </Text>
            </Flex>
            <Box height="20px"/>
            <Link p="1" textDecoration={"underline"}> link to the pdf which should open up in new tab </Link>
            <ExternalLinkIcon />
          </Box>

          <Box border="1px solid" width="25vw" maxWidth="100%">
            <Flex p="1">
              <Text> some really extra long name </Text>
              <Spacer />  {/* makes the date stay on the right side */}
              <Text> some really long date </Text>
            </Flex>
            <Box height="20px"/>
            <Link p="1" textDecoration={"underline"}> link to the pdf which should open up in new tab </Link>
            <ExternalLinkIcon />
          </Box>

          <Box border="1px solid" width="25vw" maxWidth="100%">
            <Flex p="1">
              <Text> some really extra long name </Text>
              <Spacer />  {/* makes the date stay on the right side */}
              <Text> some really long date </Text>
            </Flex>
            <Box height="20px"/>
            <Link p="1" textDecoration={"underline"}> link to the pdf which should open up in new tab </Link>
            <ExternalLinkIcon />
          </Box>

          <Box border="1px solid" width="25vw" maxWidth="100%">
            <Flex p="1">
              <Text> some really extra long name </Text>
              <Spacer />  {/* makes the date stay on the right side */}
              <Text> some really long date </Text>
            </Flex>
            <Box height="20px"/>
            <Link p="1" textDecoration={"underline"}> link to the pdf which should open up in new tab </Link>
            <ExternalLinkIcon />
          </Box>

        </Box>
      </CardBody>
    </Card>
  );
}

export default LabResultsCard;
