<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\Exceptions\UserAlreadyRegisteredException;

/**
 * 商品に関するサービスクラス
 * @package App\Services
 */
class UserService
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    public function __construct(
        UserRepositoryInterface $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    /**
     * ユーザーを登録する
     * @param string $userFirebaseId
     * @param string $name
     * @param string $email
     * @return void
     * @throws UserAlreadyRegisteredException 商品が既に登録されている場合
     * @throws EmailAlreadyUsedException メールアドレスが既に登録されている場合
     */
    public function register(string $userFirebaseId, string $name, string $email): void
    {
        $this->userRepository->ensureUserNotExists($userFirebaseId);

        $this->userRepository->ensureEmailNotExists($email);

        $this->userRepository->createUserData($userFirebaseId, $name, $email);
    }
}
