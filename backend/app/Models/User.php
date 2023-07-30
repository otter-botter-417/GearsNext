<?php

namespace App\Models;

use App\Exceptions\ItemAlreadyFavoritedException;
use App\Exceptions\ItemNotFavoritedException;
use App\Exceptions\UserNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class User extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_id';


    protected $fillable = [
        'user_firebase_id',
        'name',
        'email',
    ];

    public function favorite()
    {
        return $this->hasMany(FavoriteItem::class, 'user_id');
    }

    /**
     * ユーザーIDと商品IDを取得
     *
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @return array
     */
    static function getUserIdAndItem($userFirebaseId, $itemId)
    {
        $userId = self::getUserIdByFirebaseId($userFirebaseId);
        $item = Item::checkIfNotExistThrowError($itemId);
        return [$userId, $item];
    }

    /**
     * firebaseIdからユーザーIDを取得する
     *
     * @param  string $user_firebase_id
     * @return int User ID.
     * @throws UserNotFoundException If user not found.
     */
    public static function getUserIdByFirebaseId($user_firebase_id)
    {
        $user = self::where('user_firebase_id', $user_firebase_id)->first();
        if (!$user) {
            Log::error(
                'firebaseIdからユーザーIDを取得中にエラーが発生',
                [
                    'action' => 'getUserIdByFirebaseId',
                    'userFirebaseId' => $user_firebase_id
                ]
            );
            throw new UserNotFoundException();
        }
        return $user->user_id;
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
    public static function addFavoriteItem($userFirebaseId, $itemId)
    {
        return FavoriteItem::add($userFirebaseId, $itemId);
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
        return FavoriteItem::remove($userFirebaseId, $itemId);
    }

    /**
     * ユーザーのお気に入り商品を取得
     *
     * @param  string $userFirebaseId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getFavoriteItems($userFirebaseId)
    {
        return FavoriteItem::index($userFirebaseId);
    }
}
