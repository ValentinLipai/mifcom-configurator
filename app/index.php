<!DOCTYPE html>
<html lang="ru">

<head>

	<meta charset="utf-8">
	<!-- <base href="/"> -->

	<title>Mifcom - configurator page</title>
	<meta name="description" content="">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- Template Basic Images Start -->
	<meta property="og:image" content="path/to/image.jpg">
	<link rel="icon" href="img/favicon/favicon.ico">
	<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon-180x180.png">
	<!-- Template Basic Images End -->


	<link rel="stylesheet" href="css/main.min.css">

</head>

<body class="configurator-page">
	
	<?php require "components/header.php"; ?>
	<?php require 'components/breadcrumbs.php'; ?>


	<main class="main">
		<div class="container">
			<div class="main__primary">

				<div class="product-mobile-info">
					<div class="product-mobile-info__title">KONFIGURATION:</div>
					<div class="product-mobile-info__config">Gaming PC Konfigurator Intel (9. Gen.) (So. 1151) [ID: 9013]</div>
				</div>

				<?php require 'components/product-cart.php'; ?>
				<!-- /.product-cart -->

				
				<?php require 'components/customizer.php'; ?>
				<!-- /.customizer -->
			</div>
			<div class="main__sidebar">

				<?php require 'components/sidebar.php'; ?>
					<!-- /.sidebar -->
			</div>
		</div>
	</main>


	<div class="configurator" id="configurator"> <!--  !!! заменить .configurator на .main или .content или .main-content !!! -->
		<div class="container">
			<div class="configurator-inner__wrapper">
				<div class="configurator-main">
					<!-- /.configurator-product__mobile-title-wrapper -->


				</div>
				<!-- /.configurator-main -->
				

			</div>
			<!-- /.configurator-inner__wrapper -->
		</div>
	</div>

	<?php require 'components/footer.php'; ?>
	<!-- /.footer -->

	<div class="modals-main__wrapper">
		<div id="modal__configurator-summary" class="modal__configurator-summary__wrapper fancybox-content" style="display: none; max-width: 900px; width: 96%; height: 440px; max-height: 90vh;">
			<div class="modal__configurator-summary">
				<div class="modal__configurator-summary__sidebar">
					<img src="https://www.mifcom.de/media/catalog/product/cache/1/image/140x/9df78eab33525d08d6e5fb8d27136e95/g/a/gaming_coffeelak_refresh.jpg"
					 alt="" class="modal__configurator-summary__product-img">
					<div class="modal__configurator-summary__status-wrapper">
						<div class="modal__configurator-summary__status valid">
							<span class="modal__configurator-summary__status-icon"></span>
						</div>
					</div>
				</div>
				<div id="modal__configurator-summary__table" class="modal__configurator-summary__table">

				</div>
			</div>
		</div>
		<div id="modal__frege-support" class="modal__frege-support__wrapper fancybox-content" style="display: none; max-width: 570px; width: 96%; max-height: 90vh;">
			<div class="modal__frege-support">
				<ul class="modal__frege-support__list">
					<li class="modal__frege-support__item">
						<div class="modal__frege-support__item-icon-wrapper">
							<div class="modal__frege-support__item-icon chat">

							</div>
							<span class="chat-status offline">offline</span>
						</div>
						<div class="modal__frege-support__item-content-wrapper">
							<div class="modal__frege-support__item-content">
								<div class="modal__frege-support__item-content__heading">LIVE CHAT</div>
								<p class="modal__frege-support__item-content__text">Unsere Mitarbeiter unterstützen Dich gerne bei der Wahl der
									richtigen Komponenten.</p>
								<a href="#" class="modal__frege-support__item-content__link"><span>Live Chat starten</span></a>
							</div>
						</div>
					</li>
					<li class="modal__frege-support__item">
						<div class="modal__frege-support__item-icon-wrapper">
							<div class="modal__frege-support__item-icon phone"></div>
						</div>
						<div class="modal__frege-support__item-content-wrapper">
							<div class="modal__frege-support__item-content">
								<div class="modal__frege-support__item-content__heading">Rückruf</div>
								<p class="modal__frege-support__item-content__text">Gerne rufen wir Dich zu einem gewünschten Zeitpunkt zurück.</p>
								<a href="#" class="modal__frege-support__item-content__link"><span>Termin für Rückruf vereinbaren</span></a>
							</div>
						</div>
					</li>
					<li class="modal__frege-support__item">
						<div class="modal__frege-support__item-icon-wrapper">
							<div class="modal__frege-support__item-icon mail"></div>
						</div>
						<div class="modal__frege-support__item-content-wrapper">
							<div class="modal__frege-support__item-content">
								<div class="modal__frege-support__item-content__heading">PER MAIL</div>
								<p class="modal__frege-support__item-content__text">Gerne kannst Du uns auch alle Deine Fragen per Mail
									zusenden. Wir melden uns dann zeitnah bei Dir.</p>
								<a href="#" class="modal__frege-support__item-content__link"><span>Jetzt Mail an uns senden</span></a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>


		<div id="modal__share" class="modal__share__wrapper fancybox-content" style="display: none; max-width: 420px; width: 96%; max-height: 90vh;">
			<div class="modal__share">
				<div class="modal__share-text">Teile Deine Konfiguration und frage deine Freunde nach Ihrer Meinung</div>
				<div class="modal__share-btn__list">
					<a href="#" class="modal__share-btn fb">Teilen auf Facebook</a>
					<a href="#" class="modal__share-btn tw">Teilen auf Twitter</a>
				</div>
			</div>
		</div>


		<div id="modal__load" class="modal__load__wrapper fancybox-content" style="display: none; max-width: 587px; width: 96%; max-height: 90vh;">
			<div class="modal__load">
				<label for="bundle-config-load" class="modal__load-heading">Hier kannst du deine Konfiguration laden:</label>
				<ul class="modal__load-version__list">
					<li class="modal__load-version__list-item">
						<div class="version">01.</div>
						<div class="info">
							<div class="line title">Anfrage per Kontaktformular gestellt</div>
							<div class="line">
								<span class="date">23.01.2019, 14:01 Uhr</span> Code: <span class="code">b4sb8of3</span>
							</div>
							<a class="link" href="/laden/b4sb8of3">Jetzt laden</a>
						</div>
					</li>
				</ul>
				<div class="form-field-inline">
					<div class="input-box">
						<input id="bundle-config-load" type="text" class="input-text input-text-big" placeholder="Konfigurations-ID">
						<div class="validation-advice" style="display: none;">
							Entschuldigung, aber Ihre Konfiguration war nicht gefunden. Bitte, überprüfen Sie wieder Ihren Code.
						</div>
					</div>
					<button class="btn btn-primary btn-load">
						<span>Laden</span>
					</button>
				</div>
			</div>
		</div>

		<div id="modal__speichern-mailen" class="modal__speichern-mailen__wrapper fancybox-content" style="display: none; max-width: 587px; width: 96%; max-height: 90vh;">
			<div class="modal__speichern-mailen">
				<label for="bundle_config_id" class="modal__speichern-mailen-heading">TRAGE DEN NAMEN DEINER KONFIGURATION EIN:</label>

				<div class="form-field-inline">
					<div class="input-box">
						<div class="input-text-suffix">
							<span title="This is a version of you saved configuration.">v.2</span>
						</div>
						<input id="bundle_config_id" type="text" class="input-text input-text-big" placeholder="Konfigurations name">
						<div class="validation-advice" style="display: none;">
							Entschuldigung, aber Ihre Konfiguration war nicht gefunden. Bitte, überprüfen Sie wieder Ihren Code.
						</div>
					</div>
					<button class="btn btn-primary btn-load">
						<span>Speichern</span>
					</button>
				</div>
			</div>
		</div>

		<div id="modal__detail" class="modal__detail__wrapper fancybox-content" style="display: none; max-width: 800px; width: 96%; max-height: 90vh;">
			<div class="modal__detail">
				<div class="modal__detail-article">
					<button id="modal__detail-article__nav--prev" class="modal__detail-article__nav modal__detail-article__nav--prev"></button>
					<div id="modal__detail-article__title" class="modal__detail-article__title"></div>
					<button id="modal__detail-article__nav--next" class="modal__detail-article__nav modal__detail-article__nav--next"></button>
				</div>
				<div class="modal__detail-tabs__nav">
					<button class="modal__detail-tabs__nav-btn active">Bilder</button>
					<button class="modal__detail-tabs__nav-btn">Specs</button>
				</div>
				<div class="modal__detail-tabs modal__detail-tabs--content">
					<div class="modal__detail-gallery modal__detail-tabs__tab active">
						<div class="modal__detail-gallery__slider-top__wrapper">
							<button id="modal__detail-gallery__slider-top__arrow--prev" class="modal__detail-gallery__slider-top__arrow modal__detail-gallery__slider-top__arrow--prev"></button>
							<div id="modal__detail-gallery__slider-top" class="modal__detail-gallery__slider-top">
							</div>
							<button id="modal__detail-gallery__slider-top__arrow--next" class="modal__detail-gallery__slider-top__arrow modal__detail-gallery__slider-top__arrow--next"></button>
							<div class="modal__detail-info">
								<div id="modal__detail-price" class="modal__detail-price">
									<span class="price-notice">
										<span class="price">+50,<span class="cents">00</span><span class="currency">€</span></span>
										<span class="currency" style="display: none;">€</span>
									</span>
								</div>
								<label id="modal__detail-choose" class="modal__detail-choose" for="bundle-option-83864-8771735">Auswählen</label>
							</div>
						</div>
						<div class="modal__detail-gallery__slider-bottom__wrapper">
							<div id="modal__detail-gallery__slider-bottom" class="modal__detail-gallery__slider-bottom">
							</div>
						</div>
					</div>
					<div class="modal__detail-main-info modal__detail-tabs__tab">
						<div class="modal__detail-main-info__table-wrapper">
							<div id="modal__detail-main-info__table-text" class="modal__detail-main-info__table-text"></div>
							<ul id="modal__detail-main-info__table" class="modal__detail-main-info__table">
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script src="js/scripts.min.js"></script>

</body>

</html>