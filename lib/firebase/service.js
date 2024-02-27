import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { query, where } from "firebase/firestore";

async function getNestedData(db, collection1, id, collection2) {
  const collections = collection(db, collection1, id, collection2);
  const collectionSnapshot = await getDocs(collections);
  const collectionList = collectionSnapshot.docs.map((collection) =>
    collection.data()
  );
  return collectionList;
}

export async function getCollections(db) {
  const collections = collection(db, "collections");
  const collectionSnapshot = await getDocs(collections);
  const collectionList = collectionSnapshot.docs.map((collection) =>
    collection.data()
  );
  return collectionList;
}

export async function getUserMerchant(db) {
  const userMerchant = collection(db, "user_merchant");
  const userMerchantSnapshot = await getDocs(userMerchant);

  const userMerchantListPromise = userMerchantSnapshot.docs.map(
    async (merchant) => {
      return {
        id: merchant.data().id,
        idMerchant: merchant.data().idMerchant,
        kategori: merchant.data().kategori,
        namaMerchant: merchant.data().namaMerchant,
        provinsi: merchant.data().provinsi,
        kabupatenKota: merchant.data().kabupaten,
        alamat: await getNestedData(
          db,
          "user_merchant",
          merchant.data().id,
          "alamat"
        ),
        vouchers: await getNestedData(
          db,
          "user_merchant",
          merchant.data().id,
          "vouchers"
        ),
        followers: await getNestedData(
          db,
          "user_merchant",
          merchant.data().id,
          "followers"
        ),
      };
    }
  );

  const userMerchantList = Promise.all(userMerchantListPromise);
  return userMerchantList;
}

export async function getUserMerchantById(db, id) {
  const q = query(collection(db, "user_merchant"), where("id", "==", id));

  const merchantSnapshot = await getDocs(q);
  const userMerchantList = merchantSnapshot.docs.map(async (merchant) => {
    return {
      ...merchant.data(),
      alamat: await getNestedData(
        db,
        "user_merchant",
        merchant.data().id,
        "alamat"
      ),
      vouchers: await getNestedData(
        db,
        "user_merchant",
        merchant.data().id,
        "vouchers"
      ),
    };
  });

  const userMerchantListPromise = Promise.all(userMerchantList);

  return userMerchantListPromise;
}

export async function getUserById(db, id) {
  const q = query(collection(db, "user"), where("userID", "==", id));
  const userSnapshot = await getDocs(q);
  const userList = userSnapshot.docs.map(async (user) => {
    return {
      ...user.data(),
      collections: await getNestedData(
        db,
        "user",
        user.data().userID,
        "Collections"
      ),
      followed: await getNestedData(db, "user", user.data().userID, "Followed"),
      rewards: await getNestedData(db, "user", user.data().userID, "Rewards"),
    };
  });

  const userListPromises = await Promise.all(userList);
  return userListPromises;
}

export async function getFollowedUser(db, userId) {
  const followed = collection(db, `user/${userId}/Followed`);
  const followedSnapshot = await getDocs(followed);
  const followedList = followedSnapshot.docs.map((collection) =>
    collection.data()
  );
  return followedList;
}

export async function postFollowMerchant(db, userId, merchantId) {
  const userData = await getUserById(db, userId);
  const userMerchant = await getUserMerchantById(db, merchantId);
  const {
    id,
    idMerchant,
    kategori,
    namaMerchant,
    provinsi,
    kabupaten,
    alamat,
    vouchers,
  } = userMerchant[0];

  const userFollow = await setDoc(
    doc(db, `user/${userId}/Followed`, merchantId),
    {
      merchantId: merchantId,
      numberOfTransaction: 0,
      merchantData: {
        id: id,
        merchantId: idMerchant,
        kategori: kategori,
        namaMerchant: namaMerchant,
        provinsi: provinsi,
        kabupaten: kabupaten,
        alamat: alamat,
        vouchers: vouchers,
      },
      starsOwned: 0,
      totalSpent: 0,
      vouchersRedeemed: 0,
    }
  );

  const merchantFollowers = await setDoc(
    doc(db, `user_merchant/${merchantId}/followers`, userId),
    {
      userId: userId,
      name: userData[0].nama,
      email: userData[0].email,
    }
  ).catch((error) => console.log(error));

  return {
    userFollow,
    merchantFollowers,
  };
}
