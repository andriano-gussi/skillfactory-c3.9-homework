const divCity = document.querySelector('#city');
const inputCity = document.querySelector('input[name=city]');
const divSavedCity = document.querySelector('#saved_city');
const btnChangeCity = document.querySelector('#change_city');
const btnSaveChanges = document.querySelector('#save_changes');

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

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

btnSaveChanges.addEventListener('click', () => {
  console.log(inputCity.value);
  document.cookie = "user=xxx; max-age=600";
  document.cookie = 'userCity=' + inputCity.value + '; ' + 'max-age=600';
  //setCookie('userCity', inputCity.value, {'max-age': 600});
  //alert(document.cookie);
});
