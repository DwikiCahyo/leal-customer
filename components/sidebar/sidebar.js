import { Box, Text } from "@chakra-ui/react";
import Content from "./content";
import { usePathname } from "next/navigation";
import sidebarIcon1 from "@/public/sidebar_1.svg";
import sidebarIcon2 from "@/public/sidebar_2.svg";
import sidebarIcon3 from "@/public/sidebar_3_.svg";
import sidebarIcon4 from "@/public/sidebar_4.svg";
import { IoLogOutSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

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
  const router = useRouter();

  return (
    <>
      <Box
        w="315px"
        h="650px"
        boxShadow="md"
        borderBottomRadius="10px"
        display={{ base: "none", sm: "none", md: "block" }}
        pr="10px"
      >
        {sidebarContent.map((content) => {
          {
            /* if (content.path !== "/") {
          isActive = pathname.startsWith(content.path);
        }

        isActive = pathname.startsWith(content.path); */
          }
          return (
            <>
              <Content
                key={content.id}
                icon={content.icon}
                title={content.title}
                bg={
                  pathname === content.path
                    ? "linear(to-b, leal.primary, yellow.500)"
                    : ""
                }
                textColor={pathname === content.path ? "white" : "black"}
                href={content.path}
              />
            </>
          );
        })}
        <Box
          mt="70px"
          _hover={{
            bgGradient: "linear(to-b, leal.primary, yellow.500) ",
            textColor: "white",
            cursor: "pointer",
          }}
          borderEndRadius="50px"
          h="60px"
          py="1px"
          px="10px"
          display="flex"
          alignItems="center"
          gap="4"
          onClick={() => signOut()}
        >
          <IoLogOutSharp size="48px" />
          <Text fontWeight="bold" fontSize="24px">
            Log out
          </Text>
        </Box>
      </Box>
    </>
  );
}
