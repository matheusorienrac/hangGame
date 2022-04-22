<?php 

	$ip = "localhost";
	$usuario = "root";
	$senha = "";	
	$max;
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
	$teste = rand(1,7);
	if($teste==1){
			$sql = "select * from animal";
			$dica = "Animal";
			}
	if($teste==2){	
			$sql = "select * from cep";
			$dica = "Cep";
			}
	if($teste==3){	
			$sql = "select * from comida";
			$dica = "Comida";
			}
	if($teste==4){	
			$sql = "select * from filme";
			$dica = "Filme";
			}
			if($teste==5){	
			$sql = "select * from nome";
			$dica = "Nome";
			}
			if($teste==6){	
			$sql = "select * from objetos";
			$dica = "Objetos";
			}
			if($teste==7){	
			$sql = "select * from profissao";
			$dica = "Profissao";
			}			
	$resp = mysql_query($sql);
	if(!$resp)
	{
		echo "ERRO";
		echo mysql_error();
		mysql_close($c);
		die();
	}
	$resp2 = mysql_query("SELECT COUNT(*) FROM $dica");
	while ($rec = mysql_fetch_array($resp2))
		{
			$max = $rec[0];	
		}
	$teste2 = rand(1,$max);
		$linha = $teste2;	
	if(!$linha)
	{
		echo "Vazio";
	}
	else
	{
		    while($teste2 > 0)
			{
			$linha = mysql_fetch_assoc($resp);
			$teste2--;
			}
	}
	$word = $linha["Palavra"];
	$dica = strtoupper($dica);
	echo '<script type="text/javascript">var word = ' . "\"$word\"" . ";</script>";
	echo '<script type="text/javascript">var category =' . "\"$dica\"" . ";</script>";
	mysql_close($c);

require "game.html";
