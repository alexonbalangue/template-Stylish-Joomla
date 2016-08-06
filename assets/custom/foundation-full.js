    // Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Scrolls to the selected menu item on the page
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
/* Add to Homescreen v3.2.2 ~ (c) 2015 Matteo Spinelli ~ @license: http://cubiq.org/license */
(function (window, document) {
/*
       _   _ _____     _____
 ___ _| |_| |_   _|___|  |  |___ _____ ___ ___ ___ ___ ___ ___ ___
| .'| . | . | | | | . |     | . |     | -_|_ -|  _|  _| -_| -_|   |
|__,|___|___| |_| |___|__|__|___|_|_|_|___|___|___|_| |___|___|_|_|
                              by Matteo Spinelli ~ http://cubiq.org
*/

// Check for addEventListener browser support (prevent errors in IE<9)
var _eventListener = 'addEventListener' in window;

// Check if document is loaded, needed by autostart
var _DOMReady = false;
if ( document.readyState === 'complete' ) {
	_DOMReady = true;
} else if ( _eventListener ) {
	window.addEventListener('load', loaded, false);
}

function loaded () {
	window.removeEventListener('load', loaded, false);
	_DOMReady = true;
}

// regex used to detect if app has been added to the homescreen
var _reSmartURL = /\/ath(\/)?$/;
var _reQueryString = /([\?&]ath=[^&]*$|&ath=[^&]*(&))/;

// singleton
var _instance;
function ath (options) {
	_instance = _instance || new ath.Class(options);

	return _instance;
}

// message in all supported languages
ath.intl = {
	de_de: {
		ios: 'Um diese Web-App zum Home-Bildschirm hinzuzufügen, tippen Sie auf %icon und dann <strong>Zum Home-Bildschirm</strong>.',
		android: 'Um diese Web-App zum Home-Bildschirm hinzuzufügen, öffnen Sie das Menü und tippen dann auf <strong>Zum Startbildschirm hinzufügen</strong>. <small>Wenn Ihr Gerät eine Menütaste hat, lässt sich das Browsermenü über diese öffnen. Ansonsten tippen Sie auf %icon.</small>'
	},

	da_dk: {
		ios: 'For at tilføje denne web app til hjemmeskærmen: Tryk %icon og derefter <strong>Føj til hjemmeskærm</strong>.',
		android: 'For at tilføje denne web app til hjemmeskærmen, åbn browser egenskaber menuen og tryk på <strong>Føj til hjemmeskærm</strong>. <small>Denne menu kan tilgås ved at trykke på menu knappen, hvis din enhed har en, eller ved at trykke på det øverste højre menu ikon %icon.</small>'
	},

	en_us: {
		ios: 'To add this web app to the home screen: tap %icon and then <strong>Add to Home Screen</strong>.',
		android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon %icon.</small>'
	},

	es_es: {
		ios: 'Para añadir esta aplicación web a la pantalla de inicio: pulsa %icon y selecciona <strong>Añadir a pantalla de inicio</strong>.',
		android: 'Para añadir esta aplicación web a la pantalla de inicio, abre las opciones y pulsa <strong>Añadir a pantalla inicio</strong>. <small>El menú se puede acceder pulsando el botón táctil en caso de tenerlo, o bien el icono de la parte superior derecha de la pantalla %icon.</small>'
	},

	fi_fi: {
		ios: 'Liitä tämä sovellus kotivalikkoon: klikkaa %icon ja tämän jälkeen <strong>Lisää kotivalikkoon</strong>.',
		android: 'Lisätäksesi tämän sovelluksen aloitusnäytölle, avaa selaimen valikko ja klikkaa tähti -ikonia tai <strong>Lisää aloitusnäytölle tekstiä</strong>. <small>Valikkoon pääsee myös painamalla menuvalikkoa, jos laitteessasi on sellainen tai koskettamalla oikealla yläkulmassa menu ikonia %icon.</small>'
	},

	fr_fr: {
		ios: 'Pour ajouter cette application web sur l\'écran d\'accueil : Appuyez %icon et sélectionnez <strong>Ajouter sur l\'écran d\'accueil</strong>.',
		android: 'Pour ajouter cette application web sur l\'écran d\'accueil : Appuyez sur le bouton "menu", puis sur <strong>Ajouter sur l\'écran d\'accueil</strong>. <small>Le menu peut-être accessible en appuyant sur le bouton "menu" du téléphone s\'il en possède un <i class="fa fa-bars"></i>. Sinon, il se trouve probablement dans la coin supérieur droit du navigateur %icon.</small>'
	},

	he_il: {
		ios: '<span dir="rtl">להוספת האפליקציה למסך הבית: ללחוץ על %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
		android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon %icon.</small>'
	},

	hu_hu: {
		ios: 'Ha hozzá szeretné adni ezt az alkalmazást a kezdőképernyőjéhez, érintse meg a következő ikont: %icon , majd a <strong>Hozzáadás a kezdőképernyőhöz</strong> menüpontot.',
		android: 'Ha hozzá szeretné adni ezt az alkalmazást a kezdőképernyőjéhez, a böngésző menüjében kattintson a <strong>Hozzáadás a kezdőképernyőhöz</strong> menüpontra. <small>A böngésző menüjét a következő ikon megérintésével tudja megnyitni: %icon.</small>'
	},

	it_it: {
		ios: 'Per aggiungere questa web app alla schermata iniziale: premi %icon e poi <strong>Aggiungi a Home</strong>.',
		android: 'Per aggiungere questa web app alla schermata iniziale, apri il menu opzioni del browser e premi su <strong>Aggiungi alla homescreen</strong>. <small>Puoi accedere al menu premendo il pulsante hardware delle opzioni se la tua device ne ha uno, oppure premendo l\'icona %icon in alto a destra.</small>'
	},

	ja_jp: {
		ios: 'このウェプアプリをホーム画面に追加するために%iconを押して<strong>ホーム画面に追加</strong>。',
		android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon %icon.</small>'
 	},

	ko_kr: {
		ios: '홈 화면에 바로가기 생성: %icon 을 클릭한 후 <strong>홈 화면에 추가</strong>.',
		android: '브라우저 옵션 메뉴의 <string>홈 화면에 추가</string>를 클릭하여 홈화면에 바로가기를 생성할 수 있습니다. <small>옵션 메뉴는 장치의 메뉴 버튼을 누르거나 오른쪽 상단의 메뉴 아이콘 %icon을 클릭하여 접근할 수 있습니다.</small>'
	},

	nb_no: {
		ios: 'For å installere denne appen på hjem-skjermen: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>.',
		android: 'For å legge til denne webappen på startsiden åpner en nettlesermenyen og velger <strong>Legg til på startsiden</strong>. <small>Menyen åpnes ved å trykke på den fysiske menyknappen hvis enheten har det, eller ved å trykke på menyikonet øverst til høyre %icon.</small>'
	},

	pt_br: {
		ios: 'Para adicionar este app à tela de início: clique %icon e então <strong>Tela de início</strong>.',
		android: 'Para adicionar este app à tela de início, abra o menu de opções do navegador e selecione <strong>Adicionar à tela inicial</strong>. <small>O menu pode ser acessado pressionando o "menu" button se o seu dispositivo tiver um, ou selecionando o ícone %icon no canto superior direito.</small>'
	},

	pt_pt: {
		ios: 'Para adicionar esta app ao ecrã principal: clique %icon e depois <strong>Ecrã principal</strong>.',
		android: 'Para adicionar esta app web ecrã principal, abra o menu de opções do navegador e selecione <strong>Adicionar à tela inicial</strong>. <small>O menu pode ser acessado pressionando o "menu" button se o seu dispositivo tiver um, ou selecionando o ícone %icon no canto superior direito.</small>'
	},

	nl_nl: {
		ios: 'Om deze webapp aan je startscherm toe te voegen, klik op %icon en dan <strong>Zet in startscherm</strong>.',
		android: 'Om deze webapp aan je startscherm toe te voegen, open de browserinstellingen en tik op <strong>Toevoegen aan startscherm</strong>. <small>Gebruik de "menu" knop als je telefoon die heeft, anders het menu-icoon rechtsbovenin %icon.</small>'
	},

	ru_ru: {
		ios: 'Чтобы добавить этот сайт на свой домашний экран, нажмите на иконку %icon и затем <strong>На экран "Домой"</strong>.',
		android: 'Чтобы добавить сайт на свой домашний экран, откройте меню браузера и нажмите на <strong>Добавить на главный экран</strong>. <small>Меню можно вызвать, нажав на кнопку меню вашего телефона, если она есть. Или найдите иконку сверху справа %icon[иконка].</small>'
	},

	sv_se: {
		ios: 'För att lägga till denna webbapplikation på hemskärmen: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.',
		android: 'För att lägga till den här webbappen på hemskärmen öppnar du webbläsarens alternativ-meny och väljer <strong>Lägg till på startskärmen</strong>. <small>Man hittar menyn genom att trycka på hårdvaruknappen om din enhet har en sådan, eller genom att trycka på menyikonen högst upp till höger %icon.</small>'
	},

	tr_tr: {
		ios: 'Uygulamayı ana ekrana eklemek için, %icon ve ardından <strong>ana ekrana ekle</strong> butonunu tıklayın.',
		android: 'Uygulamayı ana ekrana eklemek için, menüye girin ve <strong>ana ekrana ekle</strong> butonunu tıklayın. <small>Cihazınız menü tuşuna sahip ise menüye girmek için menü tuşunu tıklayın. Aksi takdirde %icon butonunu tıklayın.</small>'
	},

	uk_ua: {
		ios: 'Щоб додати цей сайт на початковий екран, натисніть %icon, а потім <strong>На початковий екран</strong>.',
		android: 'Щоб додати цей сайт на домашній екран, відкрийте меню браузера та виберіть <strong>Додати на головний екран</strong>. <small>Це можливо зробити, натиснувши кнопку меню на вашому смартфоні, якщо така є. Або ж на іконці зверху справа %icon.</small>'
	},

	zh_cn: {
		ios: '如要把应用程序加至主屏幕,请点击%icon, 然后<strong>添加到主屏幕</strong>',
		android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon %icon.</small>'
	},

	zh_tw: {
		ios: '如要把應用程式加至主屏幕, 請點擊%icon, 然後<strong>加至主屏幕</strong>.',
		android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon %icon.</small>'
	}
};

// Add 2 characters language support (Android mostly)
for ( var lang in ath.intl ) {
	ath.intl[lang.substr(0, 2)] = ath.intl[lang];
}

// default options
ath.defaults = {
	appID: 'org.cubiq.addtohome',		// local storage name (no need to change)
	fontSize: 15,				// base font size, used to properly resize the popup based on viewport scale factor
	debug: false,				// override browser checks
	logging: false,				// log reasons for showing or not showing to js console; defaults to true when debug is true
	modal: false,				// prevent further actions until the message is closed
	mandatory: false,			// you can't proceed if you don't add the app to the homescreen
	autostart: true,			// show the message automatically
	skipFirstVisit: false,		// show only to returning visitors (ie: skip the first time you visit)
	startDelay: 1,				// display the message after that many seconds from page load
	lifespan: 15,				// life of the message in seconds
	displayPace: 1440,			// minutes before the message is shown again (0: display every time, default 24 hours)
	maxDisplayCount: 0,			// absolute maximum number of times the message will be shown to the user (0: no limit)
	icon: true,					// add touch icon to the message
	message: '',				// the message can be customized
	validLocation: [],			// list of pages where the message will be shown (array of regexes)
	onInit: null,				// executed on instance creation
	onShow: null,				// executed when the message is shown
	onRemove: null,				// executed when the message is removed
	onAdd: null,				// when the application is launched the first time from the homescreen (guesstimate)
	onPrivate: null,			// executed if user is in private mode
	privateModeOverride: false,	// show the message even in private mode (very rude)
	detectHomescreen: false		// try to detect if the site has been added to the homescreen (false | true | 'hash' | 'queryString' | 'smartURL')
};

// browser info and capability
var _ua = window.navigator.userAgent;

var _nav = window.navigator;
_extend(ath, {
	hasToken: document.location.hash == '#ath' || _reSmartURL.test(document.location.href) || _reQueryString.test(document.location.search),
	isRetina: window.devicePixelRatio && window.devicePixelRatio > 1,
	isIDevice: (/iphone|ipod|ipad/i).test(_ua),
	isMobileChrome: _ua.indexOf('Android') > -1 && (/Chrome\/[.0-9]*/).test(_ua) && _ua.indexOf("Version") == -1,
	isMobileIE: _ua.indexOf('Windows Phone') > -1,
	language: _nav.language && _nav.language.toLowerCase().replace('-', '_') || ''
});

// falls back to en_us if language is unsupported
ath.language = ath.language && ath.language in ath.intl ? ath.language : 'en_us';

ath.isMobileSafari = ath.isIDevice && _ua.indexOf('Safari') > -1 && _ua.indexOf('CriOS') < 0;
ath.OS = ath.isIDevice ? 'ios' : ath.isMobileChrome ? 'android' : ath.isMobileIE ? 'windows' : 'unsupported';

ath.OSVersion = _ua.match(/(OS|Android) (\d+[_\.]\d+)/);
ath.OSVersion = ath.OSVersion && ath.OSVersion[2] ? +ath.OSVersion[2].replace('_', '.') : 0;

ath.isStandalone = 'standalone' in window.navigator && window.navigator.standalone;
ath.isTablet = (ath.isMobileSafari && _ua.indexOf('iPad') > -1) || (ath.isMobileChrome && _ua.indexOf('Mobile') < 0);

ath.isCompatible = (ath.isMobileSafari && ath.OSVersion >= 6) || ath.isMobileChrome;	// TODO: add winphone

var _defaultSession = {
	lastDisplayTime: 0,			// last time we displayed the message
	returningVisitor: false,	// is this the first time you visit
	displayCount: 0,			// number of times the message has been shown
	optedout: false,			// has the user opted out
	added: false				// has been actually added to the homescreen
};

ath.removeSession = function (appID) {
	try {
		if (!localStorage) {
			throw new Error('localStorage is not defined');
		}

		localStorage.removeItem(appID || ath.defaults.appID);
	} catch (e) {
		// we are most likely in private mode
	}
};

ath.doLog = function (logStr) {
	if ( this.options.logging ) {
		console.log(logStr);
	}
};

ath.Class = function (options) {
	// class methods
	this.doLog = ath.doLog;

	// merge default options with user config
	this.options = _extend({}, ath.defaults);
	_extend(this.options, options);
	// override defaults that are dependent on each other
	if ( options && options.debug && (typeof options.logging === "undefined") ) {
		this.options.logging = true;
	}

	// IE<9 so exit (I hate you, really)
	if ( !_eventListener ) {
		return;
	}

	// normalize some options
	this.options.mandatory = this.options.mandatory && ( 'standalone' in window.navigator || this.options.debug );
	this.options.modal = this.options.modal || this.options.mandatory;
	if ( this.options.mandatory ) {
		this.options.startDelay = -0.5;		// make the popup hasty
	}
	this.options.detectHomescreen = this.options.detectHomescreen === true ? 'hash' : this.options.detectHomescreen;

	// setup the debug environment
	if ( this.options.debug ) {
		ath.isCompatible = true;
		ath.OS = typeof this.options.debug == 'string' ? this.options.debug : ath.OS == 'unsupported' ? 'android' : ath.OS;
		ath.OSVersion = ath.OS == 'ios' ? '8' : '4';
	}

	// the element the message will be appended to
	this.container = document.documentElement;

	// load session
	this.session = this.getItem(this.options.appID);
	this.session = this.session ? JSON.parse(this.session) : undefined;

	// user most likely came from a direct link containing our token, we don't need it and we remove it
	if ( ath.hasToken && ( !ath.isCompatible || !this.session ) ) {
		ath.hasToken = false;
		_removeToken();
	}

	// the device is not supported
	if ( !ath.isCompatible ) {
 		this.doLog("Add to homescreen: not displaying callout because device not supported");
		return;
	}

	this.session = this.session || _defaultSession;

	// check if we can use the local storage
	try {
		if (!localStorage) {
			throw new Error('localStorage is not defined');
		}

		localStorage.setItem(this.options.appID, JSON.stringify(this.session));
		ath.hasLocalStorage = true;
	} catch (e) {
		// we are most likely in private mode
		ath.hasLocalStorage = false;

		if ( this.options.onPrivate ) {
			this.options.onPrivate.call(this);
		}
	}

	// check if this is a valid location
	var isValidLocation = !this.options.validLocation.length;
	for ( var i = this.options.validLocation.length; i--; ) {
		if ( this.options.validLocation[i].test(document.location.href) ) {
			isValidLocation = true;
			break;
		}
	}

	// check compatibility with old versions of add to homescreen. Opt-out if an old session is found
	if ( this.getItem('addToHome') ) {
		this.optOut();
	}

	// critical errors:
	if ( this.session.optedout ) {
		this.doLog("Add to homescreen: not displaying callout because user opted out");
		return;
	}
	if ( this.session.added ) {
		this.doLog("Add to homescreen: not displaying callout because already added to the homescreen");
		return;
	}
	if ( !isValidLocation ) {
		this.doLog("Add to homescreen: not displaying callout because not a valid location");
		return;
	}

	// check if the app is in stand alone mode
	if ( ath.isStandalone ) {
		// execute the onAdd event if we haven't already
		if ( !this.session.added ) {
			this.session.added = true;
			this.updateSession();

			if ( this.options.onAdd && ath.hasLocalStorage ) {	// double check on localstorage to avoid multiple calls to the custom event
				this.options.onAdd.call(this);
			}
		}

		this.doLog("Add to homescreen: not displaying callout because in standalone mode");
		return;
	}

	// (try to) check if the page has been added to the homescreen
	if ( this.options.detectHomescreen ) {
		// the URL has the token, we are likely coming from the homescreen
		if ( ath.hasToken ) {
			_removeToken();		// we don't actually need the token anymore, we remove it to prevent redistribution

			// this is called the first time the user opens the app from the homescreen
			if ( !this.session.added ) {
				this.session.added = true;
				this.updateSession();

				if ( this.options.onAdd && ath.hasLocalStorage ) {	// double check on localstorage to avoid multiple calls to the custom event
					this.options.onAdd.call(this);
				}
			}

			this.doLog("Add to homescreen: not displaying callout because URL has token, so we are likely coming from homescreen");
			return;
		}

		// URL doesn't have the token, so add it
		if ( this.options.detectHomescreen == 'hash' ) {
			history.replaceState('', window.document.title, document.location.href + '#ath');
		} else if ( this.options.detectHomescreen == 'smartURL' ) {
			history.replaceState('', window.document.title, document.location.href.replace(/(\/)?$/, '/ath$1'));
		} else {
			history.replaceState('', window.document.title, document.location.href + (document.location.search ? '&' : '?' ) + 'ath=');
		}
	}

	// check if this is a returning visitor
	if ( !this.session.returningVisitor ) {
		this.session.returningVisitor = true;
		this.updateSession();

		// we do not show the message if this is your first visit
		if ( this.options.skipFirstVisit ) {
			this.doLog("Add to homescreen: not displaying callout because skipping first visit");
			return;
		}
	}

	// we do no show the message in private mode
	if ( !this.options.privateModeOverride && !ath.hasLocalStorage ) {
		this.doLog("Add to homescreen: not displaying callout because browser is in private mode");
		return;
	}

	// all checks passed, ready to display
	this.ready = true;

	if ( this.options.onInit ) {
		this.options.onInit.call(this);
	}

	if ( this.options.autostart ) {
		this.doLog("Add to homescreen: autostart displaying callout");
		this.show();
	}
};

ath.Class.prototype = {
	// event type to method conversion
	events: {
		load: '_delayedShow',
		error: '_delayedShow',
		orientationchange: 'resize',
		resize: 'resize',
		scroll: 'resize',
		click: 'remove',
		touchmove: '_preventDefault',
		transitionend: '_removeElements',
		webkitTransitionEnd: '_removeElements',
		MSTransitionEnd: '_removeElements'
	},

	handleEvent: function (e) {
		var type = this.events[e.type];
		if ( type ) {
			this[type](e);
		}
	},

	show: function (force) {
		// in autostart mode wait for the document to be ready
		if ( this.options.autostart && !_DOMReady ) {
			setTimeout(this.show.bind(this), 50);
			// we are not displaying callout because DOM not ready, but don't log that because
			// it would log too frequently
			return;
		}

		// message already on screen
		if ( this.shown ) {
			this.doLog("Add to homescreen: not displaying callout because already shown on screen");
			return;
		}

		var now = Date.now();
		var lastDisplayTime = this.session.lastDisplayTime;

		if ( force !== true ) {
			// this is needed if autostart is disabled and you programmatically call the show() method
			if ( !this.ready ) {
				this.doLog("Add to homescreen: not displaying callout because not ready");
				return;
			}

			// we obey the display pace (prevent the message to popup too often)
			if ( now - lastDisplayTime < this.options.displayPace * 60000 ) {
				this.doLog("Add to homescreen: not displaying callout because displayed recently");
				return;
			}

			// obey the maximum number of display count
			if ( this.options.maxDisplayCount && this.session.displayCount >= this.options.maxDisplayCount ) {
				this.doLog("Add to homescreen: not displaying callout because displayed too many times already");
				return;
			}
		}

		this.shown = true;

		// increment the display count
		this.session.lastDisplayTime = now;
		this.session.displayCount++;
		this.updateSession();

		// try to get the highest resolution application icon
		if ( !this.applicationIcon ) {
			if ( ath.OS == 'ios' ) {
				this.applicationIcon = document.querySelector('head link[rel^=apple-touch-icon][sizes="152x152"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon][sizes="120x120"],head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon]');
			} else {
				this.applicationIcon = document.querySelector('head link[rel^="shortcut icon"][sizes="196x196"],head link[rel^=apple-touch-icon]');
			}
		}

		var message = '';

		if ( typeof this.options.message == 'object' && ath.language in this.options.message ) {		// use custom language message
			message = this.options.message[ath.language][ath.OS];
		} else if ( typeof this.options.message == 'object' && ath.OS in this.options.message ) {		// use custom os message
			message = this.options.message[ath.OS];
		} else if ( this.options.message in ath.intl ) {				// you can force the locale
			message = ath.intl[this.options.message][ath.OS];
		} else if ( this.options.message !== '' ) {						// use a custom message
			message = this.options.message;
		} else if ( ath.OS in ath.intl[ath.language] ) {				// otherwise we use our message
			message = ath.intl[ath.language][ath.OS];
		}

		// add the action icon
		message = '<p>' + message.replace(/%icon(?:\[([^\]]+)\])?/gi, function(matches, group1) {
			return '<span class="ath-action-icon">' + (!!group1 ? group1 : 'icon') + '</span>';
		}); + '</p>';

		// create the message container
		this.viewport = document.createElement('div');
		this.viewport.className = 'ath-viewport';
		if ( this.options.modal ) {
			this.viewport.className += ' ath-modal';
		}
		if ( this.options.mandatory ) {
			this.viewport.className += ' ath-mandatory';
		}
		this.viewport.style.position = 'absolute';

		// create the actual message element
		this.element = document.createElement('div');
		this.element.className = 'ath-container ath-' + ath.OS + ' ath-' + ath.OS + (ath.OSVersion + '').substr(0,1) + ' ath-' + (ath.isTablet ? 'tablet' : 'phone');
		this.element.style.cssText = '-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0s;-webkit-transition-timing-function:ease-out;transition-property:transform,opacity;transition-duration:0s;transition-timing-function:ease-out;';
		this.element.style.webkitTransform = 'translate3d(0,-' + window.innerHeight + 'px,0)';
		this.element.style.transform = 'translate3d(0,-' + window.innerHeight + 'px,0)';

		// add the application icon
		if ( this.options.icon && this.applicationIcon ) {
			this.element.className += ' ath-icon';
			this.img = document.createElement('img');
			this.img.className = 'ath-application-icon';
			this.img.addEventListener('load', this, false);
			this.img.addEventListener('error', this, false);

			this.img.src = this.applicationIcon.href;
			this.element.appendChild(this.img);
		}

		this.element.innerHTML += message;

		// we are not ready to show, place the message out of sight
		this.viewport.style.left = '-99999em';

		// attach all elements to the DOM
		this.viewport.appendChild(this.element);
		this.container.appendChild(this.viewport);

		// if we don't have to wait for an image to load, show the message right away
		if ( this.img ) {
			this.doLog("Add to homescreen: not displaying callout because waiting for img to load");
		} else {
			this._delayedShow();
		}
	},

	_delayedShow: function (e) {
		setTimeout(this._show.bind(this), this.options.startDelay * 1000 + 500);
	},

	_show: function () {
		var that = this;

		// update the viewport size and orientation
		this.updateViewport();

		// reposition/resize the message on orientation change
		window.addEventListener('resize', this, false);
		window.addEventListener('scroll', this, false);
		window.addEventListener('orientationchange', this, false);

		if ( this.options.modal ) {
			// lock any other interaction
			document.addEventListener('touchmove', this, true);
		}

		// Enable closing after 1 second
		if ( !this.options.mandatory ) {
			setTimeout(function () {
				that.element.addEventListener('click', that, true);
			}, 1000);
		}

		// kick the animation
		setTimeout(function () {
			that.element.style.webkitTransitionDuration = '1.2s';
			that.element.style.transitionDuration = '1.2s';
			that.element.style.webkitTransform = 'translate3d(0,0,0)';
			that.element.style.transform = 'translate3d(0,0,0)';
		}, 0);

		// set the destroy timer
		if ( this.options.lifespan ) {
			this.removeTimer = setTimeout(this.remove.bind(this), this.options.lifespan * 1000);
		}

		// fire the custom onShow event
		if ( this.options.onShow ) {
			this.options.onShow.call(this);
		}
	},

	remove: function () {
		clearTimeout(this.removeTimer);

		// clear up the event listeners
		if ( this.img ) {
			this.img.removeEventListener('load', this, false);
			this.img.removeEventListener('error', this, false);
		}

		window.removeEventListener('resize', this, false);
		window.removeEventListener('scroll', this, false);
		window.removeEventListener('orientationchange', this, false);
		document.removeEventListener('touchmove', this, true);
		this.element.removeEventListener('click', this, true);

		// remove the message element on transition end
		this.element.addEventListener('transitionend', this, false);
		this.element.addEventListener('webkitTransitionEnd', this, false);
		this.element.addEventListener('MSTransitionEnd', this, false);

		// start the fade out animation
		this.element.style.webkitTransitionDuration = '0.3s';
		this.element.style.opacity = '0';
	},

	_removeElements: function () {
		this.element.removeEventListener('transitionend', this, false);
		this.element.removeEventListener('webkitTransitionEnd', this, false);
		this.element.removeEventListener('MSTransitionEnd', this, false);

		// remove the message from the DOM
		this.container.removeChild(this.viewport);

		this.shown = false;

		// fire the custom onRemove event
		if ( this.options.onRemove ) {
			this.options.onRemove.call(this);
		}
	},

	updateViewport: function () {
		if ( !this.shown ) {
			return;
		}

		this.viewport.style.width = window.innerWidth + 'px';
		this.viewport.style.height = window.innerHeight + 'px';
		this.viewport.style.left = window.scrollX + 'px';
		this.viewport.style.top = window.scrollY + 'px';

		var clientWidth = document.documentElement.clientWidth;

		this.orientation = clientWidth > document.documentElement.clientHeight ? 'landscape' : 'portrait';

		var screenWidth = ath.OS == 'ios' ? this.orientation == 'portrait' ? screen.width : screen.height : screen.width;
		this.scale = screen.width > clientWidth ? 1 : screenWidth / window.innerWidth;

		this.element.style.fontSize = this.options.fontSize / this.scale + 'px';
	},

	resize: function () {
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(this.updateViewport.bind(this), 100);
	},

	updateSession: function () {
		if ( ath.hasLocalStorage === false ) {
			return;
		}

        if (localStorage) {
            localStorage.setItem(this.options.appID, JSON.stringify(this.session));
        }
	},

	clearSession: function () {
		this.session = _defaultSession;
		this.updateSession();
	},

	getItem: function(item) {
		try {
			if (!localStorage) {
				throw new Error('localStorage is not defined');
			}

			return localStorage.getItem(item);
		} catch(e) {
			// Preventing exception for some browsers when fetching localStorage key
			ath.hasLocalStorage = false;
		}
	},

	optOut: function () {
		this.session.optedout = true;
		this.updateSession();
	},

	optIn: function () {
		this.session.optedout = false;
		this.updateSession();
	},

	clearDisplayCount: function () {
		this.session.displayCount = 0;
		this.updateSession();
	},

	_preventDefault: function (e) {
		e.preventDefault();
		e.stopPropagation();
	}
};

// utility
function _extend (target, obj) {
	for ( var i in obj ) {
		target[i] = obj[i];
	}

	return target;
}

function _removeToken () {
	if ( document.location.hash == '#ath' ) {
		history.replaceState('', window.document.title, document.location.href.split('#')[0]);
	}

	if ( _reSmartURL.test(document.location.href) ) {
		history.replaceState('', window.document.title, document.location.href.replace(_reSmartURL, '$1'));
	}

	if ( _reQueryString.test(document.location.search) ) {
		history.replaceState('', window.document.title, document.location.href.replace(_reQueryString, '$2'));
	}
}

// expose to the world
window.addToHomescreen = ath;

})(window, document);
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function decode(s) {
		if (config.raw) {
			return s;
		}
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function decodeAndParse(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		s = decode(s);

		try {
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				result = decodeAndParse(cookie);
				break;
			}

			if (!key) {
				result[name] = decodeAndParse(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

/*
Create by pixelpro.es Plguin Cookie_Pro
*/
jQuery(document).ready(function(){
    var cookieArray = new Array();
    function listadoCookies() {
        var lasCookies = document.cookie.split(';');
        for (var i = 1 ; i <= lasCookies.length; i++) {           
            cookieArray.push(lasCookies[i-1]);
        }
        return cookieArray;
    }
    if(jQuery.cookie('accept_cookie') == undefined) {
        jQuery(".coockie_banner").show();
        listadoCookies();
        var fecha_fin = new Date;
        fecha_fin.setDate(fecha_fin.getDate()-1);
        for (var i = 0; i<cookieArray.length; i++) {
            var nombreCookie = cookieArray[i].split("=")[0];
            var valorCookie = cookieArray[i].split("=")[1];
            function cleanURL(url) {
                var URLCookie = url;
                var str = URLCookie;
                var n = str.search("http://www");
                if( url == n ) {
                   return URLCookiewww = URLCookie.replace("https://www","");
                } else {
                    return URLCookie = URLCookie.replace("https://","");
                }
            }
            var URLLimpia = cleanURL(document.URL); 
            // console.log(URLCookie);
            var MiURL = URLLimpia.split( '/' );        
            MiURL = URLLimpia.replace('www', '');
            var URLAnalitycs = MiURL.split('/');
            if(jQuery('input.agreeCookies').val() == 'true' ) {
                document.cookie = nombreCookie + "=" + valorCookie + ";expires=" + fecha_fin.toGMTString() + ";path=/;";
            }
            window.setInterval(function() { borraAnalitycs() },2000);
            function borraAnalitycs() {
                function borrarCookies(nombre, dominio, path){
                    try {
                        function Conseguir_Cookie( check_nombre ) {
                                var todas_las_cookies = document.cookie.split(';'),
                                    cookie_almacenada = '',
                                    nombre_cookie = '',
                                    valor_cookie = '',
                                    cookie_encontrada = false;
                                for ( i = 0; i < todas_las_cookies.length; i++ ) {
                                    cookie_almacenada = todas_las_cookies[i].split( '=' );
                                    nombre_cookie = cookie_almacenada[0].replace(/^\s+|\s+$/g, '');
                                    if ( nombre_cookie == check_nombre ) {
                                        cookie_encontrada = true;
                                        if ( cookie_almacenada.length > 1 ) {
                                            valor_cookie = unescape( cookie_almacenada[1].replace(/^\s+|\s+$/g, '') );
                                        }
                                        return valor_cookie;
                                        break;
                                    }
                                    cookie_almacenada = null;
                                    nombre_cookie = '';
                                }
                                if ( !cookie_encontrada ) {
                                  return null;
                                }
                            }
                            if (Conseguir_Cookie(nombre)) {
                                var dominio = dominio || document.domain;
                                var path = path || "/";
                                document.cookie = nombre + "=; expires=" + new Date + "; domain=" + dominio + "; path=" + path;
                            }
                    }
                    catch(err) {}    
                };
                if(jQuery('input.agreeAnalitycs').val() == 'true' ) {
                    borrarCookies('__utma',URLAnalitycs[0],'/');
                    borrarCookies('__utmz',URLAnalitycs[0],'/');
                    borrarCookies('__utmb',URLAnalitycs[0],'/');
                    borrarCookies('__utmc',URLAnalitycs[0],'/');
                    borrarCookies('_set',URLAnalitycs[0],'/');
                    borrarCookies('_userID',URLAnalitycs[0],'/');
                    borrarCookies('_send',URLAnalitycs[0],'/');
                    borrarCookies('_secure',URLAnalitycs[0],'/');
                    borrarCookies('_ga',URLAnalitycs[0],'/');
					/*Piwik Analystics - not use cookie
                    borrarCookies('_pk_ref',URLAnalitycs[0],'/');
                    borrarCookies('_pk_cvar',URLAnalitycs[0],'/');
                    borrarCookies('_pk_id',URLAnalitycs[0],'/');
                    borrarCookies('_pk_ses',URLAnalitycs[0],'/');
					*/
					
                }		
            }
        }   
    } else {
        jQuery(".coockie_banner").hide();
    }
    jQuery(".coockie_banner button").on('click', function() {
        jQuery.cookie('accept_cookie', 'Yes', { expires: 365, path: '/' });
        jQuery(".coockie_banner").hide('slow');
    });
});/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-fixed-top' ),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
		}
		else {
			classie.remove( header, 'navbar-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();

/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
/*$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});*/
$('.navbar-collapse').find("ul li a").click(function() {
    $('.navbar-toggle:visible').click();
});