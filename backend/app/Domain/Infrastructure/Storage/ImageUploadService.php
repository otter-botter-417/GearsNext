<?php

namespace App\Domain\Infrastructure\Storage;

use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Image as ConvertImage;
use Intervention\Image\ImageManagerStatic as Image;


/**
 * 画像のアップロードに関するサービスクラス
 * @package App\Services
 */
class ImageUploadService
{
    // サポートする形式のリスト
    const SUPPORTED_ENCODE_TYPES = ['jpg', 'png', 'gif'];

    private $storageService;

    public function __construct(StorageServiceInterface $storageService)
    {
        $this->storageService = $storageService;
    }

    /**
     * レイアウトの画像をアップロード
     * - 画像を指定した形式に変換
     * - レイアウト画像のファイル名を生成
     * - 画像をストレージにアップロード
     * - 画像のリソースを解放
     * @param  UploadedFile $imageFile 画像ファイル
     * @param  int $layoutId レイアウトID
     * @param  string $encodeType 変換する形式
     * @return void
     * @throws Exception サポートされていないエンコード形式が指定された場合
     */
    public function uploadLayoutImage(UploadedFile $imageFile, int $layoutId, string $encodeType): void
    {
        try {
            $inputPath = $imageFile->path();
            $convertImage = $this->convertImageToFileType($inputPath, $encodeType);
            $newFileName = $this->generateLayoutImageFileName($layoutId, $encodeType);
            $this->uploadImage($newFileName, (string)$convertImage);
            $this->releaseImageResource($convertImage);
        } catch (Exception $e) {
            $this->errorLog($e->getMessage());
            throw $e;
        }
    }

    /**
     * 画像を指定された形式に変換して返す
     * @param  string $inputPath 元の画像のパス
     * @param  string $encodeType 変換後の形式
     * @return ConvertImage 変換された画像のインスタンス
     * @throws Exception サポートされていないエンコード形式が指定された場合
     */
    public function convertImageToFileType(string $inputPath, string $encodeType): ConvertImage
    {
        if (!in_array($encodeType, self::SUPPORTED_ENCODE_TYPES)) {
            throw new Exception("Unsupported encode type: {$encodeType}");
        }
        return Image::make($inputPath)->encode($encodeType);
    }

    /**
     * レイアウト画像のファイル名を生成
     * @param  int $layoutId
     * @param  string $encodeType
     * @return string
     */
    public function generateLayoutImageFileName(int $layoutId, string $encodeType): string
    {
        return config('constants.LAYOUT_IMAGE_BASE_PATH') . $layoutId . '.' . $encodeType;
    }

    /**
     * 画像をストレージにアップロード
     * @param  string $newFileName
     * @param  string $convertImage
     * @return void
     */
    public function uploadImage(string $newFileName, string $convertImage): void
    {
        $this->storageService->store($newFileName,  $convertImage);
    }

    /**
     * 画像のリソースを解放
     * @param  ConvertImage $convertImage
     * @return void
     */
    public function releaseImageResource(ConvertImage $convertImage): void
    {
        $convertImage->destroy(); //リソースの解放
    }

    /**
     * エラーログを出力
     * @param  string $message
     * @return void
     */
    public function errorLog(string $message): void
    {
        Log::error("Image Processing Error: " . $message);
    }
}
