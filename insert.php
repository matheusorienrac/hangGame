<?php 

	$ip = "localhost";
	$usuario = "root";
	$senha = "";	
	$have = false;
	// mysql_connect($ip,$usuario,$senha) or die(mysql_error());
	$c = mysql_connect($ip,$usuario,$senha);
	if(!$c)
	{
		echo "ERRO";
		echo mysql_error();
		die();
	}

	if(!mysql_select_db("forca"))
	{
		echo "ERRO";
		echo mysql_error();
		mysql_close($c);
		die();
	}
	
	$word = $_GET[word];
	$category = $_GET[category];
	$result = mysql_query("SELECT * FROM $category");

	while($row = mysql_fetch_array($result))
	  {
	  if ($row['Palavra'] == $word){
		$have = true;
	}		
	  }
	if(!$have){
		mysql_query("INSERT INTO $category
		VALUES ('$word')");
		}

 header("Location: banco.php");
?>