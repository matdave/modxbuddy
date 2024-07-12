<?php

namespace MODXBuddy\v2\Services;

use Imagick;

class ImageResize
{
    private $imagick;
    private $modx;

    public function __construct($modx)
    {
        $this->modx = $modx;
        $this->imagick = new Imagick();
    }

    public function resize(\modMediaSource $source, $directory, $file)
    {
        if ($file['type'] != "image/jpeg" && $file['type'] != "image/png") {
            return false;
        }
        // max number of pixels wide or high
        $maxDimension = $this->modx->getOption('modxbuddy.image_resize_max_dimension', null, 1920);
        $path = rtrim($directory, '/') .'/'. ltrim($file['name'], '/');
        $content = $source->getObjectContents($path);
        if (!empty($content['content'])) {
            $this->imagick->readImageBlob($content['content']);
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
            return $source->updateObject($path, $this->imagick->getImageBlob());
        }
        return false;
    }
}