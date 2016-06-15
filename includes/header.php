<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
<?php /*SEO */ ?>
<meta name="description" content="<?php echo $description; ?>" itemprop="description">
<link rel="canonical" href="<?php echo $baseURL; ?>" itemprop="url">
<?php /*CSS */ ?>
<style><?php require_once("css/header.css"); ?></style>
<?php /*browsers */ ?>
<link rel="shortcut icon" href="/img/config/favicon.ico" type="image/x-icon">
<?php /* iOS meta */?>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="<?php echo $shortName; ?>">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<?php /*iOS */ ?>
<link rel="apple-touch-icon" sizes="57x57" href="/img/config/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/img/config/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/img/config/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/img/config/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/img/config/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/img/config/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/img/config/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/img/config/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/img/config/apple-touch-icon-180x180.png">
<link rel="mask-icon" href="/img/config/logo.svg" color="#f74552">
<?php /* STARTUP IMAGES */ ?>
<link href="/img/config/iPadRetinaPortrait.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" rel="apple-touch-startup-image">
<link href="/img/config/iPadRetinaLandscape.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" rel="apple-touch-startup-image">
<link href="/img/config/iPadPortrait.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)" rel="apple-touch-startup-image">
<link href="/img/config/iPadRetinaLandscape.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)" rel="apple-touch-startup-image">
<link href="/img/config/iPhone6PlusPortrait.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" rel="apple-touch-startup-image">
<link href="/img/config/iPhone6PlusLandscape.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" rel="apple-touch-startup-image">
<link href="/img/config/iPhone6.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<link href="/img/config/iPhone5.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<link href="/img/config/iPhone4.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<link href="/img/config/iPhone3.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image">
<?php /*Android */ ?>
<link rel="manifest" href="/manifest.json">
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="<?php echo $siteName; ?>">
<link rel="icon" sizes="192x192" href="/img/config/android-chrome-192x192.png">
<meta name="theme-color" content="#24292e">
<?php /*MS Tiles */ ?>
<meta name="msapplication-config" content="/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#f74552">
<meta name="msapplication-TileImage" content="/img/config/mstile-144x144.png">
<?php /*Twitter cards */ ?>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@kakauandme">
<meta name="twitter:title" content="<?php echo $twitterTitle; ?>">
<meta name="twitter:description" content="<?php echo $description; ?>">
<meta name="twitter:image:src" content="<?php echo $baseURL; ?>/img/config/screenshot_sml.png">
<?php /*Facebook OG */ ?>
<meta property="og:title" content="<?php echo $socialTitle; ?>" />
<meta property="og:site_name" content="<?php echo $siteName; ?>"/>
<meta property="og:url" content="<?php echo $baseURL; ?>" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="fb:app_id" content="587080064742659" />
<meta property="og:type" content="website" />
<meta property="og:image" content="<?php echo $baseURL; ?>/img/config/screenshot_lrg.png" />
<?php /*Google+ Schema.org microdata */ ?>
<meta itemprop="image" content="<?php echo $baseURL; ?>/img/config/screenshot_lrg.png">