import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import sidebar_1 from "@/public/sidebar_1.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Content({ icon, title, bg, textColor, href }) {
  return (
    <Link href={href}>
      <Box
        _hover={{
          bgGradient: "linear(to-b, leal.primary, yellow.500) ",
          textColor: "white",
          cursor: "pointer",
        }}
        borderEndRadius="50px"
        bgGradient={bg}
        h="60px"
        py="1px"
        px="10px"
        display="flex"
        alignItems="center"
        gap="4"
        marginTop="10px"
      >
        <Image
          src={icon}
          alt="sidebar-content-image"
          width="auto"
          height="auto"
        />
        <Text fontWeight="bold" fontSize="24px" textColor={textColor}>
          {title}
        </Text>
      </Box>
    </Link>
  );
}
