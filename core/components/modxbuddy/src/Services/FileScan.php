<?php

namespace MODXBuddy\Services;

class FileScan
{
    private $scanner;

    public function __construct()
    {
        require_once dirname(__DIR__, 2) . '/vendor/scr34m/php-malware-scanner/scan.php';
        $this->scanner = new \MalwareScanner(false);
    }

    public function scanFileContent($path): bool
    {
        $this->scanner->setFlagHideWhitelist(true);
        $this->scanner->setFlagHideOk(true);
        $this->scanner->initializePatterns();
        $this->scanner->loadWhitelists();

        return $this->scanner->scan($path);
    }
}