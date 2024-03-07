import { Box, Card, Center, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import imageProfile from "@/public/user-profile.jpg";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <Box w="100%" py="30px">
      <Text>Profile Page</Text>
    </Box>
  );
}
