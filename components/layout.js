import Navbar from "./navbar";
import Sidebar from "./sidebar/sidebar";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Box w="100%" display="flex" flexDirection="row">
        <Sidebar />
        <Box w="full">{children}</Box>
      </Box>
    </>
  );
}
