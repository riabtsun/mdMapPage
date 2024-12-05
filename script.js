/**
 *Показуємо ділянку карти за замовчуванням
 */
let map = L.map('map').setView([48.40745240, 35.04880767], 18);

/**
 *Ставимо маркери з координатами аптек
 */
let marker = L.marker([48.40745240, 35.04880767],{alt: 'Аптека №1'}).addTo(map);
let marker2 = L.marker([48.40719470690752, 35.04817699610385],{alt: 'Аптека №1'}).addTo(map);


/**
 * Налаштовуємо відображення інформації по кліку на маркер
 */
marker.bindPopup("<b>Аптека №1</b>" +
  "<br><span>Адреса аптеки.</span><br>" +
  "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
  "<a href='tel:+380631234567'>063-123-45-67</a>").openPopup();

marker2.bindPopup("<b>Аптека №2</b>" +
  "<br><span>Адреса аптеки.</span><br>" +
  "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
  "<a href='tel:+380631234567'>063-123-45-67</a>").openPopup();


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);