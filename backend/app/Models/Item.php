<?php

namespace App\Models;

use App\Exceptions\ItemAlreadyFavoritedException;
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

    // APIレスポンスから除外する属性
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

    // カテゴリーに関連するアイテムを取得
    public static function getItemDataWithRelations($query)
    {
        return $query->with(['brand', 'category', 'subCategory', 'itemTags', 'colorTags', 'itemAttributes'])->get();
    }


    /**
     * 商品が存在するかチェックして、存在しなければエラーを投げる
     * @param  int $itemId
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @return \App\Models\Item 商品のインスタンスを返します。
     */
    public static function checkIfNotExistThrowError($itemId)
    {
        $item = self::find($itemId);
        if (!$item) {
            Log::error(
                '商品の存在を確認操作中にエラーが発生',
                [
                    'action' => 'checkIfNotExistThrowError',
                    'itemId' => $itemId
                ]
            );
            throw new ItemNotFoundException($itemId);
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
        $item = self::checkIfNotExistThrowError($id);
        $item->increment('view_count');
    }

    // いいね数をインクリメント
    public function favoriteCountIncrement()
    {
        $this->increment('favorite_count');
        $this->save();
    }

    // 商品データを登録
    public static function createItemData($data)
    {
        $item = new self;
        $item->item_name = $data['itemDatas']['itemName'];
        $item->brand_id = $data->brand_id;
        $item->price = $data['itemDatas']['price'];
        $item->image_name = $data['itemDatas']['imageName'];
        $item->asin = $data['itemDatas']['asin'];
        $item->open_width = $data['itemDatas']['openWidth'];
        $item->open_depth = $data['itemDatas']['openDepth'];
        $item->open_height = $data['itemDatas']['openHeight'];
        $item->storage_width = $data['itemDatas']['storageWidth'];
        $item->storage_depth = $data['itemDatas']['storageDepth'];
        $item->storage_height = $data['itemDatas']['storageHeight'];
        $item->weight = $data['itemDatas']['weight'];
        $item->category_id = $data->category_id;
        $item->sub_category_id = $data->sub_category_id;

        $item->save();

        $item->addColorTags($data['colorTags']);
        $item->addItemTags($data['itemTags']);
        $item->addItemAttributes($data['details']);

        return $item;
    }

    // 商品のカラータグを登録
    public function addColorTags($colorNames)
    {
        foreach ($colorNames as $colorName) {
            $color = ColorTag::where('color_name', $colorName)->first();
            if ($color) {
                $this->colorTags()->attach($color->color_tag_id);
            }
        }
    }

    // 商品のアイテムタグを登録
    public function addItemTags($tagNames)
    {
        foreach ($tagNames as $tagName) {
            $tag = ItemTag::where('item_tag_name', $tagName)->first();
            if ($tag) {
                $this->itemTags()->attach($tag->item_tag_id);
            }
        }
    }

    // 商品の詳細を登録
    public function addItemAttributes($details)
    {
        if (is_array($details)) {
            foreach ($details as $attributeName => $attributeValue) {
                $this->itemAttributes()->create([
                    'attribute_name' => $attributeName,
                    'attribute_value' => $attributeValue
                ]);
            }
        }
    }
}
