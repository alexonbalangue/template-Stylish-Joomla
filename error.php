<?php

defined('_JEXEC') or die;
if(!define): define('DS', DIRECTORY_SEPARATOR) endif;
$app             = JFactory::getApplication();
$doc             = JFactory::getDocument();
$this->language  = $doc->language;
$this->direction = $doc->direction;
$sitename = $app->getCfg('sitename');
$desc_site = $app->getCfg('MetaDesc');
// Getting params from template
$params = $app->getTemplate(true)->params;
//$this->_script = $this->_scripts = array();

# If you use Analyrics intern - Piwik | With plugin https://www.yireo.com/software/joomla-extensions/piwik
#include_once JPATH_SITE . '/plugins/system/piwik/piwik.php';
#if (class_exists('PlgSystemPiwik')) {
#    PlgSystemPiwik::callPiwik();
#}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title><?php echo $this->title; ?> <?php echo htmlspecialchars($this->error->getMessage(), ENT_QUOTES, 'UTF-8'); ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="noindex,nofollow">
	<?php if ($apps->get('debug_lang', '0') == '1' || $apps->get('debug', '0') == '1') : ?>
		<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/media/cms/css/debug.css" type="text/css">
	<?php endif; ?>
	<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon">
  <link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/assets/production/boostrap3-full.min.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" />
  <!--[if lt IE 9]>
						<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
						<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
					<![endif]-->
</head>

<body itemscope itemtype="http://schema.org/WebPage">

    <!-- Navigation -->
    <a id="menu-toggle" href="#" class="btn btn-dark btn-lg toggle"><i class="fa fa-bars"></i></a>
    <nav id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <a id="menu-close" href="#" class="btn btn-light btn-lg pull-right toggle"><i class="fa fa-times"></i></a>
            <li class="sidebar-brand">
                <a href="#top"  onclick="$('#menu-close').click();"><?php echo $sitename; ?></a>
            </li>
            <li>
                <a href="<?php echo $this->baseurl; ?>" onclick="$('#menu-close').click();">Accueil</a>
            </li>
            <li>
                <a href="#copyright" onclick="$('#menu-close').click();">Copyright</a>
            </li>
        </ul>
    </nav>

    <header id="top" class="intro">
        <div class="text-vertical-center">
			<i class="logos"></i>
			<meta itemprop="image" content="<?php echo JURI::root(true); ?>/templates/<?php echo $this->template; ?>/assets/production/images/profile.png">
            <h1 itemprop="name"><?php echo $sitename; ?></h1>
			<meta itemprop="name" content="<?php echo $sitename; ?>">
            <h4 itemprop="description"><?php echo JText::_('JERROR_LAYOUT_PAGE_NOT_FOUND'); ?></h4>
			<meta itemprop="description" content="<?php echo JText::_('JERROR_LAYOUT_PAGE_NOT_FOUND'); ?>">
            <br>
            <a href="#error" class="btn btn-dark btn-lg"><i class="fa fa-angle-double-down fa-5x"></i></a>
        </div>
    </header>
    <section id="error" class="zones">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
								<p><strong><?php echo JText::_('JERROR_LAYOUT_ERROR_HAS_OCCURRED_WHILE_PROCESSING_YOUR_REQUEST'); ?></strong></p>
								<p><?php echo JText::_('JERROR_LAYOUT_NOT_ABLE_TO_VISIT'); ?></p>
								<ul>
									<li><?php echo JText::_('JERROR_LAYOUT_AN_OUT_OF_DATE_BOOKMARK_FAVOURITE'); ?></li>
									<li><?php echo JText::_('JERROR_LAYOUT_MIS_TYPED_ADDRESS'); ?></li>
									<li><?php echo JText::_('JERROR_LAYOUT_SEARCH_ENGINE_OUT_OF_DATE_LISTING'); ?></li>
									<li><?php echo JText::_('JERROR_LAYOUT_YOU_HAVE_NO_ACCESS_TO_THIS_PAGE'); ?></li>
								</ul>
                </div>
                <div class="col-lg-6">
								<?php if (JModuleHelper::getModule('search')) : ?>
									<p><strong><?php echo JText::_('JERROR_LAYOUT_SEARCH'); ?></strong></p>
									<p><?php echo JText::_('JERROR_LAYOUT_SEARCH_PAGE'); ?></p>
									<?php echo $doc->getBuffer('module', 'search'); ?>
								<?php endif; ?>
								<p><?php echo JText::_('JERROR_LAYOUT_GO_TO_THE_HOME_PAGE'); ?></p>
								<p><a href="<?php echo $this->baseurl; ?>" class="btn btn-dark"><span class="fa fa-home"></span> <?php echo JText::_('JERROR_LAYOUT_HOME_PAGE'); ?></a></p>
                </div>
            </div>
        </div>
    </section>

    <footer class="zones footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
						<i class="fa fa-mobile fa-5x"></i> <i class="fa fa-tablet fa-5x"></i> <i class="fa fa-laptop fa-5x"></i> <i class="fa fa-desktop fa-5x"></i> <br>
					Nous sommes 100% amis avec les moteur de recherches et multiplateformes avec n'importe quelles choix de votre navigateur internet.<br>
                    <span itemprop="copyrightHolder">&copy; <a href="<?php echo $this->baseurl; ?>"><?php echo $sitename; ?></a></span> - <span itemprop="copyrightYear"><?php echo date('Y'); ?></span> - 
					Conception by <a href="//www.AlexonBalangue.me" target="_top">www.AlexonBalangue.me</a> - Webdesigner by <a href="//www.startbootstrap.com" target="_top">www.StartBootstrap.com</a>
					<br />Toute reproduction interdite sans l'autorisation de l'auteur. 
						
                </div>
            </div>
        </div>
    </footer>
	

		<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script> 
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script> 	
		<script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/assets/production/boostrap3-full.min.js"></script> 
	<?php echo $doc->getBuffer('modules', 'debug', array('style' => 'none')); ?>
</body>
</html>
