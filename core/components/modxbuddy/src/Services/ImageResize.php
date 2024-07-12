<?php

namespace MODXBuddy\Services;

use Imagick;
use League\Flysystem\FilesystemException;
use MODX\Revolution\Sources\modMediaSource;
use xPDO\xPDO;

class ImageResize
{
    private $imagick;

    private $modx;

    public function __construct($modx)
    {
        $this->modx = $modx;
        $this->imagick = new Imagick();
    }

    /**
     * @throws FilesystemException
     * @throws \ImagickException
     */
    public function resize(modMediaSource $source, $directory, $file, $filesystem = null)
    {
        if ($file['type'] != "image/jpeg" && $file['type'] != "image/png") {
            return false;
        }
        if (empty($filesystem)) {
            $filesystem = $source->getFilesystem();
        }
        if ($this->modx->getOption('upload_translit')) {
            $newName = $this->modx->filterPathSegment($file['name']);
            if ($newName !== $file['name']) {
                $file['name'] = $newName;
            }
        }
        // max number of pixels wide or high
        $maxDimension = $this->modx->getOption('modxbuddy.image_resize_max_dimension', null, 1920);
        $path = !empty($directory)
            ? $source->sanitizePath(
                $directory . DIRECTORY_SEPARATOR . ltrim($file['name'], DIRECTORY_SEPARATOR)
            )
            : $file['name'];
        if ($filesystem->fileExists($path)) {
            $this->imagick->readImageBlob($filesystem->read($path));
            $orientation = $this->imagick->getImageOrientation();
            switch ($orientation) {
                case Imagick::ORIENTATION_BOTTOMRIGHT:
                    $this->imagick->rotateimage("#000", 180); // rotate 180 degrees
                    break;

                case Imagick::ORIENTATION_RIGHTTOP:
                    $this->imagick->rotateimage("#000", 90); // rotate 90 degrees CW
                    break;

                case Imagick::ORIENTATION_LEFTBOTTOM:
                    $this->imagick->rotateimage("#000", -90); // rotate 90 degrees CCW
                    break;
            }
            // Now that it's auto-rotated, make sure the EXIF data is correct
            // in case the EXIF gets saved with the image!
            $this->imagick->setImageOrientation(Imagick::ORIENTATION_TOPLEFT);

            // Limit the max size to a specific dimension (if set)
            if ($maxDimension > 0) {
                $width = $this->imagick->getImageWidth();
                $height = $this->imagick->getImageHeight();
                if ($width > $maxDimension || $height > $maxDimension) {
                    if ($width > $height) {
                        $this->imagick->resizeImage($maxDimension, 0, Imagick::FILTER_LANCZOS, 1);
                    }
                    if ($height > $width) {
                        $this->imagick->resizeImage(0, $maxDimension, Imagick::FILTER_LANCZOS, 1);
                    }
                }
            }
            try {
                $filesystem->write($path, $this->imagick->getImageBlob());
                return true;
            } catch (\Exception $e) {
                $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'Error resizing image: ' . $e->getMessage());
            }
        } else {
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, $path. ' NOT FOUND!');
        }
        return false;
    }

}