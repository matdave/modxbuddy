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
            $imageResize = new ImageResize($this->modx);
            foreach ($files as $file) {
                // Resize images
                $imageResize->resize($source, $directory, $file);
            }
        } else {
            $this->modx->log(\xPDO::LOG_LEVEL_ERROR, 'MODXBuddy: no files uploaded');
        }
    }
}