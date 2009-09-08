<?php

$toIgnore = ".";
$linkRoot = "http://www.php.net";

function provideXML($dir, $root)
{
	setIgnore($dir);
	setLinkRoot($root);
	$dom = new DOMDocument('1.0', 'utf-8');
	$dom->formatOutput = true;
	$directories = $dom->createElement('directories');
	$directories->setAttribute(name, 'fiddlerelf.com');
	$dom->appendChild($directories);
	buildXML($dir, $dom, $directories);
	$xml_result = $dom->saveXML();
	return $xml_result;

}

function buildXML( $path = '.', $dom, $currentNode, $level = 0)
{
    $ignore = array( '.', '..' );
    $files = array();
    $trueFiles = array();
	$counter = 0;
	$trueFilesCounter = 0;
    $dh = @opendir( $path );
    
    while( false !== ( $file = readdir( $dh ) ) )
    {
        if( !in_array( $file, $ignore ) )
        {
			 $files[$counter] = $file;
			 $counter++;
		}
	} 
	
	closedir( $dh );
	
	sort($files);
			 
	for ($i = 0; $i < sizeof($files); $i++)
	{
		$file = $files[$i];		 
        if( is_dir( "$path/$file" ) )
        {
			
            $newNode = $currentNode->appendChild($dom->createElement("directory"));
			$newNode->setAttribute(name, $file);
			$newNode->setAttribute(ext, "");
			$linkText = str_replace(getIgnore(), "", "$path/$file");
			$newNode->setAttribute(link, "$rootDir".getLinkRoot()."$linkText");
			$newNode->setAttribute(size, filesize($path/$file));
			$newNode->setAttribute(lastmodified, date ("n/d/Y g:i a", filemtime($path/$file)));
			$newNode->setAttribute(lastaccessed, date ("n/d/Y g:i a", fileatime($path/$file)));
			$newNode->setAttribute(type, filetype("$path/$file"));
            buildXML( "$path/$file", $dom, $newNode, ($level+1) ); 
        }
        else
        {
			$trueFiles[$trueFilesCounter] = $file;
			$trueFilesCounter++;
        }
	}
    
    for ($i = 0; $i < sizeof($trueFiles); $i++)
	{
		$file = $trueFiles[$i];		
        if( !is_dir( "$path/$file" ) )
        {
			$ext = getFileExtension($file);
            $newNode = $currentNode->appendChild($dom->createElement("file"));
			$newNode->setAttribute(name, $file);
			$linkText = str_replace(getIgnore(), "", "$path/$file");
			$newNode->setAttribute(link, "$rootDir".getLinkRoot()."$linkText");
			$newNode->setAttribute(fileext, $ext);
			$newNode->setAttribute(size, filesize("$path/$file"));
			$newNode->setAttribute(lastmodified, date ("n/d/Y g:i a", filemtime("$path/$file")));
			$newNode->setAttribute(lastaccessed, date ("n/d/Y g:i a", fileatime("$path/$file")));
			$newNode->setAttribute(type, filetype("$path/$file"));
			$imageInfo = getimagesize("$path/$file");
			$newNode->setAttribute(imagetype, $imageInfo[2]);
			$newNode->setAttribute(imagewidth, $imageInfo[0]);
			$newNode->setAttribute(imageheight, $imageInfo[1]);
        }       
	}
}

function getFileExtension($filename)
{	
	$pos = strrpos($filename, ".");
	if ($pos === false) 
	{ 
		return "";
	}
	else
	{
		// get ext
		return substr($filename, ($pos + 1));
		// get other half...
		//return substr($filename, 0, $pos);
	}
}

function getIgnore()
{
	global $toIgnore;
	return $toIgnore;
}

function setIgnore($ignore)
{
	global $toIgnore;
	$toIgnore = $ignore;
}

function setLinkRoot($root)
{
	global $linkRoot;
	$linkRoot = $root;
}

function getLinkRoot()
{
	global $linkRoot;
	return $linkRoot;
}

?>
