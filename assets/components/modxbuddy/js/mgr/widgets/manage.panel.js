modxbuddy.panel.Manage = function (config) {
    config = config || {};
    Ext.apply(config, {
        border: false,
        baseCls: 'modx-formpanel',
        cls: 'container',
        items: [
            {
                html: '<h2>' + _('modxbuddy.manage.page_title') + '</h2>',
                border: false,
                cls: 'modx-page-header'
            },
            {
                xtype: 'modx-tabs',
                defaults: {
                    border: false,
                    autoHeight: true
                },
                border: true,
                activeItem: 0,
                hideMode: 'offsets',
                items: [
                    {
                        layout: 'form',
                        title: _('system_settings'),
                        items: [
                            {
                                html: _('modxbuddy.manage.system_settings'),
                                cls: 'panel-desc'
                            },
                            {
                                layout: 'form',
                                defaults: {
                                    msgTarget: 'under',
                                    border: false,
                                    anchor: '100%',
                                    layout: 'form',
                                    defaultType: 'textfield',
                                    autoHeight: true,
                                },
                                labelAlign: 'top',
                                cls: 'main-wrapper',
                                items: [
                                    {
                                        xtype: 'modxbuddy-combo-timezones',
                                        fieldLabel: _('modxbuddy.setting_date_timezone') + ' <i style="font-weight: normal">(' + _('setting_date_timezone') + ')</i>',
                                        name: 'date_timezone',
                                        cls: MODx.config.date_timezone ? 'valid' : 'invalid',
                                        value: MODx.config.date_timezone,
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value) {
                                                    field.removeClass('invalid');
                                                    field.addClass('valid');
                                                } else {
                                                    field.removeClass('valid');
                                                    field.addClass('invalid');
                                                }
                                                MODx.Ajax.request({
                                                    url: modxbuddy.config.connectorUrl,
                                                    params: {
                                                        action: 'MODXBuddy\\Processors\\Settings\\Update',
                                                        field: 'date_timezone',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'combo-boolean',
                                        fieldLabel: _('modxbuddy.setting_session_cookie_httponly') + ' <i style="font-weight: normal">(' + _('setting_session_cookie_httponly') + ')</i>',
                                        name: 'session_cookie_httponly',
                                        cls: MODx.config.session_cookie_httponly === '1' ? 'valid' : 'invalid',
                                        value: MODx.config.session_cookie_httponly,
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value === '1' || value === true) {
                                                    field.removeClass('invalid');
                                                    field.addClass('valid');
                                                } else {
                                                    field.removeClass('valid');
                                                    field.addClass('invalid');
                                                }
                                                MODx.Ajax.request({
                                                    url: modxbuddy.config.connectorUrl,
                                                    params: {
                                                        action: 'MODXBuddy\\Processors\\Settings\\Update',
                                                        field: 'session_cookie_httponly',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'combo-boolean',
                                        fieldLabel: _('modxbuddy.setting_session_cookie_secure') + ' <i style="font-weight: normal">(' + _('setting_session_cookie_secure') + ')</i>',
                                        name: 'session_cookie_secure',
                                        cls: MODx.config.session_cookie_secure === '1' ? 'valid' : 'invalid',
                                        value: MODx.config.session_cookie_secure,
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value === '1' || value === true) {
                                                    field.removeClass('invalid');
                                                    field.addClass('valid');
                                                } else {
                                                    field.removeClass('valid');
                                                    field.addClass('invalid');
                                                }
                                                MODx.Ajax.request({
                                                    url: modxbuddy.config.connectorUrl,
                                                    params: {
                                                        action: 'MODXBuddy\\Processors\\Settings\\Update',
                                                        field: 'session_cookie_secure',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'modxbuddy-combo-strictlaxnone',
                                        fieldLabel: _('modxbuddy.setting_session_cookie_samesite') + ' <i style="font-weight: normal">(' + _('setting_session_cookie_samesite') + ')</i>',
                                        name: 'session_cookie_samesite',
                                        cls: MODx.config.session_cookie_samesite === 'Strict' ? 'valid' : 'invalid',
                                        value: MODx.config.session_cookie_samesite,
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value === 'Strict') {
                                                    field.removeClass('invalid');
                                                    field.addClass('valid');
                                                } else {
                                                    field.removeClass('valid');
                                                    field.addClass('invalid');
                                                }
                                                MODx.Ajax.request({
                                                    url: modxbuddy.config.connectorUrl,
                                                    params: {
                                                        action: 'MODXBuddy\\Processors\\Settings\\Update',
                                                        field: 'session_cookie_samesite',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'combo-boolean',
                                        fieldLabel: _('modxbuddy.setting_anonymous_sessions') + ' <i style="font-weight: normal">(' + _('setting_anonymous_sessions') + ')</i>',
                                        name: 'anonymous_sessions',
                                        cls: MODx.config['modxbuddy.anonymous_sessions'] === '0' ? 'valid' : 'isokay',
                                        value: MODx.config['modxbuddy.anonymous_sessions'],
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value === '1' || value === true) {
                                                    field.removeClass('valid');
                                                    field.addClass('isokay');
                                                } else {
                                                    field.removeClass('isokay');
                                                    field.addClass('valid');
                                                }
                                                MODx.Ajax.request({
                                                    url: modxbuddy.config.connectorUrl,
                                                    params: {
                                                        action: 'MODXBuddy\\Processors\\Settings\\Update',
                                                        field: 'anonymous_sessions',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    modxbuddy.panel.Manage.superclass.constructor.call(this, config);
};
Ext.extend(modxbuddy.panel.Manage, MODx.Panel);
Ext.reg('modxbuddy-panel-manage', modxbuddy.panel.Manage);
