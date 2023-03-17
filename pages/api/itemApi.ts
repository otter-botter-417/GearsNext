import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
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
        console.log(req.query);
        await client.connect();
        const key = Object.keys(req.query)[0];
        if (key === "_id") {
          const id = req.query._id as string;
          const objectId = new ObjectId(id);
          const query = { _id: objectId };
          const itemDatas = await client
            .db("Gears")
            .collection("items")
            .find(query)
            .toArray();
          res.status(200).json({ success: true, data: itemDatas });
        } else {
          const itemDatas = await client
            .db("Gears")
            .collection("items")
            .find(req.query)
            .toArray();
          res.status(200).json({ success: true, data: itemDatas });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      } finally {
        await client.close();
      }
      break;

    case "POST":
      try {
        await client.connect();

        const db = client.db("Gears");
        const collection = db.collection("items");
        await collection.insertOne(req.body);
        res.status(200).json({ message: "商品データを追加しました。" });
      } catch (error) {
        res.status(400).json({ success: false });
      } finally {
        await client.close();
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
