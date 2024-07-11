var MODXBuddy = function (config) {
    config = config || {};
    MODXBuddy.superclass.constructor.call(this, config);
};
Ext.extend(MODXBuddy, Ext.Component, {

    page: {},
    window: {},
    grid: {},
    tree: {},
    panel: {},
    combo: {},
    field: {},
    config: {},

});
Ext.reg('modxbuddy', MODXBuddy);
modxbuddy = new MODXBuddy();
