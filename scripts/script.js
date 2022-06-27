
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
const popupProfil = document.querySelector ('.popup_profil');
const popupCards = document.querySelector ('.popup_cards');
const popupImage = document.querySelector ('.popup_image');
const profilEedit = document.querySelector ('.profile__profil-edit');
const cardEdit = document.querySelector ('.profile__card-edit');
const profileClose = document.querySelector ('.popup__close-profil');
const cardClose = document.querySelector ('.popup__close-card');
const imageClose = document.querySelector ('.popup__close-image');
const title = document.querySelector (".profile__title");
const subtitle = document.querySelector ('.profile__subtitle');
const nameInput = popupProfil.querySelector ('#name');
const jobInput = popupProfil.querySelector ('#job');
const imageContainer = document.querySelector ('.popup__image-container');
const imageCaption = document.querySelector ('.popup__image-caption');
const elements = document.querySelector ('.elements');
const elementTemplate = document.querySelector ('.elements__template').content;

function inputFormProfile (){
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}

//открытие\закрытие
function openedProfil (){
  popupProfil.classList.toggle('popup_opened');
  inputFormProfile();
}

function openedCards (){
  popupCards.classList.toggle('popup_opened');
}

function openedImage (){
  popupImage.classList.toggle('popup_opened');
}

profilEedit.addEventListener ('click', openedProfil);
cardEdit.addEventListener ('click', openedCards);
profileClose.addEventListener ('click', openedProfil);
cardClose.addEventListener ('click', openedCards);
imageClose.addEventListener ('click', openedImage);


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    title.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
    subtitle.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
    openedProfil();
}

popupProfil.addEventListener ('submit', formSubmitHandler);

//popupCards
const placeInput = popupCards.querySelector('#place');// Воспользуйтесь инструментом .querySelector()
const linkInput = popupCards.querySelector('#link');// Воспользуйтесь инструментом .querySelector()
function addpopupCards (evt) {
  evt.preventDefault (); // Эта строчка отменяет стандартную отправку формы.
  const cardElement = elementTemplate.cloneNode (true);

  cardElement.querySelector ('.elements__title').textContent = placeInput.value;
  cardElement.querySelector ('.elements__place-photo').src = linkInput.value;
  cardElement.querySelector ('.elements__place-photo').alt = placeInput.value;
  creatureComponentCards (cardElement);
  elements.prepend (cardElement);
  openedCards();
}

popupCards.addEventListener('submit', addpopupCards);

initialCards.forEach(function (element) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.elements__title').textContent = element.name;
  cardElement.querySelector('.elements__place-photo').src = element.link;
  cardElement.querySelector('.elements__place-photo').alt = element.name;
  creatureComponentCards (cardElement);

  elements.append (cardElement);
})

function creatureComponentCards (cardElement){
  cardElement.querySelector ('.elements__like').addEventListener ('click', function(evt){
    evt.target.classList.toggle ('elements__like_active');// Лайки
  });

  cardElement.querySelector('.elements__delete').addEventListener('click', function(evt){
    const elementDelete = evt.target.closest ('.elements__card');
    elementDelete.remove ();
  });

  cardElement.querySelector ('.elements__place-photo').addEventListener ('click', function(evt){
    openedImage ()
    const adres = evt.target.src;
    imageContainer.style.backgroundImage = `url(${adres})`;
    imageCaption.textContent = evt.target.alt;
  });
}
