import { getUserMerchantById } from "@/lib/firebase/service";
import app from "@/lib/firebase/init";
import { getFirestore } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default async function handler(req, res) {
  const { id } = req.query;
  const db = getFirestore(app);
  try {
    const merchants = await getUserMerchantById(db, id);
    return Promise.all(merchants)
      .then((data) => {
        const list = data.map(
          ({ password, alamatOutlet, alamatOutlet2, ...data }) => {
            return {
              ...data,
            };
          }
        );

        if (list.length <= 0) {
          res
            .status(200)
            .json({ status: 200, message: `merchant with id ${id} not found` });
        }
        res
          .status(200)
          .json({
            status: 200,
            message: `Success get merchant data merchant with id : ${id}`,
            metadata: list[0],
          })
          .end();
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: `Error fetching data from database : ${error}`,
        });
      });
  } catch (error) {
    console.log(error);
    if (error instanceof FirebaseError) {
      res
        .status(500)
        .json({ status: 500, message: "Error get data from merchant" });
    }
  }
}
