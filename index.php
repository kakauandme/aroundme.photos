<?php
require_once("config.php");
?><!doctype html>
<!--[if lt IE 10]><html class="ie" lang="en" itemscope itemtype="http://schema.org/Website"> <![endif]-->
<!--[if gt IE 9]><!--><html lang="en" itemscope itemtype="http://schema.org/Website" <?php /* manifest="/appcache.php" */?>><!--<![endif]-->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
<title><?php echo $pageTitle; ?></title>
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
<link rel="icon" sizes="192x192" href="/img/config/android-chrome-192x192.png">
<meta name="theme-color" content="#4f007d">
<?php /*MS Tiles */ ?>
<meta name="application-name" content="<?php echo $siteName; ?>"/>
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
</head>
<?php flush(); ?>
<body id="body" class="no-js">
<div id="container">
<div id="pusher">
<div id="c">
<span>
<span id="social">
<p>&nbsp;
<a href="https://twitter.com/share?hashtags=aroundmephotos&text=Checkout real-time updates on a map and discover what is happening." target="_blank" title="Tweet">
<?php require_once("img/twitter.svg"); ?>
</a><?php /*
<a href="https://plus.google.com/share?url=<?php echo $URL; ?>" target="_blank" title="Share on Google+">
<?php require_once("img/google-plus.svg"); ?>
</a>
*/ ?><a href="https://www.facebook.com/dialog/share?app_id=587080064742659&display=popup&href=##URL##&redirect_uri=http://aroundme.photos/#_=_" onclick="window.open(this.href.replace('##URL##', document.URL), 'mywin', 'left=20,top=20,width=500,height=500,toolbar=0,resizable=0'); return false;" title="Share on Facebook">
<?php require_once("img/facebook.svg"); ?>
</a><a href="https://github.com/kakauandme/aroundme.photos#aroundmephotos" target="_blank" title="View on Github">
<?php require_once("img/github.svg"); ?>
</a>
</p>
</span>
</span>
<span>
<span id="header">
<h1 itemprop="name" id="title"><?php echo $title; ?></h1>
<h2 id="subtitle"><?php echo $subtitle; ?>.</h2>
<p id="description">Check out real-time photo updates on a map <br> and discover what is happening.</p>
</span>
</span>
<span>
<span id="footer">
<p><a href="https://twitter.com/KaKaUandME" title="Kirill Kliavin on Twitter" target="_blank">@kakauandme</a>
Copyright &copy; <?php echo date("Y") ?>
</p>
</span>
</span>
<div id="timer"><p>v0.<?php echo $cacheBuster; ?></p></div>
<div id="browserhappy">
<!--[if lt IE 10]>
<p>Yоu аrе usіng аn <strong>оutdаtеd</strong> brоwsеr. <br>Рlеаsе <a href="http://www.google.com/chrome/browser/" target="_blank">uрgrаdе yоur brоwsеr</a> tо usе thіs wеbsіtе.</p>
<![endif]-->
<noscript>
<p>JаvаSсrіpt іs <strong>dіsаbled</strong>. <br>Рlеаsе <a href="http://www.enable-javascript.com/" target="_blank">еnаblе іt іn brоwsеr sеttіngs</a> tо usе thіs wеbsіtе.</p>
</noscript>
</div>
</div>
<div id="hamburger" title="Info"><span></span></div>
<div id="search" >
<form action="/" id="search_form" autocomplete="off" itemprop="potentialAction" itemscope itemtype="http://schema.org/SearchAction">
<meta itemprop="target" content="<?php echo $baseURL; ?>?city={city}"/>
<input itemprop="query-input"  tabindex="0" id="s_input" autocomplete="off" name="city" placeholder="Type location name &hellip;" title="Type location name" type="text" value="">
<span tabindex="1" id="s_submit" title="Search"></span>
</form>
<div id="search_suggestions"></div>
</div>
<div id="wrap"><div id="cover"></div><div id="map"></div></div>
</div>
</div>
<!--[if gt IE 9]><!-->
<script><?php /*if (window.navigator.standalone) { document.getElementById("c").style.paddingTop="10px";} // check for iOS app mode */

	echo "var modernBrowser = " . (( preg_match('/bot|crawl|slurp|spider/i', $_SERVER['HTTP_USER_AGENT']))?"true":"false") . ";";
	echo "var geocoding = ". ($cityExists?"true":"false") . ";";
	echo "var cacheBuster = '". $cacheBuster . "';";
	if($cityExists){
		echo "var city = '" . $city . "';";
	}
	if($countryExists){
		echo "var country = '" . $country . "';";
	}
	require_once("js/inline.min.js");
?></script>
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.17&key=AIzaSyA7OxxJkLDCwBo8FX4yY6lNxjn6u4CJeR8&libraries=places"></script>
<script async type="text/javascript" src="/js/s.min.<?php /*echo $cacheBuster . ".";*/ ?>js"></script>
<!--<![endif]-->
</body>
</html>
