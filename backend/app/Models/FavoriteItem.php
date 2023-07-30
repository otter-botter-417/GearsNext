<?php

namespace App\Models;

use App\Exceptions\ItemAlreadyFavoritedException;
use App\Exceptions\ItemNotFavoritedException;
use App\Exceptions\ItemNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class FavoriteItem extends Model
{
    use HasFactory;
    protected $primaryKey = 'favorite_items_id';

    protected $fillable = [
        'user_id',
        'item_id',
    ];

    // リレーション
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }

    // 既にテーブルに追加されているか確認
    /*
    * @param int $userId
    * @param int $itemId
    * @return bool
    */
    public static function alreadyExists($userId, $itemId)
    {
        return self::where('user_id', $userId)
            ->where('item_id', $itemId)
            ->exists();
    }

    /**
     * お気に入りに追加
     *
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する場合にスローされます。
     */
    public static function addFavorite($userFirebaseId, $itemId)
    {
        list($userId, $item) = Item::getUserIdAndItem($userFirebaseId, $itemId);

        if (self::alreadyExists($userId, $itemId)) {
            Log::error(
                'お気に入り追加操作中にエラーが発生',
                [
                    'action' => 'addFavorite',
                    'userId' => $userId,
                    'itemId' => $itemId,
                    'userFirebaseId' => $userFirebaseId
                ]
            );
            throw new ItemAlreadyFavoritedException();
        }

        self::create([
            'user_id' => $userId,
            'item_id' => $item->item_id,
        ]);
    }

    /**
     * お気に入りから削除
     *
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない場合にスローされます。

     */
    public static function removeFavorite($userFirebaseId, $itemId)
    {
        list($userId, $item) = Item::getUserIdAndItem($userFirebaseId, $itemId);

        if (!self::alreadyExists($userId, $itemId)) {
            Log::error(
                'お気に入りから削除操作中にエラーが発生',
                [
                    'action' => 'removeFavorite',
                    'userId' => $userId,
                    'itemId' => $itemId,
                    'userFirebaseId' => $userFirebaseId
                ]
            );
            throw new ItemNotFavoritedException();
        }

        self::where('user_id', $userId)
            ->where('item_id', $item->item_id)
            ->delete();
    }

    /**
     * ユーザーのお気に入り商品を取得
     *
     * @param  string $userFirebaseId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function showFavorite($userFirebaseId)
    {
        $userId = User::getUserIdByFirebaseId($userFirebaseId);
        $favoriteItems = self::where('user_id', $userId)->with(['items'])->get();

        return $favoriteItems;
    }
}
