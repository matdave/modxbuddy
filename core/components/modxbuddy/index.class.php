<?php
abstract class MODXBuddyBaseManagerController extends modExtraManagerController {
    /** @var \MODXBuddy\MODXBuddy $modxbuddy */
    public $modxbuddy;

    public function initialize(): void
    {
        if (!$this->modx->version) {
            $this->modx->getVersionData();
        }
        $version = (int) $this->modx->version['version'];
        if ($version > 2) {
            $this->modxbuddy = $this->modx->services->get('modxbuddy');
        } else {
            $corePath = $this->modx->getOption('modxbuddy.core_path', null, $this->modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/modxbuddy/');
            $this->modxbuddy = $this->modx->getService(
                'modxbuddy',
                'MODXBuddy',
                $corePath . 'model/modxbuddy/',
                [
                    'core_path' => $corePath
                ]
            );
        }

        $this->addCss($this->modxbuddy->getOption('cssUrl') . 'mgr.css?v=' . $this->modxbuddy::VERSION);
        $this->addJavascript($this->modxbuddy->getOption('jsUrl') . 'mgr/modxbuddy.js?v=' . $this->modxbuddy::VERSION);

        $this->addHtml('
            <script type="text/javascript">
                Ext.onReady(function() {
                    modxbuddy.config = '.$this->modx->toJSON($this->modxbuddy->config).';
                    modxbuddy.config.modxVersion = '.$version.';
                });
            </script>
        ');

        parent::initialize();
    }

    public function getLanguageTopics(): array
    {
        return array('modxbuddy:default', 'core:setting');
    }

    public function checkPermissions(): bool
    {
        return true;
    }
}
