<?php

defined('_JEXEC') or die;
$app             = JFactory::getApplication();
$docs             = JFactory::getDocument();
$this->language  = $docs->language;
$this->direction = $docs->direction;
$sitename = $app->getCfg('sitename');
$desc_site = $app->getCfg('MetaDesc');
// Getting params from template
$params = $app->getTemplate(true)->params;
$this->_script = $this->_scripts = array();
require_once JPATH_ADMINISTRATOR . '/components/com_users/helpers/users.php';

$twofactormethods = UsersHelper::getTwoFactorMethods();

$docs->addStyleSheet(JURI::root(true).'/templates/'.$this->template.'/assets/production/boostrap3-full.min.css');
//$docs->addStyleSheet(JURI::root(true).'/templates/'.$this->template.'/assets/css/template.css');
$docs->addStyleSheet('http://fonts.googleapis.com/css?family=Montserrat:400,700');


?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>">
<head>	
<meta charset="utf-8">
	<title><?php echo $this->title; ?> </title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
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
<?php if ($this->countModules('message')) : ?>
	<jdoc:include type="modules" name="message" style="none" />
<?php endif; ?>
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
                <a href="#logins" onclick="$('#menu-close').click();">Connexion</a>
            </li>
            <li>
                <a href="#copyright" onclick="$('#menu-close').click();">Copyright</a>
            </li>
        </ul>
    </nav>
    <header id="top" class="intro">
        <div class="text-vertical-center">
			<i class="logos"></i>
			<meta itemprop="image" content="<?php echo JURI::root(true); ?>/templates/<?php echo $this->template; ?>/assets/images/logo.png">
            <h1 itemprop="name"><?php echo $sitename; ?></h1>
			<meta itemprop="name" content="<?php echo $sitename; ?>">
            <h4 itemprop="description">
	<?php 
	if ($app->get('display_offline_message', 1) == 1 && str_replace(' ', '', $app->get('offline_message')) != '') : 
		echo $app->get('offline_message');
	elseif ($app->get('display_offline_message', 1) == 2 && str_replace(' ', '', JText::_('JOFFLINE_MESSAGE')) != '') : 
		echo JText::_('JOFFLINE_MESSAGE');
	endif; 
	?>
			</h4>
			<meta itemprop="description" content="<?php 
	if ($app->get('display_offline_message', 1) == 1 && str_replace(' ', '', $app->get('offline_message')) != '') : 
		echo $app->get('offline_message');
	elseif ($app->get('display_offline_message', 1) == 2 && str_replace(' ', '', JText::_('JOFFLINE_MESSAGE')) != '') : 
		echo JText::_('JOFFLINE_MESSAGE');
	endif; 
	?>">
            <br>
            <a href="#logins" class="btn btn-dark btn-lg"><i class="fa fa-angle-double-down fa-5x"></i></a>
        </div>
    </header>
    <section id="logins" class="zones">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 itemprop="alternativeHealine">Sorry, Member team login only</h2>
                    <hr class="smallers">
                    <div class="row text-center">
	<form action="<?php echo JRoute::_('index.php', true); ?>" class="form-inline" method="post" id="form-login">

		<div class="form-group">
			<label for="username"><?php echo JText::_('JGLOBAL_USERNAME'); ?></label>
			<input name="username" id="username" type="text" class="form-control" placeholder="<?php echo JText::_('JGLOBAL_USERNAME'); ?>" />
		</div>
		<div class="form-group">
			<label for="passwd"><?php echo JText::_('JGLOBAL_PASSWORD'); ?></label>
			<input type="password" name="password" class="form-control" placeholder="<?php echo JText::_('JGLOBAL_PASSWORD'); ?>" id="passwd" />
		</div>
		<?php if (count($twofactormethods) > 1) : ?>
			<div class="form-group">
				<label for="secretkey"><?php echo JText::_('JGLOBAL_SECRETKEY'); ?></label>
				<input type="text" name="secretkey" class="form-control" placeholder="<?php echo JText::_('JGLOBAL_SECRETKEY'); ?>" id="secretkey" />
			</div>
		<?php endif; ?>
			<input type="submit" name="Submit" class="btn btn-dark" value="<?php echo JText::_('JLOGIN'); ?>" />
		<input type="hidden" name="option" value="com_users" />
		<input type="hidden" name="task" value="user.login" />
		<input type="hidden" name="return" value="<?php echo base64_encode(JUri::base()); ?>" />
		<?php echo JHtml::_('form.token'); ?>
	</form>
					</div>
                </div>
            </div>
        </div>
    </section>
	
    <footer id="copyright" class="zones footer">
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

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script> 
  <script src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/assets/production/boostrap3-full.min.js"></script> 
	<jdoc:include type="modules" name="debug" style="none" />
</body>
</html>
