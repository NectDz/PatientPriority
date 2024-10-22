// import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
// import SidePanel from "./sidePanel";
// import { useRef, useState } from "react";
// import ProfileCard from "./Cards/ProfileCard";
// import OverviewCard from "./Cards/OverviewCard";
// import CalendarCard from "./Cards/CalendarCard";
// import TranscriptionCard from "./Cards/TranscriptionCard";

// function PatientProfile() {
//   const [isMaximized, setIsMaximized] = useState(false);

//   const handleToggleMaximize = (value) => setIsMaximized(value);

//   const profileRef = useRef(null);
//   const overviewRef = useRef(null);
//   const calendarRef = useRef(null);
//   const transcriptionRef = useRef(null);

//   const scrollToSection = (sectionId) => {
//     const refMap = {
//       "profile-card": profileRef,
//       "overview-card": overviewRef,
//       "calendar-card": calendarRef,
//       "transcription-card": transcriptionRef,
//     };
//     if (refMap[sectionId]?.current) {
//       refMap[sectionId].current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <ChakraProvider>
//       <Flex pt="50px" minH="100vh" bg="#EFF8F8">
//         <SidePanel
//           onToggleMaximize={handleToggleMaximize}
//           scrollToSection={scrollToSection}
//         />

//         {/* Main Content Area */}
//         <Grid
//           pl="8"
//           pt="60px"
//           transition="margin-left 0.5s ease"
//           marginLeft={isMaximized ? "200px" : "70px"}
//           templateRows="repeat(8, 1fr)"
//           templateColumns="repeat(1, 1fr)"  // Only one column for full-width cards
//           gap={6}  // Increased gap for better spacing
//           width="100%"  // Set the grid to use full width of the container
//         >
//           {/* Profile Card */}
//           <GridItem ref={profileRef} id="profile-card">
//             <ProfileCard />
//           </GridItem>

//           {/* Overview Card */}
//           <GridItem ref={overviewRef} id="overview-card">
//             <OverviewCard />
//           </GridItem>

//           {/* Reminders / Appointments (CalendarCard) */}
//           <GridItem ref={calendarRef} id="calendar-card">
//             <CalendarCard />
//           </GridItem>

//           {/* Transcription / Summary (TranscriptionCard) */}
//           <GridItem ref={transcriptionRef} id="transcription-card">
//             <TranscriptionCard />
//           </GridItem>
//         </Grid>
//       </Flex>
//     </ChakraProvider>
//   );
// }

// export default PatientProfile;
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import SidePanel from "./sidePanel";
import { useRef, useState } from "react";
import ProfileCard from "./Cards/ProfileCard";
import OverviewCard from "./Cards/OverviewCard";
import CalendarCard from "./Cards/CalendarCard";
import TranscriptionCard from "./Cards/TranscriptionCard";

function PatientProfile() {
  // const profileRef = useRef(null);
  // const overviewRef = useRef(null);
  // const calendarRef = useRef(null);
  // const transcriptionRef = useRef(null);

  // const scrollToSection = (sectionId) => {
  //   const refMap = {
  //     "profile-card": profileRef,
  //     "overview-card": overviewRef,
  //     "calendar-card": calendarRef,
  //     "transcription-card": transcriptionRef,
  //   };
  //   if (refMap[sectionId]?.current) {
  //     refMap[sectionId].current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <ChakraProvider>
      <Flex pt="50px" minH="100vh" bg="#EFF8F8">
        {/* <SidePanel scrollToSection={scrollToSection} /> */}
        <SidePanel />


        {/* Main Content Area */}
        <Grid
          pl="6"
          pr="6"
          pt="60px"
          marginLeft="220px"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(1, 1fr)"
          gap={6}
          width="100%"
        >
          {/* Profile Card */}
          <GridItem id="profile-card"> 
            <ProfileCard />
          </GridItem>

          {/* Overview Card */}
          <GridItem  id="overview-card">
            <OverviewCard />
          </GridItem>

          {/* Reminders / Appointments (CalendarCard) */}
          <GridItem id="calendar-card">
            <CalendarCard />
          </GridItem>

          {/* Transcription / Summary (TranscriptionCard) */}
          <GridItem id="transcription-card">
            <TranscriptionCard />
          </GridItem>
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientProfile;
