<?php require("fx.php"); ?>
<?php

$xmldoc = provideXML("../", "http://wxplorer.sourceforge.net/");

// simple mechanism to see the XML

header('Content-Type: text/xml');
echo $xmldoc;

//print <<<XML_SHOW
//$xmldoc
//XML_SHOW;

?>
