/* =========================================
   PA Service - JavaScript
   1. Burgermenu på tablet og mobil
   2. Kontaktformular (åbner en færdig mail)
   3. Før og efter-slider
   ========================================= */


/* ----- 1. Burgermenu ----- */
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('header nav');

menuButton.addEventListener('click', function () {
  // Vis eller skjul menuen
  menu.classList.toggle('open');

  // Fortæl skærmlæsere om menuen er åben eller lukket
  const isOpen = menu.classList.contains('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});


/* ----- 2. Kontaktformular -----
   Siden har ingen server, så formularen laver en færdig mail
   til PA Service og åbner den i brugerens mailprogram.
   Skal mailen sendes til en anden adresse, så ret den her: */
const emailAddress = 'paservice@outlook.dk';

// Formularen findes kun på forsiden, så vi tjekker først om den er der
const form = document.querySelector('#contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    // Stop siden i at genindlæse
    event.preventDefault();

    // Hent det, brugeren har skrevet
    const name = form.querySelector('#navn').value;
    const phone = form.querySelector('#telefon').value;
    const type = form.querySelector('#type').value;
    const message = form.querySelector('#besked').value;

    // Byg mailens emne og tekst
    const subject = 'Forespørgsel fra hjemmesiden: ' + type;
    const body =
      'Navn: ' + name + '\n' +
      'Telefon: ' + phone + '\n' +
      'Opgave: ' + type + '\n\n' +
      message;

    // encodeURIComponent sørger for, at æ, ø, å og linjeskift virker i mailen
    const mailLink = 'mailto:' + emailAddress +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    // Åbn mailprogrammet og vis en besked på siden
    window.location.href = mailLink;
    form.querySelector('.form-message').style.display = 'block';
  });
}


/* ----- 3. Før og efter-slider -----
   Før-billedet ligger oven på efter-billedet.
   Når man trækker i slideren (0-100), klipper vi før-billedet,
   så man kun ser den venstre del af det. */
const compares = document.querySelectorAll('.compare');

// Der kan være flere slidere på samme side, så vi går dem igennem én ad gangen
compares.forEach(function (compare) {
  const range = compare.querySelector('.compare-range');
  const before = compare.querySelector('.compare-before');
  const line = compare.querySelector('.compare-line');

  range.addEventListener('input', function () {
    const value = range.value;  // et tal mellem 0 og 100

    // Klip før-billedet fra højre, så der kun er "value" procent tilbage
    before.style.clipPath = 'inset(0 ' + (100 - value) + '% 0 0)';

    // Flyt den hvide streg med
    line.style.left = value + '%';
  });
});
