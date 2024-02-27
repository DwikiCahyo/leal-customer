import app from "@/lib/firebase/init";
import { getCollections } from "@/lib/firebase/service";
import { getFirestore } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const db = getFirestore(app);
    const collections = await getCollections(db);
    res.status(200).json({
      status: 200,
      message: "Success get collection data",
      metadata: collections,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      res
        .status(500)
        .json({ status: 500, message: "Error get data from collection" });
    }
  }
}
