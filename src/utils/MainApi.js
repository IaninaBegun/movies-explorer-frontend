import {baseUrl} from './utils';


/* проверка ответа сервера */
const checkResponse = (response) => response.ok ? response.json() : Promise.reject(response.status);

/* функция для извлечения токена и добавления в заголовки запросов */
const getToken = () => {
  const token = localStorage.getItem('jwt');
  return {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

/* регистрация пользователя */
export const register = (password, email, name) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(password, email, name)
  })
  .then(checkResponse)
}


/* авторизация */
export const authorize = ({password, email}) => {
  console.log(password, email)
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(checkResponse)
}


/* получение данных пользователя */
export const getContent = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then(checkResponse)
}

/* обновление данных пользователя */

export const updateUserInfo = (name, email) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: getToken(),
    body: JSON.stringify({
      name: `${name}`,
      email: `${email}`
    })
  })
  .then(checkResponse)
}

/* получение фильмов пользователя */
export const getSavedMovies = () => {
  return fetch(`${baseUrl}/movies`, {
    method: 'GET',
    headers: getToken()
  })
  .then(checkResponse)
}

/* добавление фильма в сохранённые */

export const addNewMovie = (movie) => {
  return fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers: getToken(),
    body: JSON.stringify(movie)
  })
  .then(checkResponse)
}
 /* удаление фильма из сохранённых */

export const deleteCard = (id) => {
  return fetch(`${baseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: getToken()
  })
  .then(checkResponse)
}


