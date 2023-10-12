import * as yup from 'yup';

// 共通のバリデーションルール
const requiredString = yup.string().required('この項目は必須です。');
const requiredNumber = yup.number().typeError('数字を入力してください。').required('この項目は必須です。');

/**
 * 商品情報のバリデーションスキーマ
 */
export const AddNewItemValidatedSchema = yup.object().shape({
  // 基本情報
  itemName: requiredString.label('商品名'),
  asin: requiredString.test(
    'len',
    'ASINは正確に10桁である必要があります',
    (val) => (val ? val.length === 10 : false),
  ),
  price: requiredNumber.positive('価格は正の数である必要があります。'),
  brandName: requiredString.label('ブランド名'),
  itemCategoryName: requiredString.label('カテゴリ名'),
  itemSubCategoryName: requiredString.label('サブカテゴリ名'),

  // サイズ情報
  openWidth: requiredNumber.label('幅'),
  openDepth: requiredNumber.label('長さ'),
  openHeight: requiredNumber.label('高さ'),
  storageWidth: requiredNumber.label('収納幅'),
  storageDepth: requiredNumber.label('収納長さ'),
  storageHeight: requiredNumber.label('収納高さ'),
  weight: requiredNumber.label('重量'),

  // 任意項目
  itemTags: yup.array().of(yup.string()).label('タグ').notRequired(),
  colorTags: yup.array().of(yup.string()).label('色').notRequired(),
});
