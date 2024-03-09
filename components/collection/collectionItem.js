import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import sample from "@/public/store-logo.jpg";

export default function CollectionItem({ title, price, image }) {
  return (
    <>
      <Box
        width="160px"
        height="180px"
        boxShadow="base"
        borderRadius="24px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb="20px"
      >
        <Box overflow="hidden" width="100px" height="100px" borderRadius="50%">
          <Image
            src={sample}
            objectFit="cover"
            alt="store-logo"
            width="100px"
            height="100px"
          />
        </Box>
        <Text
          fontWeight="bold"
          textColor="leal.primary"
          fontSize="16px"
          mt="10px"
        >
          {title}
        </Text>
        <Text fontWeight="bold" color="orange" fontSize="16px" mt="5px">
          {price}
        </Text>
      </Box>
    </>
  );
}
