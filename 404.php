<?php 

$title = 'Around me photos';

?><!doctype html>
<html lang="en" manifest="/appcache.php">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
<title><?php echo "Page not found | " . $title; ?></title>
<?php /*CSS */ ?>
<style>
@font-face{font-family:L;src:url("/f/l.woff2") format("woff2"),url("/f/l.woff") format("woff");font-weight:normal;font-style:normal}@media (min-width: 0){body{font-size:0.6em}}@media (min-width: 768px){body{font-size:0.75em}}@media (min-width: 960px){body{font-size:0.8em}}@media (min-width: 1200px){body{font-size:1em}}
html{font-size:125%;line-height:1.7em}body{color:#8c8f91;font-family:L,sans-serif}h1,.likes{color:#f74552;font-size:3.4em;font-weight:normal;line-height:1.325em;margin:0.7em 0 0.7em}h2{color:#1a75cf;font-size:1.2em;font-weight:normal;line-height:1.41667em;margin:1em 0 1em}p,em,strong{font-size:1em;font-weight:normal;font-style:normal;line-height:1.7em;margin:0 0 1em}#social p,#social em,#social strong{margin:0}a{color:#fff5a1;text-decoration:none}a:hover{text-decoration:underline}#browserhappy{display:none}.ie #browserhappy,.no-js #browserhappy{display:block;position:absolute;top:0;left:0;width:100%;text-align:right}.ie #browserhappy p,.no-js #browserhappy p{background-color:#4f007d;padding:1em}html{height:100%;-webkit-text-size-adjust:100%}body,#container,#pusher{height:100%;margin:0}.ie body{height:auto;background-color:#24292e}#container{overflow:hidden}#c{position:relative;width:100%;height:100%;display:table;background-color:#24292e}#c>span{display:table-row}#c>span>span{padding:1em;display:table-cell;text-align:right}#pusher{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}#header{vertical-align:middle;height:100%}#footer{vertical-align:bottom}#footer p{margin-bottom:0}#timer{bottom:0;position:absolute;padding:1em;color:#414b56}#timer p{margin-bottom:0}#description{color:#66d43d}#wrap{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-transform:translate3d(100%, 0, 0);transform:translate3d(100%, 0, 0)}#wrap #map{height:100%}#social a,#devtext,#c>span>span#browserhappy{display:none}
</style>
<?php /*browsers */ ?>
<link rel="shortcut icon" href="/img/config/favicon.ico" type="image/x-icon">
</head>
<body id="body" class="no-js">
	<div id="container">
		<div id="pusher">
			<div id="c">		
				<span>
					<span id="header">
						<h1><?php echo $title; ?></h1>
						<h2>Page not found :(</h2>
					</span>
				</span>		    	
				<span>
					<span id="footer">
						<p>
							<a href="mailto:kirill@studiothick.com?subject=aroundme.photos">@kakauandme</a>
							from
							<a href="//www.studiothick.com/" title="Studio Thick" target="_blank">Thick</a>
							Copyright &copy; <?php echo date("Y") ?>
						</p>
					</span>
				</span>			
		</div>
	</div>
</body>
</html>