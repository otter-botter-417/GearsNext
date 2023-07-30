<?php

namespace App\Models;

use App\Exceptions\ItemTagNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class ItemTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'item_tag_name'
    ];

    // 
    /**
     * @param  string $itemTagName
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合にスローされます。
     * @return \App\Models\ItemTag アイテムタグのインスタンスを返します。
     */
    public static function ensureExists($itemTagName)
    {
        $itemTag = self::where('item_tag_name', $itemTagName)->first();
        if (!$itemTag) {
            Log::error(
                'アイテムタグの存在を確認操作中にエラーが発生',
                [
                    'action' => 'itemTagEnsureExists',
                    'itemTagName' => $itemTagName
                ]
            );
            throw new ItemTagNotFoundException($itemTagName);
        }
        return $itemTag;
    }
}
