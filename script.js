/**
 *Показуємо ділянку карти за замовчуванням
 */
let map = L.map('map').setView([48.40745240, 35.04880767], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/**
 * Робимо массив з параметрами маркерів
 */

const markersData = [
  {
    id: 1, lat: 48.40745240, lng: 35.04880767, info: "<b>Аптека №1</b>" +
      "<br><span>Адреса аптеки.</span><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a>"
  },
  {
    id: 2, lat: 48.40719470690752, lng: 35.04817699610385, info: "<b>Аптека №2</b>" +
      "<br><span>Адреса аптеки.</span><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a>"
  },
  {
    id: 3, lat: 48.40952338886608, lng: 35.000336557491345, info: "<b>Аптека №3</b>" +
      "<br><span>Адреса аптеки.</span><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a>"
  },
];

/**
 * Сховище маркерів для взаємодії
 */
const markers = {}

/**
 * Додаємо маркери на карту
 */

markersData.forEach(data => {
  const marker = L.marker([data.lat, data.lng]).addTo(map).bindPopup(data.info);

  //Зберігаємо маркер в об'єкт з модифікатором
  markers[data.id] = marker;

  //обробник кліку по маркеру
  marker.on('click', () => {
    //підсвічуємо елемент списку
    document.querySelectorAll('#pharmacy-list .pharmacy-item').forEach(li => li.classList.remove('active'))
    const listItem = document.querySelector(`#pharmacy-list li[data-id="${data.id}"]`)
    if (listItem) {
      listItem.classList.add('active');
      listItem.scrollIntoView({behavior: 'smooth'})
    }
  })
})

document.querySelectorAll('#pharmacy-list .pharmacy-item').forEach(item => {
  const locationLink = item.querySelector('.pharmacy-location')
  locationLink.addEventListener('click', () => {
    const id = item.getAttribute('data-id')
    if (markers[id]) {
      map.setView(markers[id].getLatLng(), 20);
      markers[id].openPopup();

      //Підсвічування елементу списка
      document.querySelectorAll('#pharmacy-list .pharmacy-item').forEach(li => {
        li.classList.remove('active')
      })
      item.classList.add('active')
    }
  })
})


const citySelect = document.querySelector('.select-item');
const pharmacyWrap = document.querySelector('.pharmacy-wrap');
const mapWrap = document.querySelector('.map-wrap');

if (window.innerWidth > 992) {
  pharmacyWrap.prepend(citySelect)
} else {
  mapWrap.append(citySelect)
}

window.addEventListener('resize', event => {
  if (event.target.innerWidth > 992) {
    pharmacyWrap.prepend(citySelect)
  } else {
    mapWrap.append(citySelect)
  }
})

new SlimSelect({
  select: '#citySelect',
  events: {
    beforeOpen: () => {
      const select = document.querySelector('#citySelect')
      const options = select.options
      console.log(options)
      const slimOptions = document.querySelectorAll('.ss-option')

      slimOptions.forEach((slimOption,index)=>{
        const dataRegion = options[index].getAttribute('data-region')
        if(dataRegion)  slimOption.setAttribute('data-region', dataRegion)
      })
    },
  },
  settings: {
    searchPlaceholder: 'Оберіть місто',
    searchText: 'Нічого не знайдено',
    searchingText: 'Шукаємо...',
    placeholderText: 'Обране значення',
  }
})

