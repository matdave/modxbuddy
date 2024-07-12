<?php

namespace MODXBuddy\Events;

use MatDave\MODXPackage\Elements\Event\Event;
use MODXBuddy\Services\FileScan;

class OnFileManagerBeforeUpload extends Event
{
    public function run()
    {
        $canScan = $this->modx->getOption('modxbuddy.upload_scan', $this->scriptProperties, true);
        if (!$canScan) {
            return true;
        }
        $file = $this->scriptProperties['file'];
        $files = $this->scriptProperties['files'];
        $fileScan = new FileScan();
        $isMalware = $fileScan->scanFileContent($file['tmp_name']);
        if ($isMalware) {
            $this->modx->log(\xPDO::LOG_LEVEL_ERROR, 'MODXBuddy: File contains malware: ' . $file('name'));
            $this->modx->event->output('File contains malware');
            // remove from the files array
            $key = array_search($file, $files);
            if ($key !== false) {
                unset($this->scriptProperties['files'][$key]);
            }
            unset($this->scriptProperties['file']);
            unlink($file['tmp_name']);
            return false;
        }
        return true;
    }
}