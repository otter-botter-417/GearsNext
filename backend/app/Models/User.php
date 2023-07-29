<?php

namespace App\Models;

use App\Exceptions\UserNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_id';


    protected $fillable = [
        'user_firebase_id',
        'name',
        'email',
    ];

    public static function getUserIdByFirebaseId($user_firebase_id)
    {
        $user = User::where('user_firebase_id', $user_firebase_id)->first();
        if (!$user) {
            throw new UserNotFoundException();
        }
        return $user->user_id;
    }
}
