<?php 
require_once("includes/config.php");
?><!doctype html>
<html lang="en" manifest="/appcache.php">
<head>
<title><?php echo "Page not found | " . $siteName; ?></title>
<?php require_once("includes/header.php"); ?>
</head>
<body id="body" class="no-js">
<div id="container">
<div id="pusher">
<div id="c">		
<span>
<span id="header">
<h1><?php echo $siteName; ?></h1>
<h2>Page not found :(</h2>
</span>
</span>		    	
<span>
<?php require_once("includes/footer.php"); ?>
</span>			
</div>
</div>
</body>
</html>