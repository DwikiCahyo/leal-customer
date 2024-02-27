import { Box, Text } from "@chakra-ui/react";
import Content from "./content";
import { usePathname } from "next/navigation";
import sidebarIcon1 from "@/public/sidebar_1.svg";
import sidebarIcon2 from "@/public/sidebar_2.svg";
import sidebarIcon3 from "@/public/sidebar_3_.svg";
import sidebarIcon4 from "@/public/sidebar_4.svg";

const sidebarContent = [
  {
    id: 1,
    icon: sidebarIcon1,
    title: "Partners",
    path: "/",
  },
  {
    id: 2,
    icon: sidebarIcon2,
    title: "Collection",
    path: "/collection",
  },
  {
    id: 3,
    icon: sidebarIcon3,
    title: "Notification",
    path: "/notification",
  },
  {
    id: 4,
    icon: sidebarIcon4,
    title: "Profile",
    path: "/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      w="315px"
      h="650px"
      boxShadow="md"
      borderBottomRadius="10px"
      display={{ base: "none", sm: "none", md: "block" }}
      pr="10px"
    >
      {sidebarContent.map((content) => {
        const isActive = pathname.startsWith(content.path);
        return (
          <Content
            key={content.id}
            icon={content.icon}
            title={content.title}
            bg={isActive ? "linear(to-b, leal.primary, yellow.500)" : ""}
            textColor={isActive ? "white" : "black"}
            href={content.path}
          />
        );
      })}
    </Box>
  );
}
