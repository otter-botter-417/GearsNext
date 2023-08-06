<?php

namespace App\Models;

use App\Models\Item;
use App\Exceptions\ItemAlreadyInInventoryException;
use App\Exceptions\ItemNotInInventoryException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;



class UserInventory extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_inventories_id';

    protected $fillable = [
        'user_id',
        'item_id',
    ];

    // リレーション
    public function items()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }

    /*
    * 持っている物に商品が存在するか確認
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
     * 持っている物に追加
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemAlreadyInInventoryException 持っている物に商品が存在する場合にスローされます。
     */
    public static function add($userFirebaseId, $itemId)
    {
        list($userId, $item) = User::getUserIdAndItem($userFirebaseId, $itemId);

        if (self::alreadyExists($userId, $item->item_id)) {
            Log::error(
                '持っている物追加操作中にエラーが発生',
                [
                    'action' => 'addInventory',
                    'userId' => $userId,
                    'itemId' => $item->item_id,
                ]
            );
            throw new ItemAlreadyInInventoryException();
        }

        self::create([
            'user_id' => $userId,
            'item_id' => $item->item_id,
        ]);
    }

    /**
     * 持っている物から削除
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemNotInInventoryException 持っている物に商品が存在しない場合にスローされます。

     */
    public static function remove($userFirebaseId, $itemId)
    {
        list($userId, $item) = User::getUserIdAndItem($userFirebaseId, $itemId);

        if (!self::alreadyExists($userId, $item->item_id)) {
            Log::error(
                '持っている物から削除操作中にエラーが発生',
                [
                    'action' => 'removeInventory',
                    'userId' => $userId,
                    'itemId' => $item->item_id,
                    'userFirebaseId' => $userFirebaseId
                ]
            );
            throw new ItemNotInInventoryException();
        }

        self::where('user_id', $userId)
            ->where('item_id', $item->item_id)
            ->delete();
    }

    /**
     * ユーザーの持っている物商品を取得
     * @param  string $userFirebaseId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function index($userFirebaseId)
    {
        $userId = User::getUserIdByFirebaseId($userFirebaseId);
        $InventoryItems = self::where('user_id', $userId)->with(['items'])->get();

        return $InventoryItems;
    }
}
