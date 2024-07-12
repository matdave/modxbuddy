<?php

$_lang['modxbuddy.menu'] = 'MODX Buddy';
$_lang['modxbuddy.menu_desc'] = 'Manage MODX settings and configurations.';
$_lang['modxbuddy.manage.page_title'] = 'MODX Buddy';

$_lang['modxbuddy.intro'] = 'Welcome to MODX Buddy!';

$_lang['modxbuddy.manage.performance_settings'] = 'Manage common system settings to speed up your site.';
$_lang['modxbuddy.manage.security_settings'] = 'Manage common system settings to strengthen your security.';
$_lang['modxbuddy.manage.system_settings'] = 'Manage common system settings to improve your experience.';

$_lang['modxbuddy.setting_date_timezone'] = 'Set the default timezone for your MODX installation. <a href="https://www.php.net/manual/en/timezones.php" target="_blank">List of supported timezones</a>';
$_lang['modxbuddy.setting_session_cookie_httponly'] = 'Prevent cookies from being read by JavaScript. This setting can help prevent cross-site scripting attacks.';
$_lang['modxbuddy.setting_session_cookie_secure'] = 'Only send the cookie over HTTPS. Make sure your site is using HTTPS before enabling this setting.';
$_lang['modxbuddy.setting_session_cookie_samesite'] = 'Set the SameSite attribute for the session cookie. Set to "Strict" prevent cross-site request forgery attacks.';
$_lang['modxbuddy.setting_anonymous_sessions'] = 'Does your site need to track frontend user sessions (e.g. logging in, multi-page forms, etc.)? If not, disable this setting to save resources.';
$_lang['modxbuddy.setting_session_handler_class'] = 'Select the session manager to use for your site. The native PHP session manager will give you better performance on larger sites.';
$_lang['modxbuddy.setting_friendly_urls'] = 'Enable friendly URLs for your site. This setting will remove the "index.php" from your URLs.';
$_lang['modxbuddy.setting_use_alias_path'] = 'Use the alias path for your site. This setting will allow you to use the alias path for your resources.';

$_lang['modxbuddy.tab.performance'] = 'Performance';
$_lang['modxbuddy.tab.security'] = 'Security';
$_lang['modxbuddy.tab.system'] = 'System';

$_lang['modxbuddy.err_settings.field_required'] = 'Field is required.';
$_lang['modxbuddy.err_settings.not_editable'] = 'This setting is not editable.';
$_lang['modxbuddy.err_settings.not_found'] = 'Setting not found.';

$_lang['setting_modxbuddy.anonymous_sessions'] = 'Anonymous Sessions';
$_lang['setting_modxbuddy.anonymous_sessions_desc'] = 'Automated setting for storing the current state of the session for anonymous users. DO NOTE CHANGE';
$_lang['setting_modxbuddy.image_resize_max_dimension'] = 'Image Upload Max Dimension';
$_lang['setting_modxbuddy.image_resize_max_dimension_desc'] = 'Maximum dimension for images uploaded to the file manager. Set to 0 to disable image resizing.';
$_lang['setting_modxbuddy.upload_scan'] = 'Scan Uploads';
$_lang['setting_modxbuddy.upload_scan_desc'] = 'Check uploaded files for basic malware.';
$_lang['setting_modxbuddy.upload_resize'] = 'Resize Uploads';
$_lang['setting_modxbuddy.upload_resize_desc'] = 'Resize images on upload if over the max image dimensions.';
$_lang['setting_modxbuddy.disable_warnings'] = 'Disable Warnings';
$_lang['setting_modxbuddy.disable_warnings_desc'] = 'Disable PHP warnings and notices.';