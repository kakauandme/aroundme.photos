<?php 

$title = 'Around me photos';

?>
<!DOCTYPE html>
<!--[if lt IE 9]><html class="ie"> <![endif]-->
<!--[if gt IE 8]><!--> <html> <!--<![endif]-->
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
	
	<title><?php echo "Page not found | " . $title; ?></title>
	
	<!-- CSS -->
	<style>
		@font-face{font-family:L;src:url("/f/l.eot");src:url("/f/l.eot?#iefix") format("eot"),url("/f/l.woff") format("woff"),url("/f/l.ttf") format("truetype"),url("/f/l.svg") format("svg");font-weight:normal;font-style:normal}@media (min-width: 0){body{font-size:0.6em}}@media (min-width: 768px){body{font-size:0.75em}}@media (min-width: 960px){body{font-size:0.8em}}@media (min-width: 1200px){body{font-size:1em}}
		html{font-size:125%;line-height:1.7em}body{color:#8c8f91;font-family:L,sans-serif}h1,.likes{color:#f74552;font-size:3.4em;font-weight:normal;line-height:1.325em;margin:34px 0 34px}h2{color:#1a75cf;font-size:1.2em;font-weight:normal;line-height:1.41667em;margin:34px 0 34px}p,em,strong{font-size:1em;font-weight:normal;font-style:normal;line-height:1.7em;margin:0 0 34px}a{color:#fff5a1;text-decoration:none}a:hover{text-decoration:underline}.ie #browserhappy,.no-js #browserhappy{display:table-cell !important;padding:0 !important;vertical-align:top}.ie #browserhappy p,.no-js #browserhappy p{background-color:#4f007d;padding:1em}html{height:100%;-webkit-text-size-adjust:100%}body,#container,#pusher{height:100%;margin:0}#c{position:relative;width:100%;height:100%;display:table;background-color:#24292e}#c>span{display:table-row}#c>span>span{padding:1em;display:table-cell;text-align:right}#pusher{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}#header{vertical-align:middle;height:100%}#footer{vertical-align:bottom}#footer p{margin-bottom:0}#timer{bottom:0;position:absolute;padding:1em;color:#414b56}#timer p{margin-bottom:0}#description{color:#66d43d}#social a,#devtext,#c>span>span#browserhappy{display:none}

	</style>

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


</head>
<body id="body" class="no-js" itemscope itemtype="http://schema.org/Website">
	<div id="container">
		<div id="pusher">
			<div id="c">				
				<span>
					<span id="browserhappy">
						<!--[if lt IE 9]>
							<p>You are using an <strong>outdated</strong> browser. <br>Please <a href="http://www.google.com/chrome/browser/"  target="_blank">upgrade your browser</a> to use this website.</p>
						<![endif]-->
						<noscript>
							<p>JavaScript is <strong>disabled</strong>. <br>Please <a href="http://www.enable-javascript.com/" target="_blank">enable it in browser settings</a> to use this website.</p>
						</noscript>
					</span>
				</span>				
				<span>
					<span id="header">
						<h1 itemprop="name"><?php echo $title; ?></h1>
						<h2>404 Page not found :(</h2>
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
		</div>
	</div>
</body>
</html>