import CardMerchant from "./cardMerchant";
import { SimpleGrid } from "@chakra-ui/react";

export default function Recommended({ data }) {
  return (
    <SimpleGrid columns={{ base: "1", sm: "1", md: "4", lg: "4" }} spacing={1}>
      {data.map((merchant, index) => (
        <CardMerchant
          id={merchant.id}
          key={index + 1}
          city={merchant.kabupatenKota}
          prov={merchant.provinsi}
          voucher={merchant.vouchers ? merchant.vouchers.length : 0}
          name={merchant.namaMerchant}
          alamat={merchant.alamat}
        />
      ))}
    </SimpleGrid>
  );
}
