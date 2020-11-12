// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.getElementById('menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
});

const sidebarMenu = document.querySelector('.sidebar-menu'),
  sidebarMenuItem = document.querySelectorAll('.sidebar-menu-item'),
  login = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  InputEmail = document.querySelector('.login-form__input_email'),
  InputPassword = document.querySelector('.login-form__input_password'),
  loginSignin = document.querySelector('.login-signin'),
  loginSignup = document.querySelector('.login-signup'),
  userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name'),
  exit = document.querySelector('.exit');

const listUsers = [{
    email: 'admin@gmail.com',
    password: 'admin',
    displayName: 'admin'
  },
  {
    email: 'dima@gmail.com',
    password: '1234',
    displayName: 'Dima'
  }
];

sidebarMenu.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.closest('.sidebar-menu-item')) {
    sidebarMenuItem.forEach(item => {
      if (item === e.target.closest('.sidebar-menu-item')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
});

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);

    if (user && user.password === password) {
      this.autorizedUser(user);
      handler();
    } else {
      alert('Не верно введелы email и пароль');
    }
  },
  logOut() {
    this.user = null;
    toggleAuthDom();
  },
  signUp(email, password, handler) {
    const check = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

    if (check.test(email)) {
      if (!this.getUser(email)) {
        const index = email.indexOf('@'),
          displayName = email.substring(0, index);

        const user = {
          email,
          password,
          displayName
        };

        listUsers.push(user);
        this.autorizedUser(user);
        handler();
      } else {
        alert('Пользователь с таким email уже зарегестрирован');
      }
    } else {
      alert('Неверный email');
    }

  },
  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  autorizedUser(user) {
    this.user = user;
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    login.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    login.style.display = '';
    userElem.style.display = 'none';
  }
};

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  setUsers.logIn(InputEmail.value, InputPassword.value, toggleAuthDom);
  loginForm.reset();
});

loginSignup.addEventListener('click', e => {
  e.preventDefault();
  if (InputEmail.value.trim() !== '' && InputPassword.value.trim() !== '') {
    setUsers.signUp(InputEmail.value, InputPassword.value, toggleAuthDom);
    loginForm.reset();
  } else {
    alert('Введите данные');
  }
});

exit.addEventListener('click', () => {
  setUsers.logOut();
});