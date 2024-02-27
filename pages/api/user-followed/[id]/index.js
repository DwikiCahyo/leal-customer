import { getFollowedUser } from "@/lib/firebase/service";
import app from "@/lib/firebase/init";
import { getFirestore } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default async function handler(req, res) {
  const db = getFirestore(app);

  const { id } = req.query;

  try {
    const followed = await getFollowedUser(db, id);
    res.status(200).json({
      status: 200,
      message: `Success add get followed merchant by ${id} `,
      metadata: followed,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error);
      res.status(500).json({ status: 500, message: error });
    }

    res.status(500).json({ status: 500, message: "Error to get data" });
  }
}
