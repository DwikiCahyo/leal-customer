import { getUserById, getUserMerchantById } from "@/lib/firebase/service";
import app from "@/lib/firebase/init";
import { getFirestore } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default async function handler(req, res) {
  const { id } = req.query;
  const db = getFirestore(app);

  try {
    const user = await getUserById(db, id);
    return Promise.all(user)
      .then((data) => {
        res.status(200).json({
          status: 200,
          message: `Success get user by id : ${id}`,
          metadata: data[0],
        });
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
        .json({ status: 500, message: "Error get data from user" });
    }
  }
}
