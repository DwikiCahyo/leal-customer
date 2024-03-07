import {
  Badge,
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  Divider,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "@/public/store-logo.jpg";
import { FiMapPin } from "react-icons/fi";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { formatToIDR } from "@/utils/util";

function isFollowedByUser(followers, userId) {
  if (followers.length === 0) {
    return false;
  }

  for (let i = 0; i < followers.length; i++) {
    if (followers[i].userId === userId) {
      break;
    }
    return false;
  }

  return true;
}

function isStarOwned(user, merchId) {
  for (let i = 0; i < user.followed.length; i++) {
    const followed = user.followed[i].merchantId;
    const idMerch = merchId;

    if (followed === idMerch) {
      const starOwned = user.followed[i].starsOwned;
      return starOwned;
    }
  }
}

export default function Header({ merchant, userId, user }) {
  const followers = merchant.followers;
  const isFollowed = isFollowedByUser(followers, userId);
  const starsOwned = isStarOwned(user, merchant.id);

  return (
    <>
      <Box
        w={{ base: "100%", md: "fit-content" }}
        borderRadius="8px"
        border="1px"
        borderColor="gray.200"
        p="16px"
      >
        <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
          <Box
            overflow="hidden"
            width="100px"
            height="100px"
            borderRadius="50%"
          >
            <Image src={logo} objectFit="cover" alt="store-logo" />
          </Box>
          <Flex
            pl="30px"
            direction={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <Flex direction="column">
              <Text fontWeight="bold" fontSize="20px">
                {merchant.namaMerchant}
              </Text>
              <Badge
                variant="subtle"
                colorScheme="purple"
                w="fit-content"
                borderRadius="5px"
                mt="10px"
              >
                {merchant.kategori}
              </Badge>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="start"
                gap="1"
                mt="10px"
              >
                <FiMapPin width="20px" height="20px" color="purple" />
                <Text fontSize="14px" fontWeight="bold" color="leal.primary">
                  1 = {formatToIDR(merchant.nilaiPin)}
                </Text>
                <Tooltip label="Nilai 1 buah pin pada toko ini adalah Rp.20.000">
                  <span>
                    <HiMiniInformationCircle
                      width="20xp"
                      height="20px"
                      color="gray"
                      opacity="50%"
                    />
                  </span>
                </Tooltip>
              </Box>
              <Flex gap={2} mt="20px">
                {isFollowed ? (
                  <Button
                    variant="solid"
                    bg="leal.primary"
                    textColor="white"
                    w="150px"
                    _hover={{ bg: "orange" }}
                  >
                    Batal Mengikuti
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    bg="leal.primary"
                    textColor="white"
                    w="150px"
                    _hover={{ bg: "orange" }}
                  >
                    Follow
                  </Button>
                )}

                <Button
                  variant="outline"
                  textColor="leal.primary"
                  colorScheme="orange"
                  w="150px"
                >
                  Informasi
                </Button>
              </Flex>
            </Flex>
            <Flex
              alignItems="center"
              marginStart={{ md: "450px" }}
              marginTop={{ base: "30px" }}
              gap="20px"
              height="80px"
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text fontWeight="bold" fontSize="25px">
                  {merchant.followers.length}
                </Text>
                <Text fontWeight="normal" fontSize="16px">
                  Followers
                </Text>
              </Box>
              <Divider orientation="vertical" />
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text fontWeight="bold" fontSize="25px">
                  {merchant.vouchers.length}
                </Text>
                <Text fontWeight="normal" fontSize="16px">
                  Vouchers
                </Text>
              </Box>
              <Divider orientation="vertical" />
              {isFollowed ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Text fontWeight="bold" fontSize="25px" color="orange">
                    {starsOwned}
                  </Text>

                  <Tooltip
                    label={`Jumlah stars yang berhasil anda kumpulkan pada toko ${merchant.namaMerchant}`}
                  >
                    <Text fontWeight="bold" fontSize="16px" color="orange">
                      Stars
                    </Text>
                  </Tooltip>
                </Box>
              ) : (
                <Box display="none" flexDirection="column" alignItems="center">
                  <Text fontWeight="bold" fontSize="25px" color="orange">
                    20
                  </Text>

                  <Tooltip
                    label={`Jumlah stars yang berhasil anda kumpulkan pada toko ${merchant.namaMerchant}`}
                  >
                    <Text fontWeight="bold" fontSize="16px" color="orange">
                      Stars
                    </Text>
                  </Tooltip>
                </Box>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
