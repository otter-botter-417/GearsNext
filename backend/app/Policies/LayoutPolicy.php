<?php

namespace App\Policies;

use App\Models\Layout;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * レイアウトに関するポリシークラスです。
 * このクラスではレイアウトの更新、削除に関するポリシーを提供します。
 */
class LayoutPolicy
{
    use HandlesAuthorization;

    /**
     * @param  \App\Models\User  $user
     * @param  \App\Models\Layout  $layout
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Layout $layout)
    {
        return $user->user_id === $layout->user_id;
    }

    /**
     * @param  \App\Models\User  $user
     * @param  \App\Models\Layout  $layout
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Layout $layout)
    {
        return $user->user_id === $layout->user_id;
    }
}
