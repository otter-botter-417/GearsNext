<?php

namespace App\Models;

use App\Exceptions\ColorTagNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class ColorTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'color_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'color_tag_name'
    ];


    /**
     * 商品とカラータグの関係を定義
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function colorTags()
    {
        // return $this->belongsToMany(ColorTagRelation::class, 'color_tag_relations', 'item_id', 'color_tag_id');
        return $this->belongsToMany(ColorTagRelation::class, 'color_tag_relations', 'item_id', 'color_tag_id');
    }


    // 
    /**
     * カラータグの存在を確認
     * @param  string $colorTagName
     * @throws colorTagNotFoundException カラータグが見つからない場合にスローされます。
     * @return \App\Models\colorTag カラータグのインスタンスを返します。
     */
    public static function ensureExists($colorTagName)
    {
        $colorTag = self::where('color_tag_name', $colorTagName)->first();

        if (!$colorTag) {;
            Log::error(
                'カラータグの存在を確認操作中にエラーが発生',
                [
                    'action' => 'colorTagEnsureExists',
                    'colorTagName' => $colorTagName
                ]
            );
            throw new ColorTagNotFoundException($colorTagName);
        }

        return $colorTag;
    }

    /**
     * 商品のカラータグを登録
     * @param  array $colorNames
     * @param  int $item_id
     * @return void
     * @throws ColorTagNotFoundException カラータグが見つからない場合にスローされます。
     */
    public function addColorTags($colorTagNames, $item_id)
    {
        foreach ($colorTagNames as $colorTagName) {
            $colorTag = ColorTag::ensureExists($colorTagName);
            // $this->colorTags()->attach($colorTag->color_tag_id);
            $this->colorTags()->attach(['item_id' => $item_id], $colorTag->color_tag_id); // item_idを指定してカラータグを商品に関連付ける
        }
    }
}
