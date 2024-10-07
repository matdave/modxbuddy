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
                        title: _('modxbuddy.tab.system'),
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
                                        fieldLabel: _('modxbuddy.setting_friendly_urls') + ' <i style="font-weight: normal">(' + _('setting_friendly_urls') + ')</i>',
                                        name: 'friendly_urls',
                                        cls: MODx.config.friendly_urls === '1' ? 'valid' : 'invalid',
                                        value: MODx.config.friendly_urls,
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
                                                        field: 'friendly_urls',
                                                        value: value ? '1' : '0'
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'combo-boolean',
                                        fieldLabel: _('modxbuddy.setting_use_alias_path') + ' <i style="font-weight: normal">(' + _('setting_use_alias_path') + ')</i>',
                                        name: 'use_alias_path',
                                        cls: MODx.config.use_alias_path === '1' ? 'valid' : 'invalid',
                                        value: MODx.config.use_alias_path,
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
                                                        field: 'use_alias_path',
                                                        value:  value ? '1' : '0'
                                                    },
                                                });
                                            }
                                        }
                                    },
                                ]
                            }
                        ]
                    },{
                        layout: 'form',
                        title: _('modxbuddy.tab.performance'),
                        items: [
                            {
                                html: _('modxbuddy.manage.performance_settings'),
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
                                                        value:  value ? '1' : '0'
                                                    },
                                                });
                                            }
                                        }
                                    },{
                                        xtype: 'combo-boolean',
                                        fieldLabel: _('setting_modxbuddy.upload_resize_desc') + ' <i style="font-weight: normal">(' + _('setting_modxbuddy.upload_resize') + ')</i>',
                                        name: 'modxbuddy.upload_resize',
                                        cls: MODx.config['modxbuddy.upload_resize'] === '1' ? 'valid' : 'invalid',
                                        value: MODx.config['modxbuddy.upload_resize'],
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value === '1' || value === true) {
                                                    field.removeClass('valid');
                                                    field.addClass('invalid');
                                                } else {
                                                    field.removeClass('invalid');
                                                    field.addClass('valid');
                                                }
                                                MODx.Ajax.request({
                                                    url: modxbuddy.config.connectorUrl,
                                                    params: {
                                                        action: 'MODXBuddy\\Processors\\Settings\\Update',
                                                        field: 'modxbuddy.upload_resize',
                                                        value:  value ? '1' : '0'
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'numberfield',
                                        fieldLabel: _('setting_modxbuddy.image_resize_max_dimension_desc') + ' <i style="font-weight: normal">(' + _('setting_modxbuddy.image_resize_max_dimension') + ')</i>',
                                        name: 'modxbuddy.image_resize_max_dimension',
                                        cls: parseInt(MODx.config['modxbuddy.image_resize_max_dimension']) > 0 ? 'valid' : 'invalid',
                                        value: parseInt(MODx.config['modxbuddy.image_resize_max_dimension']),
                                        allowNegative: false,
                                        allowDecimals: false,
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value > 0) {
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
                                                        field: 'modxbuddy.image_resize_max_dimension',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'numberfield',
                                        fieldLabel: _('setting_modxbuddy.image_resize_quality_desc') + ' <i style="font-weight: normal">(' + _('setting_modxbuddy.image_resize_max_dimension') + ')</i>',
                                        name: 'modxbuddy.image_resize_quality',
                                        cls: parseInt(MODx.config['modxbuddy.image_resize_quality']) > 0 ? 'valid' : 'invalid',
                                        value: parseInt(MODx.config['modxbuddy.image_resize_quality']),
                                        allowNegative: false,
                                        allowDecimals: false,
                                        maxValue: 100,
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value > 0) {
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
                                                        field: 'modxbuddy.image_resize_quality',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'modxbuddy-combo-sessionmanager',
                                        fieldLabel: _('modxbuddy.setting_session_handler_class') + ' <i style="font-weight: normal">(' + _('setting_session_handler_class') + ')</i>',
                                        name: 'session_handler_class',
                                        cls: MODx.config.session_handler_class === '' ? 'valid' : 'isokay',
                                        value: MODx.config.session_handler_class,
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value) {
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
                                                        field: 'session_handler_class',
                                                        value: value
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'combo-boolean',
                                        fieldLabel: _('setting_modxbuddy.disable_warnings_desc') + ' <i style="font-weight: normal">(' + _('setting_modxbuddy.disable_warnings') + ')</i>',
                                        name: 'modxbuddy.disable_warnings',
                                        cls: MODx.config['modxbuddy.disable_warnings'] === '1' ? 'valid' : 'invalid',
                                        value: MODx.config['modxbuddy.disable_warnings'],
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
                                                        field: 'modxbuddy.disable_warnings',
                                                        value:  value ? '1' : '0'
                                                    },
                                                });
                                            }
                                        }
                                    },
                                ]
                            }
                        ]
                    },{
                        layout: 'form',
                        title: _('modxbuddy.tab.security'),
                        items: [
                            {
                                html: _('modxbuddy.manage.security_settings'),
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
                                                        value:  value ? '1' : '0'
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
                                                        value:  value ? '1' : '0'
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
                                        fieldLabel: _('setting_modxbuddy.upload_scan_desc') + ' <i style="font-weight: normal">(' + _('setting_modxbuddy.upload_scan') + ')</i>',
                                        name: 'modxbuddy.upload_scan',
                                        cls: MODx.config['modxbuddy.upload_scan'] === '1' ? 'valid' : 'invalid',
                                        value: MODx.config['modxbuddy.upload_scan'],
                                        listeners: {
                                            'change': function (field, value) {
                                                if (value === '1' || value === true) {
                                                    field.removeClass('valid');
                                                    field.addClass('invalid');
                                                } else {
                                                    field.removeClass('invalid');
                                                    field.addClass('valid');
                                                }
                                                MODx.Ajax.request({
                                                    url: modxbuddy.config.connectorUrl,
                                                    params: {
                                                        action: 'MODXBuddy\\Processors\\Settings\\Update',
                                                        field: 'modxbuddy.upload_scan',
                                                        value:  value ? '1' : '0'
                                                    },
                                                });
                                            }
                                        }
                                    }, {
                                        xtype: 'combo-boolean',
                                        fieldLabel: _('setting_cache_alias_map_desc') + ' <i style="font-weight: normal">(' + _('setting_cache_alias_map') + ')</i>',
                                        name: 'cache_alias_map',
                                        value: MODx.config.cache_alias_map,
                                        cls: MODx.config.cache_alias_map === '1' ? 'isokay' : 'valid',
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
                                                        field: 'cache_alias_map',
                                                        value:  value ? '1' : '0'
                                                    },
                                                });
                                            }
                                        }
                                    },
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
