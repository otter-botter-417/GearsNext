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
        'color_name'
    ];

    // 
    /**
     * @param  string $colorTagName
     * @throws colorTagNotFoundException カラータグが見つからない場合にスローされます。
     * @return \App\Models\colorTag カラータグのインスタンスを返します。
     */
    public static function ensureExists($colorTagName)
    {
        $colorTag = self::where('color_tag_name', $colorTagName)->first();
        if (!$colorTag) {
            Log::error(
                'アイテムタグの存在を確認操作中にエラーが発生',
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
}
