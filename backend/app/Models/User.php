<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * ユーザーに関するモデルクラスです。
 * @package App\Models
 * @property int $user_id
 * @property string $user_name
 * @property string $email
 * @property string $password
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class User extends Authenticatable implements JWTSubject
{
    use HasFactory;
    protected $primaryKey = 'user_id';


    protected $fillable = [
        'user_name',
        'email',
        'password',
    ];

    /**
     * JWT認証のための識別子を取得します。
     * @return mixed キーの値
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * JWTトークンにカスタムクレームを追加します。
     * @return array カスタムクレームの配列
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
