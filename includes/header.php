<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
<?php /*SEO */ ?>
<meta name="description" content="<?php echo $description; ?>" itemprop="description">
<link rel="canonical" href="<?php echo $baseURL; ?>" itemprop="url">
<?php /*CSS */ ?>
<style><?php require_once("css/header.css"); ?></style>
<?php /*browsers */ ?>
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<?php /* iOS meta */?>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="<?php echo $shortName; ?>">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<?php /*iOS */ ?>
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="mask-icon" href="/img/config/logo.svg" color="#f74552">

<?php /*Android */ ?>
<link rel="manifest" href="/manifest.json">
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="<?php echo $siteName; ?>">
<link rel="icon" sizes="192x192" href="/img/config/android-chrome-192x192.png">
<meta name="theme-color" content="#24292e">
<?php /*MS Tiles */ ?>
<meta name="msapplication-config" content="/browserconfig.xml" />
<?php /*Twitter cards */ ?>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@kakauandme">
<meta name="twitter:title" content="<?php echo $twitterTitle; ?>">
<meta name="twitter:description" content="<?php echo $description; ?>">
<meta name="twitter:image:src" content="<?php echo $baseURL; ?>/img/config/screenshot_lrg.jpg">
<?php /*Facebook OG */ ?>
<meta property="og:title" content="<?php echo $socialTitle; ?>" />
<meta property="og:site_name" content="<?php echo $siteName; ?>"/>
<meta property="og:url" content="<?php echo $baseURL; ?>" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="fb:app_id" content="587080064742659" />
<meta property="og:type" content="website" />
<meta property="og:image" content="<?php echo $baseURL; ?>/img/config/screenshot_lrg.jpg" />
<?php /*Google+ Schema.org microdata */ ?>
<meta itemprop="image" content="<?php echo $baseURL; ?>/img/config/screenshot_lrg.jpg">