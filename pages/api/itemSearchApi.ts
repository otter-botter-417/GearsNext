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
        const priceLimit =
          typeof req.query.price === "string"
            ? JSON.parse(req.query.price).map((x: string) => parseInt(x))
            : [0, 1000000];

        delete req.query.price;
        const priceLimitSearch = {
          price: {
            $gte: parseInt(priceLimit[0]),
            $lte: parseInt(priceLimit[1]),
          },
        };
        const newObj = Object.assign({}, req.query, priceLimitSearch);
        await client.connect();
        console.log(newObj);
        const itemDatas = await client
          .db("Gears")
          .collection("items")
          .find(newObj)
          .toArray();
        // console.log(itemDatas);
        res.status(200).json({ success: true, data: itemDatas });
      } catch (error) {
        res.status(400).json({ success: false });
      } finally {
        await client.close();
      }
      break;
  }
}
