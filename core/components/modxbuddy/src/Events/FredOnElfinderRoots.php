<?php

namespace MODXBuddy\Events;

use MatDave\MODXPackage\Elements\Event\Event;
class FredOnElfinderRoots extends Event
{
    public function run()
    {
        $params = $this->modx->getOption('params', $this->scriptProperties);
        $canResize = $this->modx->getOption('modxbuddy.upload_resize', $this->scriptProperties, true);
        if (!$canResize || empty($params)) {
            return true;
        }

        $maxDimension = (int) $this->modx->getOption('modxbuddy.image_resize_max_dimension', null, 1920);
        $quality = (int) $this->modx->getOption('modxbuddy.image_resize_quality', null, 70);

        $params->bind['upload.presave'][] = 'Plugin.AutoResize.onUpLoadPreSave';
        $params->plugin['AutoResize'] = [
            'enable'         => true,
            'maxWidth'       => $maxDimension,
            'maxHeight'      => $maxDimension,
            'quality'        => $quality,
            'preserveExif'   => false,
            'forceEffect'    => false,
            'targetType'     => IMG_GIF|IMG_JPG|IMG_PNG|IMG_WBMP,
            'offDropWith'    => null,
            'onDropWith'     => null
        ];
        $params->bind['upload.presave'][] = 'Plugin.AutoRotate.onUpLoadPreSave';
        $params->plugin['AutoRotate'] = [
            'enable'         => true,
            'quality'        => $quality,
            'offDropWith'    => null,
            'onDropWith'     => null
        ];

        $uploadTranslit = $this->modx->getOption('upload_translit', $this->scriptProperties, true);
        if ($uploadTranslit) {
            $params->bind['upload.pre mkdir.pre mkfile.pre rename.pre archive.pre ls.pre'][] = 'Plugin.Normalizer.cmdPreprocess';
            $params->bind['paste.copyfrom upload.presave'][] = 'Plugin.Normalizer.onUpLoadPreSave';
            $params->plugin['Normalizer'] = [
                'enable' => true,
                'nfc' => true,
                'nfkc' => true,
                'umlauts' => true,
                'lowercase' => true,
                'convmap' => array()
            ];
            $params->bind['upload.pre mkdir.pre mkfile.pre rename.pre archive.pre ls.pre'][] = 'Plugin.Sanitizer.cmdPreprocess';
            $params->bind['paste.copyfrom upload.presave'][] = 'Plugin.Sanitizer.onUpLoadPreSave';
            $params->plugin['Sanitizer'] = [
                'enable' => true,
                'targets' => array('\\', '/', ':', '*', '?', '"', '<', '>', '|', '#', ' '),
                'replace' => '-',
                'callBack' => null
            ];
        }
        return true;
    }
}