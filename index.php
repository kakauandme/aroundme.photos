<?php 

$title = 'Around me photos';
$subtitle = 'Explore social activity next to you';
$description = 'Checkout real-time updates from Instagram around your location on a map and discover what is happening in your area';

?>
<!DOCTYPE html>
<!--[if lt IE 9]><html class="no-js ie"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

	<title><?php echo $title . " | " . $subtitle; ?></title>

	<!-- SEO -->
	<meta name="description" content="<?php echo $description; ?>">
	<!-- <meta name="keywords" content="map, Instagram, location, photos, pictures, images"> -->

	<!-- CSS -->
	<link rel="stylesheet" href="/css/header.css">
<!--	<style>
		@font-face{font-family:L;src:url("/f/l.eot");src:url("/f/l.eot?#iefix") format("eot"),url("/f/l.woff") format("woff"),url("/f/l.ttf") format("truetype"),url("/f/l.svg") format("svg");font-weight:normal;font-style:normal}body{color:#8c8f91;font-family:L,sans-serif;font-weight:normal;text-align:left}html{font-size:125%;line-height:1.7em}h1{color:#f74552;font-size:3.4em;font-weight:normal;line-height:1.325em;margin:34px 0 34px}h2{color:#1a75cf;font-size:1.2em;font-weight:normal;line-height:1.41667em;margin:34px 0 34px}p,em,strong{font-size:1em;line-height:1.7em}a{color:#fff5a1;text-decoration:none}a:hover{text-decoration:underline}@media (min-width: 0){body{font-size:0.7em}}@media (min-width: 768px){body{font-size:0.8em}}@media (min-width: 960px){body{font-size:0.9em}}@media (min-width: 1200px){body{font-size:1em}}
body.dev:after{position:fixed;z-index:400;top:0;left:0;width:100%;text-align:center;display:block;color:#fff5a1;background:#414b56;opacity:0.9}@media (min-width: 0){body.dev:after{content:"mouse"}}@media (min-width: 768px){body.dev:after{content:"kitten"}}@media (min-width: 960px){body.dev:after{content:"horse"}}@media (min-width: 1200px){body.dev:after{content:"elephant"}}
html{height:100%;-webkit-text-size-adjust:100%}body{height:100%;margin:0}#c{width:100%;height:100%;display:table;background-color:#24292e;opacity:0.95;-webkit-transition:opacity 1s ease-in;transition:opacity 1s ease-in}.dev #c{opacity:1 !important;display:table !important}.ready #c{opacity:0}.complete #c{display:none}#c>span{display:table-row}#c>span>span{padding:1em;display:table-cell;text-align:right}#browserhappy{padding:0;vertical-align:top;text-align:center}#browserhappy p{background-color:#414b56;padding:1em}#header{vertical-align:middle;height:100%}#header .devtext{display:none;color:#66d43d}.dev #header .devtext{display:inline}#footer{vertical-align:bottom}
	</style> -->


	<!--[if lt IE 9]>
		<link rel="stylesheet" href="/css/ie.css">
	<![endif]-->

	<!--browsers -->
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

	<!-- iOS -->
	<link rel="apple-touch-icon" href="/apple-touch-icon.png">

	<meta name="apple-mobile-web-app-capable" content="yes">

	<meta name="apple-mobile-web-app-title" content="<?php echo $title; ?>">

	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

	<!-- Android -->
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196">

	<!-- MS Tiles -->
	<meta name="application-name" content="<?php echo $title; ?>"/>
	<meta name="msapplication-config" content="browserconfig.xml" />
	<meta name="msapplication-TileColor" content="#1a75cf">
	<meta name="msapplication-TileImage" content="/mstile-144x144.png">


	<!-- Twitter cards -->
	<!-- https://dev.twitter.com/docs/cards/large-image-summary-card -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:creator" content="@kakauandme">
	<meta name="twitter:title" content="<?php echo $title . " - " . $subtitle; ?>">
	<meta name="twitter:description" content="<?php echo $description; ?>">
	<meta name="twitter:image:src" content="/img/screenshot_sml.png">

	<!-- Facebook OG -->
	<!-- https://developers.facebook.com/docs/opengraph/howtos/maximizing-distribution-media-content -->
	<meta property="og:title" content="<?php echo $subtitle; ?>" />
	<meta property="og:site_name" content="<?php echo $title; ?>"/>
	<meta property="og:url" content="http://aroundme.photos/" />
	<meta property="og:description" content="<?php echo $description; ?>" />
	<meta property="fb:app_id" content="587080064742659" />
	<meta property="og:type" content="website" />
	<meta property="article:author" content="https://www.facebook.com/kirill.kliavin" />
	<meta property="og:image" content="/img/screenshot_lrg.png" /> 


	<!-- Google+ Schema.org microdata	 -->
	<meta itemprop="image" content="/img/screenshot_lrg.png">

</head>
<body id="body" itemscope itemtype="http://schema.org/Website">
	<div id="container">
		<div id="pusher">
			<div id="c">
				<!--[if lt IE 9]>
					<span>
						<span id="browserhappy">
							<p>You are using an <strong>outdated</strong> browser.<br>Please <a href="http://browsehappy.com/">upgrade your browser</a> to use this website.</p>
						</span>
					</span>
				<![endif]-->
				<span>
		    		<span id="social">
						<p>
							<a href="https://twitter.com/share?url=http://aroundme.photos/&hashtags=aroundmephotos&text=<?php echo $subtitle; ?>" target="_blank" title="Tweet">
								<?php include("img/twitter.svg"); ?>
								<!-- <img src="img/iconmonstr-twitter-4-icon.svg" alt="Twitter icon" /> -->
							</a>
							<a href="https://plus.google.com/share?url=http://aroundme.photos/" target="_blank"  title="Share on Google+">
								<?php include("img/google-plus.svg"); ?>
								<!-- <img src="img/iconmonstr-google-plus-4-icon.svg" alt="Google+ icon" /> -->
							</a>
							<a href="https://www.facebook.com/dialog/feed?app_id=587080064742659&display=popup&link=http://aroundme.photos/&redirect_uri=http://aroundme.photos/" target="_blank" title="Share on Facebook">
								<?php include("img/facebook.svg"); ?>
								<!-- <img src="img/iconmonstr-facebook-4-icon.svg" alt="Facebook icon" /> -->
							</a>							
							<a href="https://github.com/kakauandme/aroundme.photos" target="_blank" title="View on Github">
								<?php include("img/github.svg"); ?>
							<!-- 	<img src="img/iconmonstr-github-9-icon.svg" alt="Github icon" /> -->
							</a>
						</p>
					</span>
				</span>				
		      	<span>
		      		<span id="header">
		    			<h1 itemprop="name"><?php echo $title; ?></h1>
		    			<h2><?php echo $subtitle; ?>.</h2>
		    			<p id="description" itemprop="description">Checkout real-time updates around your location <br>and discover what is happening.</p>
		    			<p id="devtext"><em>More features are coming soon ...</em></p>
		    		</span>
		    	</span>		    	
		    	<span>
		    		<span id="footer">
						<p>
							<a href="mailto:kirill@studiothick.com?subject=aroundme.photos">@kakauandme</a>
							from
							<a href="//www.studiothick.com.au/" title="Studio Thick" target="_blank">Thick</a>
							Copyright &copy; <?php echo date("Y") ?>
						</p>
					</span>
				</span>
				<div id="timer"><p>0.0</p></div>
				<div id="hamburger" title="Navigation">
				  <span></span>
				</div>
			</div>
			<div id="map"></div>
		</div>
	</div>
	<!--[if gt IE 8]><!-->
	
	<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAdTpn_GSHnRcfX3vd6jcfibpJMpICcJW4"></script>

	<script type="text/javascript" src="/js/s.min.js"></script>	
	<!--<![endif]-->

	<script>

		// function loadResources() {
			
		// 	// CSS
		// 	 var stylesheet = document.createElement('link');
  //         	stylesheet.href = '/css/footer.css';
  //         	stylesheet.rel = 'stylesheet';
  //         	stylesheet.type = 'text/css';
  //         	document.getElementsByTagName('head')[0].appendChild(stylesheet);


  //         	// JS
  //     		var script = document.createElement('script');
		// 	script.type = 'text/javascript';
		// 	script.src = '/js/s.min.js';
		// 	document.body.appendChild(script);

		// }
		// window.onload = loadResources; 


  		// GA 
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-40067737-9', 'aroundme.photos');
		ga('require', 'displayfeatures');
		ga('send', 'pageview');
	</script>
</body>
</html>