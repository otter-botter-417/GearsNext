<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Exceptions\UserNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;
    protected $primaryKey = 'user_id';


    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // 以下のメソッドを追加
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

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
