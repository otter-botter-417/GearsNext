export type DetailList = { name: string; label: string }[];

type DetailLists = {
    'テント': DetailList;
    'タープ': DetailList;
    'チェア': DetailList;
    'ランタン': DetailList;
    'テーブル': DetailList;
    '寝袋': DetailList;
    'マット': DetailList;
    'コット': DetailList;
    'ストーブ': DetailList;
};

// 共通フィールドを定義。各カテゴリーで共通して使用される項目。
const COMMON_FIELDS = [
    { name: 'fabrics', label: '素材' },
];

// DETAIL_LISTS 定数を定義。各カテゴリーに応じた詳細項目を持つ。
export const DETAIL_LISTS: DetailLists = {
    テント: [
        { name: "capacity", label: "収容人数" },
        { name: "innerTent", label: "インナーテント" },
        { name: "grandSheet", label: "グランドシート" },
        ...COMMON_FIELDS,
    ],
    タープ: [
        { name: "capacity", label: "収容人数" },
        ...COMMON_FIELDS
    ],
    チェア: [
        { name: "seatHeight", label: "座面高さ" },
        { name: "reclining", label: "リクライニング" },
        ...COMMON_FIELDS
    ],
    ランタン: [
        { name: "fuelType", label: "燃料" },
        { name: "intensity", label: "光量" },
        { name: "runLength", label: "連続点灯時間" },
        { name: "batteryCapacity", label: "バッテリー容量" },
        { name: "chargingTime", label: "充電時間" },
        ...COMMON_FIELDS
    ],
    テーブル: [
        { name: "heightAdjustment", label: "高さ調節" },
        { name: "capacity", label: "耐荷重" },
        ...COMMON_FIELDS
    ],
    寝袋: [
        { name: "capacity", label: "収容人数" },
        { name: "fillPower", label: "フィルパワー" },
        { name: "comfortTemp", label: "快適温度" },
        { name: "limitTemp", label: "限界温度" },
        { name: "lowerTemp", label: "下限温度" },
        { name: "materials", label: "中綿素材" },
        ...COMMON_FIELDS
    ],
    マット: [
        { name: "capacity", label: "人数" },
        { name: "thickness", label: "厚さ" },
        { name: "insulation", label: "R値,断熱性" },
        ...COMMON_FIELDS
    ],
    コット: [
        { name: "capacity", label: "人数" },
        { name: "assembly", label: "組み立て" },
        { name: "loadCapacity", label: "耐荷重" },
        ...COMMON_FIELDS
    ],
    ストーブ: [
        { name: "tankCapacity", label: "タンク容量" },
        { name: "runLength", label: "連続運転時間" },
        { name: "heatingOutput", label: "暖房出力" },
        ...COMMON_FIELDS
    ],
    // その他のカテゴリーもここに追加できます
};
