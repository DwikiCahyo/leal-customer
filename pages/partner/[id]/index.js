import Header from "@/components/detailMerchant/header";
import Voucher from "@/components/detailMerchant/voucher";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function getMerchantData(merchantId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/merchant/${merchantId}`
    );

    if (response.ok) {
      const data = await response.json();
      const merchantData = data.metadata;
      return merchantData;
    }
  } catch (error) {
    return error;
  }
}

async function getDataUserByMerchant(merchantId, userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`);
    if (response.ok) {
      const data = await response.json();
      const userData = data.metadata;
      return {
        followed: userData.followed,
      };
    }
  } catch (error) {
    return error;
  }
}

export async function getServerSideProps(context) {
  const { params } = context;

  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }
  const { uid } = session.user;
  const merchantId = params.id;

  const merchant = await getMerchantData(merchantId);
  const user = await getDataUserByMerchant(merchantId, uid);

  return {
    props: {
      userId: uid,
      merchant: merchant,
      user: user,
      vouchers: merchant.vouchers,
    },
  };
}

export default function PartnerDetailPage({
  merchant,
  userId,
  user,
  vouchers,
}) {
  return (
    <Container minW={{ base: "l", md: "8xl" }} p="5px">
      <Box mt="10px">
        <Header merchant={merchant} userId={userId} user={user} />
        <Tabs mt="30px" variant="enclosed" size="md" colorScheme="purple">
          <TabList>
            <Tab>Vouchers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Voucher
                vouchers={vouchers}
                userFollowed={user}
                merchId={merchant.id}
                merchant={merchant}
                userId={userId}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
