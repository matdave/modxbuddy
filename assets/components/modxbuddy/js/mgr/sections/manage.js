modxbuddy.page.Manage = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [
            {
                xtype: 'modxbuddy-panel-manage',
                renderTo: 'modxbuddy-panel-manage-div'
            }
        ]
    });
    modxbuddy.page.Manage.superclass.constructor.call(this, config);
};
Ext.extend(modxbuddy.page.Manage, MODx.Component);
Ext.reg('modxbuddy-page-manage', modxbuddy.page.Manage);
