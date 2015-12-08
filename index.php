<?php
require_once("includes/config.php");
?><!doctype html>
<!--[if lt IE 10]><html class="ie" lang="en" itemscope itemtype="http://schema.org/Website"> <![endif]-->
<!--[if gt IE 9]><!--><html lang="en" itemscope itemtype="http://schema.org/Website" <?php /**/ echo 'manifest="/appcache.php"'; ?>><!--<![endif]-->
<head>
<title><?php echo $pageTitle; ?></title>
<?php require_once("includes/header.php"); ?>
</head>
<?php flush(); ?>
<body id="body" class="no-js">
<div id="container">
<div id="pusher">
<div id="c"><?php /*
<span>
<span id="social">
<p>&nbsp;
<a href="https://twitter.com/share?hashtags=aroundmephotos&text=Check out real-time updates on a map and discover what is happening." target="_blank" title="Tweet">
<?php require_once("img/twitter.svg"); ?>
</a>
<a href="https://plus.google.com/share?url=<?php echo $URL; ?>" target="_blank" title="Share on Google+">
<?php require_once("img/google-plus.svg"); ?>
</a>
<a href="https://www.facebook.com/dialog/share?app_id=587080064742659&display=popup&href=##URL##&redirect_uri=http://aroundme.photos/#_=_" onclick="window.open(this.href.replace('##URL##', document.URL), 'mywin', 'left=20,top=20,width=500,height=500,toolbar=0,resizable=0'); return false;" title="Share on Facebook">
<?php require_once("img/facebook.svg"); ?>
</a>
<a href="https://chrome.google.com/webstore/detail/around-me-photos/ocegikblkfamikbdhblhlbfpmlcpbbkl" target="_blank" title="Available in the Chrome web store">
<?php require_once("img/chrome.svg"); ?>
</a>
<a href="https://github.com/kakauandme/aroundme.photos#aroundmephotos" target="_blank" title="View on Github">
<?php require_once("img/github.svg"); ?>
</a>
</p>
</span>
</span>
*/?><span>
<span id="header">
<h1 itemprop="name" id="title"><?php echo $title; ?></h1>
<h2 id="subtitle"><?php echo $subtitle; ?>.</h2>
<p id="description">Check out real-time photo updates on a map <br> and discover what is happening.</p>
</span>
</span>
<span>
<?php require_once("includes/footer.php"); ?>
</span>
<div id="timer"><p>v0.<?php echo $_SERVER["CURRENT_VERSION_ID"]; ?></p></div>
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

	//echo "var modernBrowser = " . (( preg_match('/bot|crawl|slurp|spider/i', $_SERVER['HTTP_USER_AGENT']))?"true":"false") . ";";
	echo "var city = ". ($city?"'".$city."'":"false").";";
	echo "var country = ". ($country?"'".$country."'":"false").";";
	echo "var moveToCurPos = (!city);";
	echo "var lat = " . $lat . ";";
	echo "var lng = " . $lng . ";";
	require_once("js/inline.min.js");
?></script>
<script async defer type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.22&key=AIzaSyA7OxxJkLDCwBo8FX4yY6lNxjn6u4CJeR8&libraries=places&callback=domReady"></script>
<!--<![endif]-->
</body>
</html>
