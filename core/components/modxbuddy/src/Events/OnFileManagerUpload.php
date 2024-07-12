<?php

namespace MODXBuddy\Events;

use League\Flysystem\FilesystemException;
use MatDave\MODXPackage\Elements\Event\Event;
use MODXBuddy\Services\ImageResize;
use xPDO\xPDO;

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
            $filesystem = $source->getFilesystem();
            $imageResize = new ImageResize($this->modx);
            foreach ($files as $file) {
                // Resize images
                try {
                    $imageResize->resize($source, $directory, $file, $filesystem);
                } catch (FilesystemException $e) {
                    $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'MODXBuddy: ' . $e->getMessage());
                } catch (\ImagickException $e) {
                    $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'MODXBuddy: ' . $e->getMessage());
                }
            }
        }
    }
}