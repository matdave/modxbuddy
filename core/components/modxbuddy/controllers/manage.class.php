<?php
require_once dirname(dirname(__FILE__)) . '/index.class.php';

class MODXBuddyManageManagerController extends MODXBuddyBaseManagerController
{

    public function process(array $scriptProperties = []): void
    {
    }

    public function getPageTitle(): string
    {
        return $this->modx->lexicon('modxbuddy');
    }

    public function loadCustomCssJs(): void
    {
        $this->addLastJavascript($this->modxbuddy->getOption('jsUrl') . 'mgr/widgets/manage.panel.js?v=' . $this->modxbuddy::VERSION);
        $this->addLastJavascript($this->modxbuddy->getOption('jsUrl') . 'mgr/sections/manage.js?v=' . $this->modxbuddy::VERSION);
        $this->addLastJavascript($this->modxbuddy->getOption('jsUrl') . 'mgr/utils/combo.js?v=' . $this->modxbuddy::VERSION);

        $this->addHtml(
            '
            <script type="text/javascript">
                Ext.onReady(function() {
                    MODx.load({ xtype: "modxbuddy-page-manage"});
                });
            </script>
        '
        );
    }

    public function getTemplateFile(): string
    {
        return $this->modxbuddy->getOption('templatesPath') . 'manage.tpl';
    }

}
