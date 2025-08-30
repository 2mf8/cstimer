<?php
$version = "2025.08.02";

function prefered_language($available_languages, $req_lang) {
  if ($req_lang == "auto" && isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $req_lang = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
  }
  $req_lang = strtolower($req_lang);
  foreach ($available_languages as $avail_lang) {
    if (substr($req_lang, 0, 5) == $avail_lang) {
      return $avail_lang;
    }
  }
  foreach ($available_languages as $avail_lang) {
    if (substr($req_lang, 0, 2) == substr($avail_lang, 0, 2)) {
      return $avail_lang;
    }
  }
  return 'en-us';
}

if (isset($_REQUEST["lang"]) && !empty($_REQUEST["lang"])) {
  $req_lang = $_REQUEST['lang'];
} else if (isset($_COOKIE["lang"]) && !empty($_COOKIE["lang"])) {
  $req_lang = $_COOKIE['lang'];
} else {
  $req_lang = "auto";
}
if ($req_lang == "cn") {
  $req_lang = "zh-cn";
}

$lang = prefered_language(array("zh-cn"), $req_lang);

if ($lang == "zh-cn") { ?>
  <meta name="keywords" content="计时器, cstimer, 魔方计时器, 在线计时器, 网页计时器">
  <title> csTimer (孙氏魔方中文标记版) - 魔方竞速训练专用计时器 </title>
<?php } else { ?>
  <meta name="keywords" content="timer, cstimer, rubiks cube timer, online timer, web timer">
  <title> csTimer - Professional Rubik's Cube Speedsolving/Training Timer </title>
<?php } ?>
  <script type="text/javascript">
var CSTIMER_VERSION = '<?php echo $version; ?>';
var LANG_SET = '|zh-cn';
var LANG_STR = '简体中文';
var LANG_CUR = '<?php echo $lang; ?>';
<?php include('lang/'.$lang.'.js');?>
  </script>
