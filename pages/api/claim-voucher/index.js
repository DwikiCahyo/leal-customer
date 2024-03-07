import { getFirestore } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import app from "@/lib/firebase/init";
import { postClaimVoucher } from "@/lib/firebase/service";

export default async function handler(req, res) {
  const db = getFirestore(app);

  if (req.method === "POST") {
    const { userId, voucherId, merchantId, starOwned, voucherPin } = req.body;
    try {
      if (starOwned < voucherPin) {
        res.status(200).json({
          status: 200,
          message:
            "Star is not enough to claim voucher, Please transaction more!",
        });
      }

      const claimedVoucher = await postClaimVoucher(
        db,
        voucherId,
        userId,
        voucherPin,
        merchantId,
        starOwned
      );

      if (claimedVoucher) {
        res.status(200).json({
          status: 200,
          message: `Success claim voucher ${voucherId}`,
        });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
        res.status(500).json({ status: 500, message: error });
      }
    }
  }
}
