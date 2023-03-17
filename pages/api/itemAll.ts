import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGDB_URL || "a");

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        await client.connect();

        const itemDatas = await client
          .db("Gears")
          .collection("items")
          .find()
          .toArray();
        console.log(itemDatas);

        res.status(200).json({ success: true, data: itemDatas });
      } catch (error) {
        res.status(400).json({ success: false });
      } finally {
        await client.close();
      }
      break;
  }
}
