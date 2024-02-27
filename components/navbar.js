import { Box } from "@chakra-ui/react";
import Image from "next/image";
import lealLogo from "@/public/LOGO.svg";

export default function Navbar() {
  return (
    <>
      <Box
        w="100%"
        h="100px"
        display="flex"
        justifyContent="center"
        boxShadow="md"
      >
        <Image src={lealLogo} alt="leal-logo" width={170} />
      </Box>
    </>
  );
}
