<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload a single file to the specified path.
     *
     * @param  \Illuminate\Http\UploadedFile  $file
     * @param  string  $directory
     * @return string  Public URL (e.g., "storage/brands/uuid.jpg")
     */
    public static function upload(UploadedFile $file, string $directory): string
    {
        Storage::disk('public')->makeDirectory($directory);

        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

        // Store file in storage/app/public/{directory}
        $path = $file->storeAs($directory, $filename, 'public');

        // Return public URL like "/storage/brands/uuid.jpg"
        return Storage::url($path);
    }

    /**
     * Upload multiple files to the specified path.
     *
     * @param  array<\Illuminate\Http\UploadedFile>  $files
     * @param  string  $directory
     * @return array  List of public URLs
     */
    public static function uploadMultiple(array $files, string $directory): array
    {
        $paths = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $paths[] = self::upload($file, $directory);
            }
        }

        return $paths;
    }

    /**
     * Delete a file from the public disk.
     *
     * @param  string|null  $fileUrl
     * @return bool
     */
    public static function delete(?string $fileUrl): bool
    {
        if (!$fileUrl) {
            return false;
        }

        // Convert public URL "storage/brands/uuid.jpg" to storage path "brands/uuid.jpg"
        $relativePath = str_replace('/storage/', '', parse_url($fileUrl, PHP_URL_PATH));

        if (Storage::disk('public')->exists($relativePath)) {
            return Storage::disk('public')->delete($relativePath);
        }

        return false;
    }

    /**
     * Get the public URL for a stored file from relative path.
     *
     * @param  string|null  $relativePath
     * @return string|null
     */
    public static function url(?string $relativePath): ?string
    {
        return $relativePath ? Storage::url($relativePath) : null;
    }
}
