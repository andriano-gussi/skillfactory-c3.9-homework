// для удобства записываем в переменные необходимые элементы страницы:
const divCity = document.querySelector('#city');
const inputCity = document.querySelector('input[name=city]');
const divSavedCity = document.querySelector('#saved_city');
const userCityName = document.querySelector('#user_city');
const btnChangeCity = document.querySelector('#change_city');
const h2 = document.querySelector('h2');
const btnSaveChanges = document.querySelector('#save_changes');
const boxes = document.querySelectorAll('.form-check-input');

// присваеваем по умолчанию пустые значения для служебных переменных:
// boxesStatus - для информации о состоянии чекбоксов
// userCity - для хранения названия города пользователя
let boxesStatus = '';
let userCity = '';

// записывает куки
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    expires: '',
  };

  if (options.expires.toUTCString) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

// возвращает значение куки с указанным именем (name)
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// удаляет куку с именем name
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

// устанавливае все чекбоксы в неактивное состояние
function setBoxesDisabled(item) {
  item.disabled = true;
}

// проверяет состояние каждого чекбокса и формирует строку boxesStatus:
// в которую по каждому чекбоксу добавляется его состояние,
// где "1" - когда чекбокс отмечен, и "0" - в противном случае 
function saveBoxesStatus (item) {
  item.checked ? boxesStatus = boxesStatus + '1' : boxesStatus = boxesStatus + '0';
}

// расшифровывает строку boxesStatus - в соответствии с ее содержимым
// устанавливает для каждого чекбокса состояние: отмечен или не отмечен
function setBoxesStatus () {
  for (let i = 0; i < boxesStatus.length; i++) {
    boxesStatus[i] == '1' ? boxes[i].checked = true : boxes[i].checked = false;
  }
}

// обрабатываем клик по кнопке "Запомнить информацию"
btnSaveChanges.addEventListener('click', () => {
  // записываем куку с названием города, который введен пользователем
  setCookie('userCity', inputCity.value, {'max-age': 600});
  
  // готовим информцию о состоянии чекбоксов и записываем
  // соответствующую куку
  boxes.forEach(saveBoxesStatus);
  setCookie('boxesStatus', boxesStatus, {'max-age': 600});
  
  alert('Все изменения сохранены! Можете перезагрузить страницу или браузер');
});

// обрабатываем клик по кнопке "Изменить"
btnChangeCity.addEventListener('click', () => {
  //удаляем ранее сохраненные куки, обновляем страницу
  deleteCookie('userCity');
  deleteCookie('boxesStatus');
  location.reload();
});

// основная функция, читает куки, если они есть - отображает
// на странице информацию с введенным ранее городом и выбранными ранее
// чекбосками. Здесь активной будет только кнопка "Изменить",
// при нажатии на которую можно будет изменить город и отметить чекбоксы
function init() {
  userCity = getCookie('userCity');
  boxesStatus = getCookie('boxesStatus');
  if (userCity) {
    divCity.style.display = 'none';
    h2.style.display = 'none';
    btnSaveChanges.style.display = 'none';
    userCityName.innerText = userCity;
    setBoxesStatus();
    boxes.forEach(setBoxesDisabled);
    divSavedCity.style.display = 'flex';
  }
}

document.addEventListener('DOMContentLoaded', init);
