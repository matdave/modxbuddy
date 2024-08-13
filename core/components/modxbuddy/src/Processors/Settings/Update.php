<?php

namespace MODXBuddy\Processors\Settings;

use MODX\Revolution\modContext;
use MODX\Revolution\modContextSetting;
use MODX\Revolution\modSystemSetting;
use MODX\Revolution\Processors\Processor;
class Update extends Processor
{
    public $permission = 'settings';

    public function process()
    {
        $field = $this->getProperty('field');
        $value = $this->getProperty('value');
        if (empty($field)) {
            return $this->failure($this->modx->lexicon('modxbuddy.err_settings.field_required'));
        }
        if ($field === 'anonymous_sessions') {
            return $this->handleAnonymousSessions($value);
        }
        $setting = $this->modx->getObject(modSystemSetting::class, ['key' => $field]);
        if (!$setting) {
            return $this->failure($this->modx->lexicon('modxbuddy.err_settings.not_found'));
        }
        $setting->set('value', $value);
        $setting->save();
        $this->modx->cacheManager->refresh();
        return $this->success();
    }

    public function handleAnonymousSessions($value)
    {
        $contexts = $this->modx->getIterator(modContext::class, ['key:!=' => 'mgr']);
        foreach ($contexts as $context) {
            $setting = $this->modx->getObject(modContextSetting::class, ['context_key' => $context->get('key'), 'key' => 'anonymous_sessions']);
            if (!$setting) {
                $setting = $this->modx->newObject(modContextSetting::class);
                $setting->set('context_key', $context->get('key'));
                $setting->set('key', 'anonymous_sessions');
                $setting->set('namespace', 'core');
                $setting->set('default', 'default');
                $setting->set('xtype', 'combo-boolean');
            }
            $setting->set('value', $value === 'true' ? '1' : '0');
            $setting->save();
        }
        $setting = $this->modx->getObject(modSystemSetting::class, ['key' => 'modxbuddy.anonymous_sessions']);
        if (!$setting) {
            $setting = $this->modx->newObject(modSystemSetting::class);
            $setting->set('key', 'modxbuddy.anonymous_sessions');
            $setting->set('namespace', 'modxbuddy');
            $setting->set('default', 'default');
            $setting->set('xtype', 'combo-boolean');
        }
        $setting->set('value', $value === 'true' ? '1' : '0');
        $setting->save();

        $this->modx->cacheManager->refresh();
        return $this->success();
    }
}