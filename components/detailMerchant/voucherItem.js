import {
  Box,
  HStack,
  Text,
  Stack,
  SimpleGrid,
  Grid,
  GridItem,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  OrderedList,
  ListItem,
  ModalFooter,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "@/public/store-logo.jpg";
import { formatToIDR } from "@/utils/util";

export default function ItemVouhcer({
  name,
  subtitle,
  isVoucherFull,
  list,
  starOwned,
  starVocuher,
  syarat,
  merchant,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box w={{ base: "100%", md: "400px" }} mb="30px">
        <Box
          display="flex"
          height="100px"
          border="1px"
          borderColor="leal.primary"
          px="15px"
          py="8px"
          borderRadius="10px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box overflow="hidden" height="50px" width="50px" borderRadius="50%">
            <Image
              src={logo}
              height="50px"
              width="50px"
              objectFit="cover"
              alt="logo-store"
            />
          </Box>
          <Stack>
            <Text textAlign="center" fontWeight="bold" fontSize="16px">
              {name}
            </Text>
            <Text textAlign="center">{subtitle}</Text>
          </Stack>
          <Button colorScheme="blue" variant="ghost" onClick={onOpen}>
            T&C
          </Button>
        </Box>
        <Button
          w="100%"
          bg="leal.primary"
          color="white"
          position="relative"
          top="-20px"
          mt="10px"
          display={isVoucherFull ? "block" : "none"}
        >
          Claim
        </Button>
        {isVoucherFull ? (
          <Text fontSize="15px" color="orange" fontWeight="medium">
            Selamat anda telah berhasil mengumpulkan star untuk voucher ini!
          </Text>
        ) : (
          <Text fontSize="15px" mt="5px">
            Kumpulkan {starVocuher - starOwned} Star lagi atau transaksi{" "}
            {formatToIDR((starVocuher - starOwned) * merchant.nilaiPin)}
          </Text>
        )}

        <Grid
          templateColumns={`repeat(${starVocuher},1fr)`}
          gap="2px"
          width={{ base: "100%" }}
          mt="10px"
          display={isVoucherFull ? "none" : "grid"}
        >
          {list.map((data) => {
            if (data < starOwned || data === starOwned) {
              return (
                <GridItem
                  key={data}
                  width="100%"
                  height="15px"
                  bg="leal.primary"
                  borderRadius="5px"
                />
              );
            }
            return (
              <GridItem
                key={data}
                width="100%"
                height="15px"
                bg="orange"
                borderRadius="5px"
              />
            );
          })}
        </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered voucher>
        <ModalOverlay />
        <ModalContent py="20px">
          <ModalHeader textAlign="center" fontWeight="bold">
            Syarat dan Ketentuan Voucher
          </ModalHeader>
          <ModalBody>
            <OrderedList>
              {syarat.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </OrderedList>
          </ModalBody>
          <ModalFooter>
            <Button bg="orange" textColor="white" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
