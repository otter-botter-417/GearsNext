<?php

namespace App\Models;

use App\Exceptions\ItemAlreadyFavoritedException;
use App\Exceptions\ItemNotFavoritedException;
use App\Exceptions\UserAlreadyRegisteredException;
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
     * 持っている物に追加
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemAlreadyInInventoryException お気に入りに商品が存在する場合にスローされます。
     */
    public static function addInventory($userFirebaseId, $itemId)
    {
        return UserInventory::add($userFirebaseId, $itemId);
    }

    /**
     * 持っている物から削除
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemNotInInventoryException お気に入りに商品が存在しない場合にスローされます。

     */
    public static function removeInventory($userFirebaseId, $itemId)
    {
        return UserInventory::remove($userFirebaseId, $itemId);
    }

    /**
     * ユーザーの持っている商品を取得
     * @param  string $userFirebaseId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getInventoryItems($userFirebaseId)
    {
        return UserInventory::index($userFirebaseId);
    }
}
