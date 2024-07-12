<?php

namespace MODXBuddy\v2\Events;

use MatDave\MODXPackage\Elements\Event\Event;

class OnMODXInit extends Event
{
    public function run()
    {
        $disableWarnings = $this->modx->getOption('modxbuddy.disable_warnings', null, true);
        if ($disableWarnings) {
            error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);
        }
    }
}