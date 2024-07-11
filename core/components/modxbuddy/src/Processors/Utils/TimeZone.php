<?php

namespace MODXBuddy\Processors\Utils;

use MODX\Revolution\Processors\Processor;
class TimeZone extends Processor
{
    public function process()
    {
        $zones = \DateTimeZone::listIdentifiers();
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $zones = array_filter($zones, function ($zone) use ($query) {
                return stripos($zone, $query) !== false;
            });
        }
        $start = $this->getProperty('start', 0);
        $limit = $this->getProperty('limit', 0);
        $total = count($zones);
        if ($limit > 0) {
            $zones = array_slice($zones, $start, $limit);
        }
        $zoneFormat = [];
        foreach ($zones as $zone) {
            $zoneFormat[] = [
                'value' => $zone,
            ];
        }
        return $this->outputArray(array_values($zoneFormat), $total);
    }
}