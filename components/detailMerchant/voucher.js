import { Text, SimpleGrid } from "@chakra-ui/react";
import ItemVouhcer from "./voucherItem";

function isStarOwned(userFollowed, merchId) {
  for (let i = 0; i < userFollowed.followed.length; i++) {
    const followed = userFollowed.followed[i].merchantId;
    const idMerch = merchId;

    if (followed === idMerch) {
      const starOwned = userFollowed.followed[i].starsOwned;
      return starOwned;
    }
  }
}

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

export default function Voucher({
  vouchers,
  userFollowed,
  merchId,
  merchant,
  userId,
}) {
  const starOwn = isStarOwned(userFollowed, merchId);
  const followers = merchant.followers;
  const isFollowed = isFollowedByUser(followers, userId);
  console.log(userFollowed);

  return (
    <>
      {isFollowed ? (
        <SimpleGrid columns={{ base: 1, sm: 1, md: 3 }}>
          {vouchers.map((voucher, index) => {
            let starVocuher = voucher.jumlah_bintang;
            let starOwned = starOwn;
            let list = [];

            for (let i = 1; i <= starVocuher; i++) {
              list.push(i);
            }

            const isVoucherFull =
              starVocuher === starOwned || starOwned > starVocuher
                ? true
                : false;

            return (
              <ItemVouhcer
                key={index}
                name={voucher.nama_voucher}
                subtitle={voucher.voucher_subtitle}
                isVoucherFull={isVoucherFull}
                list={list}
                starOwned={starOwned}
                starVocuher={starVocuher}
                syarat={voucher.syarat}
                merchant={merchant}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <>
          <Text
            textAlign="center"
            mt="20px"
            fontWeight="normal"
            fontSize="25px"
          >
            Silahkan Follow untuk mengakses voucher yang tersedia pada store ini
          </Text>
        </>
      )}
    </>
  );
}
