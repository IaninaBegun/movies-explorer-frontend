import movie1 from '../images/movie-pic-1.png';
import movie2 from '../images/movie-pic-2.png';
import movie3 from '../images/movie-pic-3.png';
import movie4 from '../images/movie-pic-4.png';
import movie5 from '../images/movie-pic-5.png';
import movie6 from '../images/movie-pic-6.png';
import movie7 from '../images/movie-pic-7.png';
import movie8 from '../images/movie-pic-8.png';
import movie9 from '../images/movie-pic-9.png';
import movie10 from '../images/movie-pic-10.png';
import movie11 from '../images/movie-pic-11.png';
import movie12 from '../images/movie-pic-12.png';

export const initialMoviesCards = [
  {
    id: '1',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: '33 слова о дизайне',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie1,
    image: {
      url: movie1,
      formats: {
        thumbnail: {
          url: movie1,
        }
      }
    }

  },

  {
    id: '2',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Киноальманах «100 лет дизайна»',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie2,
    image: {
      url: movie2,
      formats: {
        thumbnail: {
          url: movie2,
        }
      }
    }
  },

  {
    id: '3',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'В погоне за Бенкси',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie3,
    image: {
      url: movie3,
      formats: {
        thumbnail: {
          url: movie3,
        }
      }
    }
  },

  {
    id: '4',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Баския: Взрыв реальности',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie4,
    image: {
      url: movie4,
      formats: {
        thumbnail: {
          url: movie4,
        }
      }
    }
  },

  {
    id: '5',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Бег это свобода',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie5,
    image: {
      url: movie5,
      formats: {
        thumbnail: {
          url: movie5,
        }
      }
    }
  },

  {
    id: '6',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Книготорговцы',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie6,
    image: {
      url: movie6,
      formats: {
        thumbnail: {
          url: movie6,
        }
      }
    }
  },
  {
    id: '7',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Когда я думаю о Германии ночью',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie7,
    image: {
      url: movie7,
      formats: {
        thumbnail: {
          url: movie7,
        }
      }
    }
  },
  {
    id: '8',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Gimme Danger: История Игги и The Stooges',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie8,
    image: {
      url: movie8,
      formats: {
        thumbnail: {
          url: movie8,
        }
      }
    }
  },
  {
    id: '9',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Дженис: Маленькая девочка грустит',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie9,
    image: {
      url: movie9,
      formats: {
        thumbnail: {
          url: movie9,
        }
      }
    }
  },
  {
    id: '10',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Соберись перед прыжком',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie10,
    image: {
      url: movie10,
      formats: {
        thumbnail: {
          url: movie10,
        }
      }
    }
  },
  {
    id: '11',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'Пи Джей Харви: A dog called money',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie11,
    image: {
      url: movie11,
      formats: {
        thumbnail: {
          url: movie11,
        }
      }
    }
  },
  {
    id: '12',
    country: 'Россия',
    director: 'вася',
    year: '1090',
    nameRU: 'По волнам: Искусство звука в кино',
    nameEN: '33 слова о дизайне',
    duration: '1ч 17м',
    trailer: movie12,
    image: {
      url: movie12,
      formats: {
        thumbnail: {
          url: movie12,
        }
      }
    }
  },
];

export function adjustData (someMovies) {
  const newMovies = someMovies.map((m) => {
    return {
      movieId: `${m.id}`,
      country: `${m.country}`,
      director: `${m.director}`,
      duration: `${m.duration}`,
      year: `${m.year}`,
      description: `${m.description}`,
      image: `https://api.nomoreparties.co${m.image.url}`,
      trailer: `https://api.nomoreparties.co${m.trailer}`,
      thumbnail: `https://api.nomoreparties.co${m.image.formats.thumbnail.url}`,
      nameRU: `${m.nameRU}`,
      nameEN: `${m.nameEN}`

  }});
  return newMovies;
}

/*console.log(adjustData(initialMoviesCards));*/
