import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import SidePanel from "./sidePanel";
import { useRef, useState } from "react";
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

  // refs for each card
  const profileRef = useRef(null);
  const overviewRef = useRef(null);
  const labResultsRef = useRef(null);
  const careTeamRef = useRef(null);
  const calendarRef = useRef(null);
  const medicalHistoryRef = useRef(null);

  // if/else function that scrolls to the referenced section
  const scrollToSection = (sectionId) => {
    if (sectionId === "profile-card" && profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "overview-card" && overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "lab-results-card" && labResultsRef.current) {
      labResultsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "care-team-card" && careTeamRef.current) {
      careTeamRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "calendar-card" && calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "medical-history-card" && medicalHistoryRef.current) {
      medicalHistoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ChakraProvider>

      <Flex pt="50px" minH="100vh" bg="#EFF8F8" scrollBehavior="smooth">
        <SidePanel
          onToggleMaximize={handleToggleMaximize}
          // send as prop to child component
          // this is to lift state of isMaximized from child component to parent component
          scrollToSection={scrollToSection} // send prop to child, whatever child sends back, will become "sectionID" in the function
        />

        <Grid
          pl="8"
          pt="60px"
          transition="margin-left 0.5s ease" // Smooth transition for margin... i can't even tell if its working...
          marginLeft={isMaximized ? "200px" : "70px"} // adjust the margin based on panel state
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={2} ref={profileRef} id="profile-card">
            {" "}
            <ProfileCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={4} minW="1110px" ref={overviewRef} id="overview-card">
            {" "}
            <OverviewCard />{" "}
          </GridItem>
          {/* Not entirely sure how grid works yet but the above card needs a min width since the grid is formatted based on the size of the content inside of it?
              If its smaller, then everything else will shrink too bc the width of each "fraction" will be smaller. */}
          <GridItem rowSpan={4} colSpan={2} ref={labResultsRef} id="lab-results-card">
            {" "}
            <LabResultsCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={2} ref={careTeamRef} id="care-team-card">
            {" "}
            <CareTeamCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={2} ref={calendarRef} id="calendar-card">
            {" "}
            <CalendarCard />{" "}
          </GridItem>
          <GridItem rowSpan={3} colSpan={3} ref={medicalHistoryRef} id="medical-history-card">
            {" "}
            <MedicalHistoryCard />{" "}
          </GridItem>
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientProfile;
