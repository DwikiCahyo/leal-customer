import CollectionItem from "@/components/collection/collectionItem";
import { SimpleGrid, Text, Box } from "@chakra-ui/react";

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3000/api/collection");
  const collectionRes = await response.json();
  const collectionData = collectionRes.metadata;

  return {
    props: {
      collection: collectionData,
    },
  };
}

export default function Collection({ collection }) {
  console.log(collection);
  return (
    <Box p="30px">
      <SimpleGrid columns={{ base: 2, sm: 2, md: 6 }}>
        {collection.map((col, index) => (
          <CollectionItem key={index} title={col.name} price={col.price} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
