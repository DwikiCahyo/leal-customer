import React from "react";
import FormLogin from "@/components/formLogin";
import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import lealLogo from "@/public/LOGO.svg";

export default function LoginPage() {
  return (
    <main>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minH="100vh"
        alignItems="center"
        boxShadow="l"
        bgGradient="linear(to-b, leal.primary, yellow.500)"
      >
        <FormLogin />
      </Box>
    </main>
  );
}
