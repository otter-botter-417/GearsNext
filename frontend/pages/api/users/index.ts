// pages/api/users/index.js

export default function handler(req: any, res: any) {
  // データの取得や処理を行う
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    // ...
  ];

  // データをJSON形式で返す
  res.status(200).json(users);
}
