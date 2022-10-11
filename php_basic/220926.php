<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title>PHPテスト</title>
</head>
<body>

<p>PHPのテストです。</p>

<pre>
<?php
$maker = array('富士通', 'NEC', 'Sony', 'Sharp');
$type = array('Note', 'Desktop');
$pc = array($maker, $type);

print_r($pc);

print '$pc[0][1] = '.$pc[0][1].'<br />';
print '$pc[1][0] = '.$pc[1][0].'<br />';

// ----

class SimpleClass
{
    // プロパティの宣言
    public $str1 = 'a default value';

    // メソッドの宣言
    public function displayVar() {
        echo $this->str1;
    }
}

$simple = new SimpleClass();

$property_name = "str1";

print 'str1 = '.$simple->$property_name.'<br />';

?>
</pre>

</body>
</html>