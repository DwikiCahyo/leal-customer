import CardMerchant from "./cardMerchant";
import { SimpleGrid, Text } from "@chakra-ui/react";

export default function Following({ data }) {
  const followingMerchant = data;
  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 4 }} spacing={2}>
      {followingMerchant.map((merchant, index) => (
        <CardMerchant
          key={merchant.merchantData.id}
          city={merchant.merchantData.kabupaten}
          prov={merchant.merchantData.provinsi}
          voucher={
            merchant.merchantData.vouchers
              ? merchant.merchantData.vouchers.length
              : 0
          }
          name={merchant.merchantData.namaMerchant}
          alamat={merchant.merchantData.alamat}
        />
      ))}
    </SimpleGrid>
  );
}
