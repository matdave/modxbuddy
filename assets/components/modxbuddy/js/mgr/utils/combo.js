modxbuddy.combo.TimeZones = function (config) {
    config = config || {};
    Ext.applyIf(config, {

        url: modxbuddy.config.connectorUrl,
        baseParams: {
            action: 'MODXBuddy\\Processors\\Utils\\TimeZone'
        },
        fields: ['value'],
        pageSize: 20,
        valueField: 'value',
        displayField: 'value',
        mode: 'remote',
        triggerAction: 'all',
        editable:true,
    });
    modxbuddy.combo.TimeZones.superclass.constructor.call(this, config);
}
Ext.extend(modxbuddy.combo.TimeZones, MODx.combo.ComboBox);
Ext.reg('modxbuddy-combo-timezones', modxbuddy.combo.TimeZones);

modxbuddy.combo.StrictLaxNone = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        store: new Ext.data.ArrayStore({
            fields: ['display', 'value'],
            data: [
                ['Strict','Strict'],
                ['Lax','Lax'],
                ['None', '']
            ]
        }),
        displayField: 'display',
        valueField: 'value',
        mode: 'local',
        triggerAction: 'all',
        editable: false,
    });
    modxbuddy.combo.StrictLaxNone.superclass.constructor.call(this, config);
};
Ext.extend(modxbuddy.combo.StrictLaxNone, MODx.combo.ComboBox);
Ext.reg('modxbuddy-combo-strictlaxnone', modxbuddy.combo.StrictLaxNone);

modxbuddy.combo.SessionManager = function (config) {
    config = config || {};
    const options = [];
    if (modxbuddy.config.modxVersion > 2) {
        options.push(['modSessionHandler', 'MODX\\Revolution\\modSessionHandler']);
    } else {
        options.push(['modSessionHandler', 'modSessionHandler']);
    }
    options.push(['PHP', '']);
    Ext.applyIf(config, {
        store: new Ext.data.ArrayStore({
            fields: ['display', 'value'],
            data: options
        }),
        displayField: 'display',
        valueField: 'value',
        mode: 'local',
        triggerAction: 'all',
        editable: false,
    });
    modxbuddy.combo.SessionManager.superclass.constructor.call(this, config);
};
Ext.extend(modxbuddy.combo.SessionManager, MODx.combo.ComboBox);
Ext.reg('modxbuddy-combo-sessionmanager', modxbuddy.combo.SessionManager);