import Following from "@/components/partner/following";
import Recommended from "@/components/partner/recomended";
import {
  Tabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const tabTitle = ["Recommended", "Following"];

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const userId = session.user.uid;
  let recommend = [];

  try {
    const responseMerch = await fetch("http://localhost:3000/api/merchant");
    const responseFollowedMerch = await fetch(
      `http://localhost:3000/api/user-followed/${userId}`
    );

    //recommended merchant
    const merchants = await responseMerch.json();
    const listRecommendedMerchant = merchants.metadata;
    listRecommendedMerchant.forEach((data) => {
      const followers = data.followers;
      if (followers.length < 1) {
        recommend = [...recommend, data];
      } else {
        followers.forEach((foll) => {
          if (foll.userId !== userId) {
            recommend = [...recommend, data];
          }
        });
      }
    });

    //following merchant
    const following = await responseFollowedMerch.json();
    const listFollowingMerchant = following.metadata;

    return {
      props: {
        listRecommendedMerchant: recommend,
        listFollowingMerchant,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Home({
  listRecommendedMerchant,
  listFollowingMerchant,
}) {
  return (
    <Box px="20px" pt="20px">
      <Tabs colorScheme="purple" variant="soft-rounded">
        <TabList>
          {tabTitle.map((tab, index) => (
            <Tab key={index}>{tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel
            display={{ base: "flex", md: "block" }}
            justifyContent="center"
          >
            <Recommended data={listRecommendedMerchant} />
          </TabPanel>
          <TabPanel
            display={{ base: "flex", md: "block" }}
            justifyContent="center"
          >
            <Following data={listFollowingMerchant} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
