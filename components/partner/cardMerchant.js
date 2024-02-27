import {
  Box,
  Text,
  Flex,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Stack,
  StackDivider,
  Heading,
  Badge,
} from "@chakra-ui/react";
import Image from "next/image";
import sampleImage from "@/public/store.jpg";

export default function CardMerchant({ city, prov, voucher, name, alamat }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w="310px"
        _hover={{ cursor: "pointer" }}
        mb={{ base: "14px", sm: "5px" }}
      >
        <Box borderRadius="10px" overflow="hidden">
          <Image
            src={sampleImage}
            alt="image-merchant"
            width="100%"
            objectFit="cover"
          />
        </Box>
        <Box mt="10px">
          <Flex justifyContent="space-between">
            <Text fontWeight="normal" fontSize="16px">
              {city}, {prov}
            </Text>
            <Text fontWeight="normal" fontSize="14px" textColor="leal.primary">
              {voucher} Voucher Tersedia
            </Text>
          </Flex>
          <Text fontWeight="bold" fontSize="16px" mt="5px">
            {name}
          </Text>
          <Button variant="link" color="leal.primary" mt="8px" onClick={onOpen}>
            Cabang Lainnya
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Stack divider={<StackDivider />} spacing="3" px="2px" py="4px">
              {alamat.map((data, index) => (
                <Box key={index + 1}>
                  <Heading size="s" textTransform="uppercase">
                    {data.namaTempat}
                  </Heading>
                  <Badge mt="1" borderRadius="3px" p="1" colorScheme="purple">
                    {data.jamBuka} - {data.jamTutup}
                  </Badge>
                  <Text pt="1" fontSize="sm">
                    {data.alamat}
                  </Text>
                </Box>
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
