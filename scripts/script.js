const popup = document.querySelector('.popup');
const popupCards = document.querySelector('.popup-cards');
const popupImage = document.querySelector('.popup-image');

//открытие\закрытие
function opened(){
  popup.classList.toggle('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}

function openedCards(){
  popupCards.classList.toggle('popup_opened');
}

function openedImage(){
  popupImage.classList.toggle('popup_opened');
}

//находим кнопки
const addButton = document.querySelector('.profile__button-add');
addButton.addEventListener('click', openedCards);
const closeButtonCards = document.querySelector('.popup-cards__close-icon');
closeButtonCards.addEventListener('click', openedCards);
const editButton = document.querySelector('.profile__button-edit');
editButton.addEventListener('click', opened);
const closeButton = document.querySelector('.popup__close-icon');
closeButton.addEventListener('click', opened);
//saveButton.addEventListener('submit',save)
const closePhoto = document.querySelector('.popup-image__close-icon');
closePhoto.addEventListener('click',openedImage);

//формы
let title = document.querySelector(".profile__title");
let subtitle = document.querySelector('.profile__subtitle');
// Находим форму в DOM
//const popup = document.querySelector('.popup');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = popup.querySelector('#fname');// Воспользуйтесь инструментом .querySelector()
const jobInput = popup.querySelector('#profi');// Воспользуйтесь инструментом .querySelector()
nameInput.value = title.textContent;
jobInput.value = subtitle.textContent;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    title.textContent="";
    subtitle.textContent="";
    title.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
    subtitle.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
    opened();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popup.addEventListener('submit', formSubmitHandler);

//popupCards
const mestoInput = popupCards.querySelector('#mesto');// Воспользуйтесь инструментом .querySelector()
const ssulkaInput = popupCards.querySelector('#ssulka');// Воспользуйтесь инструментом .querySelector()
function popupCardsAdd (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const cardElement = elementTemplate.cloneNode(true);
  mestoInput.value ='';
  ssulkaInput.value = '';
  cardElement.querySelector('.elements__title').textContent = mestoInput.value;
  cardElement.querySelector('.elements__place-photo').src = ssulkaInput.value;

  cardElement.querySelector('.elements__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('elements__like_active');// Лайки
  });

  cardElement.querySelector('.elements__delete').addEventListener('click', function(evt){
    evt.target.nextSibling.parentElement.remove();// Удание
  });

  cardElement.querySelector('.elements__place-photo').addEventListener('click', function(evt){
    popupImage.classList.toggle('popup_opened');
    const adres = evt.target;
    imageContainer.style.backgroundImage = `url(${adres.src})`;
    imageCaption.innerText = adres.parentElement.innerText;
  });

  elements.append(cardElement);
  openedCards();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupCards.addEventListener('submit', popupCardsAdd);

//popup-image
const imageContainer = document.querySelector('.popup-image__container');
const imageCaption = document.querySelector('.popup-image__caption');

//карточки из коробки
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.elements__template').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

initialCards.forEach(function (element) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.elements__title').textContent = element.name;
  cardElement.querySelector('.elements__place-photo').src = element.link;

  cardElement.querySelector('.elements__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('elements__like_active');// Лайки
  });

  cardElement.querySelector('.elements__delete').addEventListener('click', function(evt){
    evt.target.nextSibling.parentElement.remove();// Удание
  });

  cardElement.querySelector('.elements__place-photo').addEventListener('click', function(evt){
    popupImage.classList.toggle('popup_opened');
    const adres = evt.target;
    imageContainer.style.backgroundImage = `url(${adres.src})`;
    imageCaption.innerText = adres.parentElement.innerText;
  });

  elements.append(cardElement);
})
//карточки из коробки

