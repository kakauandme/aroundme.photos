<?php
include_once("config.php");
?><!DOCTYPE html>
<!--[if lt IE 10]><html class="ie" lang="en" itemscope itemtype="http://schema.org/Website"> <![endif]-->
<!--[if gt IE 9]><!--><html lang="en" itemscope itemtype="http://schema.org/Website"><!--<![endif]-->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
<title><?php echo $pageTitle; ?></title>
<?php /*SEO */ ?>
<meta name="description" content="<?php echo $description; ?>" itemprop="description">
<link rel="canonical" href="<?php echo $baseURL; ?>" itemprop="url">
<?php /*Pingdom */ ?>
<script>var _prum = [['id', '5540e633abe53d0e396d576c'],['mark', 'firstbyte', (new Date()).getTime()]];</script>
<?php /*CSS */ ?>
<style>
@font-face{font-family:L;src:url("/f/l.woff") format("woff"),url("/f/l.ttf") format("truetype"),url("/f/l.svg") format("svg");font-weight:normal;font-style:normal}@media (min-width: 0){body{font-size:0.6em}}@media (min-width: 768px){body{font-size:0.75em}}@media (min-width: 960px){body{font-size:0.8em}}@media (min-width: 1200px){body{font-size:1em}}
html{font-size:125%;line-height:1.7em}body{color:#8c8f91;font-family:L,sans-serif}h1,.likes{color:#f74552;font-size:3.4em;font-weight:normal;line-height:1.325em;margin:0.7em 0 0.7em}h2{color:#1a75cf;font-size:1.2em;font-weight:normal;line-height:1.41667em;margin:1em 0 1em}p,em,strong{font-size:1em;font-weight:normal;font-style:normal;line-height:1.7em;margin:0 0 1em}#social p,#social em,#social strong{margin:0}a{color:#fff5a1;text-decoration:none}a:hover{text-decoration:underline}#browserhappy{display:none}.ie #browserhappy,.no-js #browserhappy{display:block;position:absolute;top:0;left:0;width:100%;text-align:right}.ie #browserhappy p,.no-js #browserhappy p{background-color:#4f007d;padding:1em}html{height:100%;-webkit-text-size-adjust:100%}body,#container,#pusher{height:100%;margin:0}.ie body{height:auto;background-color:#24292e}#container{overflow:hidden}#c{position:relative;width:100%;height:100%;display:table;background-color:#24292e}#c>span{display:table-row}#c>span>span{padding:1em;display:table-cell;text-align:right}#pusher{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}#header{vertical-align:middle;height:100%}#footer{vertical-align:bottom}#footer p{margin-bottom:0}#timer{bottom:0;position:absolute;padding:1em;color:#414b56}#timer p{margin-bottom:0}#description{color:#66d43d}#wrap{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-transform:translate3d(100%, 0, 0);transform:translate3d(100%, 0, 0)}#wrap #map{height:100%}#social a,#devtext,#c>span>span#browserhappy{display:none}
</style>
<?php /*browsers */ ?>
<link rel="shortcut icon" href="/img/setup/favicon.ico" type="image/x-icon">
<?php /*iOS */ ?>
<link rel="apple-touch-icon" href="/img/setup/apple-touch-icon.png">
<?php /* STARTUP IMAGES */ ?>
<?php /* iPad retina portrait startup image */ ?>
<link href="/img/setup/iPadRetinaPortrait.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" rel="apple-touch-startup-image">
<?php /* iPad retina landscape startup image */ ?>
<link href="/img/setup/iPadRetinaLandscape.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" rel="apple-touch-startup-image">
<?php /* iPad non-retina portrait startup image */ ?>
<link href="/img/setup/iPadPortrait.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)" rel="apple-touch-startup-image">
<?php /* iPad non-retina landscape startup image */ ?>
<link href="/img/setup/iPadRetinaLandscape.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)" rel="apple-touch-startup-image">
<?php /* iPhone 6 Plus portrait startup image */ ?>
<link href="/img/setup/iPhone6PlusPortrait.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" rel="apple-touch-startup-image">
<?php /* iPhone 6 Plus landscape startup image */ ?>
<link href="/img/setup/iPhone6PlusLandscape.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" rel="apple-touch-startup-image">
<?php /* iPhone 6 startup image */ ?>
<link href="/img/setup/iPhone6.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<?php /* iPhone 5 startup image */ ?>
<link href="/img/setup/iPhone5.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<?php /* iPhone < 5 retina startup image */ ?>
<link href="/img/setup/iPhone4.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<?php /* iPhone < 5 non-retina startup image */ ?>
<link href="/img/setup/iPhone3.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="<?php echo $siteName; ?>">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<?php /*Android */ ?>
<meta name="mobile-web-app-capable" content="yes">
<link rel="icon" type="image/png" href="/img/setup/favicon-196x196.png" sizes="196x196">
<?php /*MS Tiles */ ?>
<meta name="application-name" content="<?php echo $siteName; ?>"/>
<meta name="msapplication-config" content="browserconfig.xml" />
<meta name="msapplication-TileColor" content="#1a75cf">
<meta name="msapplication-TileImage" content="/img/setup/mstile-144x144.png">
<?php /*Twitter cards */ ?>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@kakauandme">
<meta name="twitter:title" content="<?php echo $twitterTitle; ?>">
<meta name="twitter:description" content="<?php echo $description; ?>">
<meta name="twitter:image:src" content="<?php echo $baseURL; ?>/img/screenshot_sml.png">
<?php /*Facebook OG */ ?>
<meta property="og:title" content="<?php echo $socialTitle; ?>" />
<meta property="og:site_name" content="<?php echo $siteName; ?>"/>
<meta property="og:url" content="<?php echo $baseURL; ?>" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="fb:app_id" content="587080064742659" />
<meta property="og:type" content="website" />
<meta property="og:image" content="<?php echo $baseURL; ?>/img/screenshot_lrg.png" />
<?php /*Google+ Schema.org microdata */ ?>
<meta itemprop="image" content="<?php echo $baseURL; ?>/img/screenshot_lrg.png">
</head>
<body id="body" class="no-js">
<div id="container">
<div id="pusher">
<div id="c">
<span>
<span id="social">
<p>&nbsp;
<a href="https://twitter.com/share?hashtags=aroundmephotos&text=Checkout real-time updates on a map and discover what is happening." target="_blank" title="Tweet">
<?php include("img/twitter.svg"); ?>
</a><?php /*
<a href="https://plus.google.com/share?url=<?php echo $URL; ?>" target="_blank" title="Share on Google+">
<?php include("img/google-plus.svg"); ?>
</a>
*/ ?><a href="https://www.facebook.com/dialog/share?app_id=587080064742659&display=popup&href=##URL##&redirect_uri=http://aroundme.photos/#_=_" onclick="window.open(this.href.replace('##URL##', document.URL), 'mywin', 'left=20,top=20,width=500,height=500,toolbar=0,resizable=0'); return false;" title="Share on Facebook">
<?php include("img/facebook.svg"); ?>
</a><a href="https://github.com/kakauandme/aroundme.photos#aroundmephotos" target="_blank" title="View on Github">
<?php include("img/github.svg"); ?>
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
<p><a href="mailto:kirill@studiothick.com?subject=aroundme.photos" title="Author">@kakauandme</a>
from
<a href="//www.studiothick.com/" title="Studio Thick" target="_blank">Thick</a>
Copyright &copy; <?php echo date("Y") ?>
</p>
</span>
</span>
<div id="timer"><p>&nbsp;</p></div>
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
<script>
if (window.location.hash == '#_=_'){window.close();}//facebook popup
if (window.navigator.standalone) { document.getElementById("c").style.paddingTop="10px";} // check for iOS app mode
var body = document.getElementById("body"); body.className = ""; //remove no-js
<?php
	echo "var modernBrowser = " . (( preg_match('/bot|crawl|slurp|spider/i', $_SERVER['HTTP_USER_AGENT']))?"true":"false") . ";";
	echo "var geocoding = ". ($cityExists?"true":"false") . ";";
	echo "var cacheBuster = ". $cacheBuster . ";";

	if($cityExists){
		echo "var city = '" . $city . "';";
	}
	if($countryExists){
		echo "var country = '" . $country . "';";
	}
?></script>
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.17&key=AIzaSyAdTpn_GSHnRcfX3vd6jcfibpJMpICcJW4&libraries=places"></script>
<script async type="text/javascript" src="/js/s.min.js?v=<?php echo $cacheBuster; ?>"></script>
<!--<![endif]-->
</body>
</html>
