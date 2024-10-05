import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import SidePanel from "./sidePanel";
import { useState } from "react";
// instead of making all the cards on this file, keep it better organized by making each cards in another file
import ProfileCard from "./Cards/ProfileCard";
import OverviewCard from "./Cards/OverviewCard";
import LabResultsCard from "./Cards/LabResultsCard";
import CareTeamCard from "./Cards/CareTeamCard";
import CalendarCard from "./Cards/CalendarCard";
import MedicalHistoryCard from "./Cards/MedicalHistoryCard";

import { Grid, GridItem } from "@chakra-ui/react";

function PatientProfile() {
  // manage state of isMaximized
  const [isMaximized, setIsMaximized] = useState(false);
  // this is a function that updates the value of isMaximized
  const handleToggleMaximize = (value) => {
    setIsMaximized(value);
  };

  return (
    <ChakraProvider>
      <Flex pt="50px" minH="100vh" bg="#EFF8F8">
        <SidePanel
          onToggleMaximize={handleToggleMaximize}
          // send as prop to child component
          // this is to lift state of isMaximized from child component to parent component
        />

        {/* where all the cards will go */}
        {/* <Flex
          display="flex"
          // minW="fit-content"
          pl="8"
          pt="60px"
          // flexGrow="1"
          transition="margin-left 0.5s ease" // Smooth transition for margin
          marginLeft={isMaximized ? "200px" : "70px"} // Adjust the margin based on panel state
          gap="35px"
          wrap="wrap"
        >
          <ProfileCard/>
          <OverviewCard setMaximized={handleToggleMaximize}/>
          {/* <LabResults/>
          <CareTeamCard/>
          <CalendarCard/>
          <MedicalHistoryCard/> 
        </Flex> */}

        <Grid
          pl="8"
          pt="60px"
          transition="margin-left 0.5s ease" // Smooth transition for margin... i can't even tell if its working...
          marginLeft={isMaximized ? "200px" : "70px"} // adjust the margin based on panel state
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={2}>
            {" "}
            <ProfileCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={4} minW="1110px">
            {" "}
            <OverviewCard />{" "}
          </GridItem>
          {/* Not entirely sure how grid works yet but the above card needs a min width since the grid is formatted based on the size of the content inside of it?
              If its smaller, then everything else will shrink too bc the width of each "fraction" will be smaller. */}
          <GridItem rowSpan={4} colSpan={2}>
            {" "}
            <LabResultsCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={2}>
            {" "}
            <CareTeamCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={2}>
            {" "}
            <CalendarCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={3}>
            {" "}
            <MedicalHistoryCard />{" "}
          </GridItem>
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientProfile;
