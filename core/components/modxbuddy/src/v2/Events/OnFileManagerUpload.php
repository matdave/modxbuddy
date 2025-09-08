<?php

namespace MODXBuddy\v2\Events;

use MatDave\MODXPackage\Elements\Event\Event;
use MODXBuddy\v2\Services\ImageResize;

class OnFileManagerUpload extends Event
{
    public function run()
    {
        $canResize = $this->modx->getOption('modxbuddy.upload_resize', $this->scriptProperties, true);
        if (!$canResize) {
            return true;
        }
        $files = $this->scriptProperties['files'];
        $directory = $this->scriptProperties['directory'];
        $source = $this->scriptProperties['source'];

        if ($directory === DIRECTORY_SEPARATOR) {
            $directory = '';
        }

        if (!empty($files)) {
            try {
                $imageResize = new ImageResize($this->modx);
            } catch (\Exception $e) {
                $this->modx->log(\xPDO::LOG_LEVEL_ERROR, 'MODXBuddy: ' . $e->getMessage());
                return false;
            }
            foreach ($files as $file) {
                // Resize images
                try {
                    $imageResize->resize($source, $directory, $file);
                } catch (\ImagickException $e) {
                    $this->modx->log(\xPDO::LOG_LEVEL_ERROR,  'MODXBuddy: ' . $e->getMessage());
                    return false;
                }
            }
        }
        return true;
    }
}