<?php
$title = 'Around me photos';
$subtitle = 'Explore social activity next to you';
$description = 'Checkout real-time updates in your area and discover what is happening.';
$SEO = "Check out real-time Instagram updates in your area and discover what is happening around you through pictures and images taken by people in your nearby location";
?>
<!DOCTYPE html>
<!--[if lt IE 10]><html class="ie" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimal-ui" />
<title><?php echo $title . " | " . $subtitle; ?></title>
<?php /*SEO */ ?>
<meta name="description" content="<?php echo $SEO; ?>">
<?php /*CSS */ ?>
<style>
@font-face{font-family:L;src:url("/f/l.eot");src:url("/f/l.eot?#iefix") format("eot"),url("/f/l.woff") format("woff"),url("/f/l.ttf") format("truetype"),url("/f/l.svg") format("svg");font-weight:normal;font-style:normal}@media (min-width: 0){body{font-size:0.6em}}@media (min-width: 768px){body{font-size:0.75em}}@media (min-width: 960px){body{font-size:0.8em}}@media (min-width: 1200px){body{font-size:1em}}
html{font-size:125%;line-height:1.7em}body{color:#8c8f91;font-family:L,sans-serif}h1,.likes{color:#f74552;font-size:3.4em;font-weight:normal;line-height:1.325em;margin:0.7em 0 0.7em}h2{color:#1a75cf;font-size:1.2em;font-weight:normal;line-height:1.41667em;margin:1em 0 1em}p,em,strong{font-size:1em;font-weight:normal;font-style:normal;line-height:1.7em;margin:0 0 1em}#social p,#social em,#social strong{margin:0}a{color:#fff5a1;text-decoration:none}a:hover{text-decoration:underline}#browserhappy{display:none}.ie #browserhappy,.no-js #browserhappy{display:block;position:absolute;top:0;left:0;width:100%;text-align:right}.ie #browserhappy p,.no-js #browserhappy p{background-color:#4f007d;padding:1em}html{height:100%;-webkit-text-size-adjust:100%}body,#container,#pusher{height:100%;margin:0}.ie body{height:auto;background-color:#24292e}#container{overflow:hidden}#c{position:relative;width:100%;height:100%;display:table;background-color:#24292e}#c>span{display:table-row}#c>span>span{padding:1em;display:table-cell;text-align:right}#pusher{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}#header{vertical-align:middle;height:100%}#footer{vertical-align:bottom}#footer p{margin-bottom:0}#timer{bottom:0;position:absolute;padding:1em;color:#414b56}#timer p{margin-bottom:0}#description{color:#66d43d}#wrap{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-transform:translate3d(100%, 0, 0);transform:translate3d(100%, 0, 0)}#wrap #map{height:100%}#social a,#devtext,#c>span>span#browserhappy{display:none}
</style>
<?php /*browsers */ ?>
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<?php /*iOS */ ?>
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="apple-touch-startup-image" href="/apple-startup-image.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="<?php echo $title; ?>">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<?php /*Android */ ?>
<meta name="mobile-web-app-capable" content="yes">
<link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196">
<?php /*MS Tiles */ ?>
<meta name="application-name" content="<?php echo $title; ?>"/>
<meta name="msapplication-config" content="browserconfig.xml" />
<meta name="msapplication-TileColor" content="#1a75cf">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<?php /*Twitter cards */ ?>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@kakauandme">
<meta name="twitter:title" content="<?php echo $title . " - " . $subtitle; ?>">
<meta name="twitter:description" content="<?php echo $description; ?>">
<meta name="twitter:image:src" content="http://aroundme.photos/img/screenshot_sml.png">
<?php /*Facebook OG */ ?>
<meta property="og:title" content="<?php echo $subtitle; ?>" />
<meta property="og:site_name" content="<?php echo $title; ?>"/>
<meta property="og:url" content="http://aroundme.photos/" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="fb:app_id" content="587080064742659" />
<meta property="og:type" content="website" />
<meta property="og:image" content="http://aroundme.photos/img/screenshot_lrg.png" />
<?php /*Google+ Schema.org microdata */ ?>
<meta itemprop="image" content="http://aroundme.photos/img/screenshot_lrg.png">
</head>
<body id="body" class="no-js" itemscope itemtype="http://schema.org/Website">
<div id="container">
<div id="pusher">
<div id="c">
<span>
<span id="social">
<p>&nbsp;
<a href="https://twitter.com/share?url=http://aroundme.photos/&hashtags=aroundmephotos&text=<?php echo $subtitle; ?>" target="_blank" title="Tweet">
<?php include("img/twitter.svg"); ?>
</a>
<a href="https://plus.google.com/share?url=http://aroundme.photos/" target="_blank" title="Share on Google+">
<?php include("img/google-plus.svg"); ?>
</a>
<a href="https://www.facebook.com/dialog/feed?app_id=587080064742659&display=popup&link=http://aroundme.photos/&redirect_uri=http://aroundme.photos/" target="_blank" title="Share on Facebook">
<?php include("img/facebook.svg"); ?>
</a>
<a href="https://github.com/kakauandme/aroundme.photos#aroundmephotos" target="_blank" title="View on Github">
<?php include("img/github.svg"); ?>
</a>
</p>
</span>
</span>
<span>
<span id="header">
<h1 itemprop="name"><?php echo $title; ?></h1>
<h2><?php echo $subtitle; ?>.</h2>
<p id="description" itemprop="description">Checkout real-time updates around your location <br>and discover what is happening.</p>
</span>
</span>
<span>
<span id="footer">
<p>
<a href="mailto:kirill@studiothick.com?subject=aroundme.photos" title="Author">@kakauandme</a>
from
<a href="//www.studiothick.com.au/" title="Studio Thick" target="_blank">Thick</a>
Copyright &copy; <?php echo date("Y") ?>
</p>
</span>
</span>
<div id="timer"><p>&nbsp;</p></div>
<div id="browserhappy">
<!--[if lt IE 10]>
<p>You are using an <strong>outdated</strong> browser. <br>Please <a href="http://www.google.com/chrome/browser/" target="_blank">upgrade your browser</a> to use this website.</p>
<![endif]-->
<noscript>
<p>JavaScript is <strong>disabled</strong>. <br>Please <a href="http://www.enable-javascript.com/" target="_blank">enable it in browser settings</a> to use this website.</p>
</noscript>
</div>
</div>
<div id="hamburger" title="Info"><span></span></div>
<div id="wrap"><div id="map"></div></div>
</div>
</div>
<!--[if gt IE 9]><!-->
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAdTpn_GSHnRcfX3vd6jcfibpJMpICcJW4"></script>
<script async type="text/javascript" src="/js/s.min.js"></script>
<!--<![endif]-->
</body>
</html>