<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
    request.setCharacterEncoding("utf-8");
	
	response.setHeader("Cache-Control", "no-store, no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>

<!DOCTYPE html -ms-overflow-style: scrollbar;>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="">
  <meta name="copyright" CONTENT="">
  <meta name="URL" content="">

  <meta property="og:url" content="" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />
  <meta property="og:image" content="" />

  <title>台北富邦銀行 | 就學貸款</title>
  <link rel="shortcut icon" href="img/favicon.ico?v=2">
  <link rel="shortcut icon" href="http://garden.decoder.com.tw/portal/demo/fubon/img/favicon.ico">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/bootstrap-select.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/customize.css">
  <link rel="stylesheet" href="css/processBar.css">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="js/html5shiv.min.js"></script>
  <script src="js/respond.min.js"></script>
  <![endif]-->
  
  
  <link rel="stylesheet" href="css/loading/fonts.css">
  <link rel="stylesheet" href="css/loading/layout.css">
  
  <!--[if IE]>
  <link rel="stylesheet" type="text/css" href="css/ie.css">
  <![endif]-->
	
	
	<script>
	//for browser setting
if(window.console == undefined) {
    var em = function(){};
    window.console = {log: em, debug: em, info: em, warn: em};
}


if (typeof(console) == '') {
    var em = function(){};
    console = {log: em, debug: em, info: em, warn: em};
}

if(console.log == undefined || console.log == 'undefined') {
    var em = function(){};
    console.log = em;
}

if(console.debug == undefined || console.debug == 'undefined') {
    var em = function(){};
    console.debug = em;
}

if(console.info == undefined || console.info == 'undefined') {
    var em = function(){};
    console.info = em;
}

if(console.warn == undefined || console.warn == 'undefined') {
    var em = function(){};
    console.warn = em;
}


//for fix ie8 no Object.keys function
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}


if (typeof(Array.prototype.indexOf) === 'undefined') {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
	</script>
	
	<script src="js/jquery.min.js"></script>
	<!--
	<script src="js/jquery-ui.min.js"></script>
	-->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bootstrap-select.min.js"></script>
    <script src="js/jquery.mmenu.all.min.js"></script>
    <script src="js/prog/modal.js"></script>
    <script src="js/prog/GardenUtils.js"></script>
    <script src="js/prog/flow.js"></script>
    <script src="js/prog/linkage.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/prog/bootstrap_select_arrow.js"></script>
	<!--
    <script src="js/bootstrap-slider.min.js"></script>
	-->

	<script src="js/bootstrap-slider.js"></script>
</head>