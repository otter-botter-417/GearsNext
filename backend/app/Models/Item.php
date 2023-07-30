<?php

namespace App\Models;

use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\ItemAlreadyFavoritedException;
use App\Exceptions\ItemAlreadyRegisteredException;
use App\Exceptions\ItemNotFavoritedException;
use App\Exceptions\ItemNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Item extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_id';

    protected $fillable = [
        'item_name',
        'price',
        'image_name',
        'asin',
        'open_width',
        'open_depth',
        'open_height',
        'storage_width',
        'storage_depth',
        'storage_height',
        'weight',
    ];

    protected $hidden = ['brand_id', 'category_id', 'sub_category_id'];

    // リレーション
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    public function itemTags()
    {
        return $this->belongsToMany(ItemTag::class, 'item_tag_relations', 'item_id', 'item_tag_id');
    }
    public function colorTags()
    {
        return $this->belongsToMany(ItemTag::class, 'color_tag_relations', 'item_id', 'color_tag_id');
    }
    public function itemAttributes()
    {
        return $this->hasMany(ItemAttribute::class, 'item_id');
    }
    public function favoriteItems()
    {
        return $this->hasMany(FavoriteItem::class, 'item_id');
    }

    /**
     * 商品に紐づく情報を取得
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @param  int $categoryId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getItemDataWithRelations($query)
    {
        return $query->with(['brand', 'category', 'subCategory', 'itemTags', 'colorTags', 'itemAttributes'])->get();
    }


    /**
     * @param  int $itemId
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @return \App\Models\Item 商品のインスタンスを返します。
     */
    public static function ensureExists($itemId)
    {
        $item = self::find($itemId);
        if (!$item) {
            Log::error(
                '商品の存在を確認操作中にエラーが発生',
                [
                    'action' => 'itemEnsureExists',
                    'itemId' => $itemId
                ]
            );
            throw new ItemNotFoundException();
        }
        return $item;
    }

    // ユーザーの持っている商品に追加
    public function addInventory($userId)
    {
        UserInventory::create([
            'user_id' => $userId,
            'item_id' => $this->item_id,
        ]);
    }

    /**
     * 商品の閲覧数をインクリメント
     * @param  int $id
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @return void
     */
    public static function viewCountIncrement($id)
    {
        $item = self::ensureExists($id);
        $item->increment('view_count');
    }

    // いいね数をインクリメント
    public function favoriteCountIncrement()
    {
        $this->increment('favorite_count');
        $this->save();
    }

    /**
     * 商品を登録する
     * @param  \Illuminate\Http\Request $request
     * @return void
     * @throws ItemAlreadyRegisteredException 商品が既に登録されている場合にスローされます。
     * @throws BrandNotFoundException ブランドが見つからない場合にスローされます。
     * @throws CategoryNotFoundException カテゴリーが見つからない場合にスローされます。
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合にスローされます。
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合にスローされます。
     * @throws ColorTagNotFoundException カラータグが見つからない場合にスローされます。
     */
    public static function register($request)
    {

        $data = $request['itemDatas'];
        // 既に登録されていればエラー ASINで検索
        if (Item::where('asin', $data['asin'])->exists()) {
            throw new ItemAlreadyRegisteredException();
        }

        $entities = self::ensureBrandAndCategoriesExist($data);

        $data['brand_id'] = $entities['brand']->brand_id;
        $data['category_id'] = $entities['category']->category_id;
        $data['sub_category_id'] = $entities['subCategory']->sub_category_id;

        Item::createItemData($data, $entities);
    }

    /**
     * brand category subcategoryを確認して存在しなければ登録
     * @param  array $data
     * @return array brand category subcategoryのインスタンスを返します。
     * @throws BrandNotFoundException ブランドが見つからない場合にスローされます。
     * @throws CategoryNotFoundException カテゴリーが見つからない場合にスローされます。
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合にスローされます。
     */
    public static function ensureBrandAndCategoriesExist($data)
    {
        $brand = Brand::ensureExists($data['brandName']);
        $category = Category::ensureExists($data['itemCategoryName']);
        $subCategory = SubCategory::ensureExists($data['subCategoryName']);
        return ['brand' => $brand, 'category' => $category, 'subCategory' => $subCategory];
    }


    /**
     * 商品データを登録
     * @param  array $data
     * @return \App\Models\Item
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合にスローされます。
     * @throws ColorTagNotFoundException カラータグが見つからない場合にスローされます。
     */
    public static function createItemData($data, $entities)
    {
        $item = new self;
        $item->item_name = $data['itemName'];
        $item->brand_id = $entities['brand']->brand_id;
        $item->price = $data['price'];
        $item->image_name = $data['imageName'];
        $item->asin = $data['asin'];
        $item->open_width = $data['openWidth'];
        $item->open_depth = $data['openDepth'];
        $item->open_height = $data['openHeight'];
        $item->storage_width = $data['storageWidth'];
        $item->storage_depth = $data['storageDepth'];
        $item->storage_height = $data['storageHeight'];
        $item->weight = $data['weight'];
        $item->category_id = $entities['category']->category_id;
        $item->sub_category_id = $entities['subCategory']->sub_category_id;

        $item->addColorTags($data['colorTags']);
        $item->addItemTags($data['itemTags']);
        $item->addItemAttributes($data['details'], $item->category_id);

        return $item;
    }

    /**
     * 商品のアイテムタグを登録
     * @param  array $tagNames
     * @return void
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合にスローされます。
     */
    public function addItemTags($itemTagNames)
    {
        foreach ($itemTagNames as $itemTagName) {
            $itemTag = ItemTag::ensureExists($itemTagName);
            $this->itemTags()->attach($itemTag->item_tag_id);
        }
    }

    /**
     * 商品のカラータグを登録
     * @param  array $colorNames
     * @return void
     * @throws ColorTagNotFoundException カラータグが見つからない場合にスローされます。
     */
    public function addColorTags($colorTagNames)
    {
        foreach ($colorTagNames as $colorTagName) {
            $colorTag = ColorTag::ensureExists($colorTagName);
            $this->colorTags()->attach($colorTag->color_tag_id);
        }
    }

    /**
     * 商品の詳細を登録
     * @param  array $details
     * @param  int $categoryId
     * @return void
     */
    public function addItemAttributes($details, $categoryId)
    {
        foreach ($details as $attributeName => $attributeValue) {
            $this->itemAttributes()->create([
                'category_id' => $categoryId,
                'attribute_name' => $attributeName,
                'attribute_value' => $attributeValue
            ]);
        }
    }

    /**
     * 商品の詳細な情報を取得
     * @param  int $id
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @return \Illuminate\Database\Eloquent\Collection 商品の詳細を返します。
     */
    public static function getItemDetails($id)
    {
        $item = self::ensureExists($id);
        $itemData = self::getItemDataWithRelations($item);

        return $itemData;
    }

    /**
     * 商品を検索して返す
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Database\Eloquent\Collection 商品の詳細を返します。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws CategoryNotFoundException カテゴリーが見つからない場合にスローされます。
     */
    public static function getItems($request)
    {
        // requestにcategorynameが入っていればカテゴリーで検索
        if ($request->has('categoryname')) {
            $category = Category::where('category_name', $request->get('categoryname'))->first();

            if (!$category) {
                Log::error(
                    '商品の検索操作中にエラーが発生',
                    [
                        'action' => 'getItems',
                        'request' => $request
                    ]
                );
                throw new CategoryNotFoundException();
            }

            $items = self::getItemDataWithRelations($category->items());
            return $items;
        }

        //カテゴリーが入ってなければ全件渡す
        $allItems = self::query();
        $items = self::getItemDataWithRelations($allItems);
        return $items;
    }
}
