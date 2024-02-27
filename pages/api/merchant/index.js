import app from "@/lib/firebase/init";
import { getUserMerchant } from "@/lib/firebase/service";
import { getFirestore } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const db = getFirestore(app);
    const merchants = await getUserMerchant(db);
    return Promise.all(merchants)
      .then((data) => {
        const list = data.map((data) => {
          return {
            ...data,
          };
        });
        res
          .status(200)
          .json({
            status: 200,
            message: "Success get merchant data",
            metadata: list,
            total: list.length,
          })
          .end();
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: error,
        });
      });
  } catch (error) {
    if (error instanceof FirebaseError) {
      res
        .status(500)
        .json({ status: 500, message: "Error get data from merchant" });
    }
  }
}
