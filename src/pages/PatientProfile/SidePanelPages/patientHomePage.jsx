// export default PatientProfile;
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
// import SidePanel from "./sidePanel";
import { useRef, useState } from "react";
import ProfileCard from "../Cards/ProfileCard";
import OverviewCard from "../Cards/OverviewCard";
import CalendarCard from "../Cards/CalendarCard";
import TranscriptionCard from "../Cards/TranscriptionCard";

function PatientProfile() {

//   return (
//     <ChakraProvider>
//       <Flex minH="100vh" bg="#FAFAFA">
//         {/* <SidePanel scrollToSection={scrollToSection} /> */}
//         {/* <SidePanel /> */}


//         {/* Main Content Area */}
//         <Grid
//         //   pl="6"
//         //   pr="6"
//         //   pt="60px"
//           marginBottom="30px"
//         //   marginLeft="220px"
//           templateRows="repeat(3, 1fr)"
//           templateColumns="repeat(1, 1fr)"
//           gap={6}
//           width="100%"
//         >
//           {/* Profile Card */}
//           <GridItem id="profile-card"> 
//             <ProfileCard />
//           </GridItem>

//           {/* Overview Card */}
//           <GridItem  id="overview-card">
//             <OverviewCard />
//           </GridItem>

//           {/* Reminders / Appointments (CalendarCard) */}
//           <GridItem id="calendar-card">
//             <CalendarCard />
//           </GridItem>

//           {/* Transcription / Summary (TranscriptionCard) */}
//           {/* <GridItem id="transcription-card">
//             <TranscriptionCard />
//           </GridItem> */}
//         </Grid>
//       </Flex>
//     </ChakraProvider>
//   );


return (
    <ChakraProvider>

      <ProfileCard />
      <OverviewCard />
      <CalendarCard />

    </ChakraProvider>
  );
}

export default PatientProfile;
