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

				<?php require 'components/product-description.php'; ?>
				<!-- /.product-cart -->

				
				<?php require 'components/configurator.php'; ?>
				<!-- /.configurator -->
			</div>

			<?php require 'components/sidebar.php'; ?>
				<!-- /.sidebar -->
		</div>
	</main>

	<?php require 'components/footer.php'; ?>
	<!-- /.footer -->

	<div class="modals-main__wrapper">
		<div id="modal-configurator-summary" class="modal-configurator-summary modal fancybox-content">
			<div class="modal-configurator-summary__content">
				<div class="modal-configurator-summary__sidebar">
					<img src="https://www.mifcom.de/media/catalog/product/cache/1/image/140x/9df78eab33525d08d6e5fb8d27136e95/g/a/gaming_coffeelak_refresh.jpg"
					 alt="" class="modal-configurator-summary__product-img">
					<div class="modal-configurator-summary-status valid">
						<span class="modal-configurator-summary-status__icon"></span>
					</div>
				</div>
				<div id="modal-configurator-summary__table" class="modal-configurator-summary__table">

				</div>
			</div>
		</div>

		<div id="modal-frege-support" class="modal-frege-support modal fancybox-content">
			<div class="modal-frege-support__content">
				<ul class="modal-frege-support__list">
					<li class="modal-frege-support__item">
						<div class="modal-frege-support-icon__wrapper">
							<div class="modal-frege-support-icon chat">

							</div>
							<span class="chat-status offline">offline</span>
						</div>
						<div class="modal-frege-support-info">
							<div class="modal-frege-support-info__heading">LIVE CHAT</div>
							<p class="modal-frege-support-info__text">Unsere Mitarbeiter unterstützen Dich gerne bei der Wahl der
								richtigen Komponenten.</p>
							<a href="#" class="modal-frege-support-info__link"><span>Live Chat starten</span></a>
						</div>
					</li>
					<li class="modal-frege-support__item">
						<div class="modal-frege-support-icon__wrapper">
							<div class="modal-frege-support-icon phone"></div>
						</div>
						<div class="modal-frege-support-info">
							<div class="modal-frege-support-info__heading">Rückruf</div>
							<p class="modal-frege-support-info__text">Gerne rufen wir Dich zu einem gewünschten Zeitpunkt zurück.</p>
							<a href="#" class="modal-frege-support-info__link"><span>Termin für Rückruf vereinbaren</span></a>
						</div>
					</li>
					<li class="modal-frege-support__item">
						<div class="modal-frege-support-icon__wrapper">
							<div class="modal-frege-support-icon mail"></div>
						</div>
						<div class="modal-frege-support-info">
							<div class="modal-frege-support-info__heading">PER MAIL</div>
							<p class="modal-frege-support-info__text">Gerne kannst Du uns auch alle Deine Fragen per Mail
								zusenden. Wir melden uns dann zeitnah bei Dir.</p>
							<a href="#" class="modal-frege-support-info__link"><span>Jetzt Mail an uns senden</span></a>
						</div>
					</li>
				</ul>
			</div>
		</div>


		<div id="modal-share" class="modal-share modal fancybox-content">
			<div class="modal-share__content">
				<div class="modal-share__text">Teile Deine Konfiguration und frage deine Freunde nach Ihrer Meinung</div>
				<div class="modal-share-btn__list">
					<a href="#" class="modal-share-btn fb">Teilen auf Facebook</a>
					<a href="#" class="modal-share-btn tw">Teilen auf Twitter</a>
				</div>
			</div>
		</div>


		<div id="modal-load" class="modal-load modal fancybox-content">
			<div class="modal-load__content">
				<label for="bundle-config-load" class="modal-load__heading">Hier kannst du deine Konfiguration laden:</label>
				<ul class="modal-load-version__list">
					<li class="modal-load-version__item">
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
						<div class="validation-advice" 
						style="display: none;">
							Entschuldigung, aber Ihre Konfiguration war nicht gefunden. Bitte, überprüfen Sie wieder Ihren Code.
						</div>
					</div>
					<button class="btn btn-primary btn-load">
						<span>Laden</span>
					</button>
				</div>
			</div>
		</div>

		<div id="modal-speichern-mailen" class="modal-speichern-mailen modal fancybox-content">
			<div class="modal-speichern-mailen__content">
				<label for="bundle_config_id" class="modal-speichern-mailen__heading">TRAGE DEN NAMEN DEINER KONFIGURATION EIN:</label>

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

		<div id="modal-detail" class="modal-detail modal fancybox-content">
			<div class="modal-detail__content">
				<div class="modal-detail-article">
					<button class="modal-detail-article__nav-btn modal-detail-article__nav-btn--prev"></button>
					<div class="modal-detail-article__title"></div>
					<button class="modal-detail-article__nav-btn modal-detail-article__nav-btn--next"></button>
				</div>
				<div class="modal-detail-tabs-nav">
					<button class="modal-detail-tabs-nav__btn active">Bilder</button>
					<button class="modal-detail-tabs-nav__btn">Specs</button>
				</div>
				<div class="modal-detail-tabs__content">
					<div class="modal-detail-tab active">
						<div class="modal-detail-slider-big__wrapper">
							<button class="modal-detail-slider-big__arrow modal-detail-slider-big__arrow--prev"></button>
							<div class="modal-detail-slider-big">
							</div>
							<button class="modal-detail-slider-big__arrow modal-detail-slider-big__arrow--next"></button>
							<div class="modal-detail-info">
								<div class="modal-detail-price">
									<span class="price-notice">
										<span class="price">+50,<span class="cents">00</span><span class="currency">€</span></span>
										<span class="currency" style="display: none;">€</span>
									</span>
								</div>
								<label class="modal-detail-choose" for="bundle-option-83864-8771735">Auswählen</label>
							</div>
						</div>
						<div class="modal-detail-slider-thumbs__wrapper">
							<div class="modal-detail-slider-thumbs">
							</div>
						</div>
					</div>
					<div class="modal-detail-tab">
						<div class="modal-detail-info-table__wrapper">
							<div class="modal-detail-info-table__text"></div>
							<ul class="modal-detail-info-table">
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