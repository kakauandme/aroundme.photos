<?php
header("Content-Type: text/cache-manifest");
include_once("config.php")
?>
CACHE MANIFEST
# <?php echo $cacheBuster ?>

# Explicitly cached 'master entries'.
CACHE:

#fonts
/f/l.woff2
/f/r.woff2

#scripts
/js/s.min.<?php echo $cacheBuster; ?>.js


#css
/css/footer.<?php echo $cacheBuster; ?>.css

#images
/img/config/favicon.ico
/img/config/apple-touch-icon-57x57.png
/img/config/apple-touch-icon-60x60.png
/img/config/apple-touch-icon-72x72.png
/img/config/apple-touch-icon-76x76.png
/img/config/apple-touch-icon-114x114.png
/img/config/apple-touch-icon-120x120.png
/img/config/apple-touch-icon-144x144.png
/img/config/apple-touch-icon-152x152.png
/img/config/apple-touch-icon-180x180.png


/img/config/favicon-16x16.png
/img/config/favicon-32x32.png
/img/config/favicon-96x96.png
/img/config/favicon-128x128.png
/img/config/favicon-192x192.png


# Resources that require the user to be online.
NETWORK:
*