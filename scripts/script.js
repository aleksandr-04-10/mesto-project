
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

const elementTemplate = document.querySelector ('.elements__template').content;
const popupProfil = document.querySelector ('.popup_profil');
const popupCards = document.querySelector ('.popup_cards');
const popupImage = document.querySelector('.popup_image')
const title = document.querySelector (".profile__title");
const subtitle = document.querySelector ('.profile__subtitle');
const nameInput = popupProfil.querySelector ('#name');
const jobInput = popupProfil.querySelector ('#job');
const imageContainer = document.querySelector ('.popup__image-container');
const imageCaption = document.querySelector ('.popup__image-caption');
const cardsContainer = document.querySelector ('.elements');
const placeInput = popupCards.querySelector('#place');
const linkInput = popupCards.querySelector('#link');
const popups = document.querySelectorAll('.popup');
const profileCreateButton = document.querySelector('.profile__profil-edit');
const cardCreateButton = document.querySelector('.profile__card-edit');
const profileCloseButton = document.querySelector('.popup__close-batton-profile');
const cardCloseButton = document.querySelector('.popup__close-batton-card');
const imageCloseButton = document.querySelector('.popup__close-batton-image');
const profileSaveForm = document.forms['profil'];

profileCreateButton.addEventListener("click", openPropfilePopup);
cardCreateButton.addEventListener("click", () => togglePopup(popupCards));
profileCloseButton.addEventListener("click", () => togglePopup(popupProfil));
cardCloseButton.addEventListener("click", () => togglePopup(popupCards));
imageCloseButton.addEventListener("click", () => togglePopup(popupImage));

function openPropfilePopup() { 
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;//заполняем поля формы 
  togglePopup(popupProfil)//вызываем функцию для открытия попапа 
  } 

//открытие\закрытие
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
} 

//popupProfilText
function editProfilText (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    title.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
    subtitle.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
    togglePopup(popupProfil);
}
profileSaveForm.addEventListener ("submit", editProfilText);// кнопка редактирования профиля


const editCardContent = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addCard(cardsContainer, createCard(placeInput.value, linkInput.value));
  togglePopup(popupCards);
  document.forms['cards'].reset()
};

popupCards.addEventListener("submit", editCardContent);// кнопка добавления карточки



const createCard = (name, link) => {
  // clon template 
  const cardElement = elementTemplate.cloneNode (true);
  const photo = cardElement.querySelector ('.elements__place-photo');

  cardElement.querySelector ('.elements__title').textContent = name;
  photo.setAttribute("src", link);
  photo.alt = name;

  cardElement.querySelector('.elements__like').addEventListener("click", addLike);  

  cardElement.querySelector('.elements__delete').addEventListener("click", removeCard); 

  photo.addEventListener("click", openImages); 
            
  return cardElement;
};

// like
const addLike = (evt) => {
  evt.target.classList.toggle ('elements__like_active')
};

// delete
const removeCard = (evt) => {
  evt.target.closest('.elements__card').remove();
};
// image popup
const openImages = (evt) => {
  imageContainer.src = `${evt.target.src}`;
  imageContainer.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;
  togglePopup(popupImage);
};
// add
const addCard = (cardsContainer, cardElement) => {
  cardsContainer.prepend(cardElement);
};

// render
initialCards.forEach((element) =>
  addCard(cardsContainer, createCard(element.name, element.link))
);