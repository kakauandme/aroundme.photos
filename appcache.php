<?php
header("Content-Type: text/cache-manifest");
include_once("config.php");
?>CACHE MANIFEST
# <?php echo $cacheBuster; ?>

# Explicitly cached 'master entries'.
CACHE:

#fonts
/f/l.woff2
/f/r.woff2

#scripts
#/js/s.min.<?php/* echo $cacheBuster . "."; */?>js


#css
/css/footer.<?php/* echo $cacheBuster . "."; */?>css

#images
/img/config/favicon.ico


/img/config/android-chrome-192x192.png

# Resources that require the user to be online.
NETWORK:
*