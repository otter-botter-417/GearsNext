<?php

namespace App\Contracts;

interface UserRepositoryInterface
{
    /**
     * ユーザーが既に登録されているか確認する
     * @param string $userFirebaseId
     * @throws UserAlreadyRegisteredException ユーザーが既に登録されている場合
     */
    public function ensureUserNotExists(string $userFirebaseId): void;

    /**
     * メールアドレスが既に登録されているか確認する
     * @param string $email
     * @throws EmailAlreadyUsedException メールアドレスが既に登録されている場合
     */
    public function ensureEmailNotExists(string $email): void;

    /**
     * ユーザーを登録する
     * @param string $userFirebaseId
     * @param string $name
     * @param string $email
     */
    public function createUserData(string $userFirebaseId, string $name, string $email): void;

    /**
     * firebaseIdからユーザーIDを取得する
     * @param  string $userFirebaseId
     * @return int user_id
     * @throws UserNotFoundException ユーザーが見つからない場合
     */
    public function getUserIdByFirebaseId($userFirebaseId);
}
