import { getFollowedUser, postFollowMerchant } from "@/lib/firebase/service";
import app from "@/lib/firebase/init";
import { getFirestore } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default async function handler(req, res) {
  const db = getFirestore(app);
  if (req.method === "POST") {
    const { userId, merchantId } = req.body;
    try {
      const followed = await postFollowMerchant(db, userId, merchantId);
      if (followed) {
        res.status(200).json({
          status: 200,
          message: "Success add new followed merchant",
        });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        res.status(500).json({ status: 500, message: error });
      }
    }
  }

  if (req.method === "GET") {
    const { userId } = req.body;
    try {
      const followed = await getFollowedUser(db, userId);

      res.status(200).json({
        status: 200,
        message: `Success add get followed merchant by ${userId} `,
        metadata: followed,
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        res.status(500).json({ status: 500, message: error });
      }
    }
  }
}
