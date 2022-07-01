
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
const popupImage = document.querySelector('.popup_image')
const popupCloseBotton = document.querySelectorAll('.popup__close-batton');
const title = document.querySelector (".profile__title");
const subtitle = document.querySelector ('.profile__subtitle');
const nameInput = popupProfil.querySelector ('#name');
const jobInput = popupProfil.querySelector ('#job');
const imageContainer = document.querySelector ('.popup__image-container');
const imageCaption = document.querySelector ('.popup__image-caption');
const cardsContainer = document.querySelector ('.elements');
const placeInput = popupCards.querySelector('#place');
const linkInput = popupCards.querySelector('#link');
const popups = document.querySelectorAll(".popup");
const btns = document.querySelectorAll('.popup_open-batton')


btns.forEach((item) => {
  item.addEventListener('click', togglePopup);
});

popupCloseBotton.forEach((item) => {
  item.addEventListener ('click',closePopup);
});

function inputFormProfile (evt){
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  closePopup (evt);
}

//открытие\закрытие
  function togglePopup(evt){
    const index = Array.from(btns).indexOf(evt.target);
    if (index === 0 ||  index === 1) {
      popups[index].classList.toggle("popup_opened");
    } else {
      popupImage.classList.toggle("popup_opened");
    }
  }

function closePopup (evt){
  const popup = evt.target.closest ('.popup');
  popup.classList.toggle ('popup_opened');
}


//popupProfilText
function editProfilText (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    title.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
    subtitle.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
    inputFormProfile (evt);
}
popupProfil.addEventListener ('submit', editProfilText);// кнопка редактирования профиля


const cardSubmitButton = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardAdd(cardsContainer, cardCreate(placeInput.value, linkInput.value));
  closePopup (evt);
};

popupCards.addEventListener("submit", cardSubmitButton);// кнопка добавления карточки



const cardCreate = (name, link) => {
  // clon template 
  const elementTemplate = document.querySelector ('.elements__template').content;
  const cardElement = elementTemplate.cloneNode (true);

  cardElement.querySelector ('.elements__title').textContent = name;
  cardElement.querySelector ('.elements__place-photo').setAttribute("src", link);
  cardElement.querySelector ('.elements__place-photo').alt = name;

  cardElement.querySelector('.elements__like').addEventListener("click", likeAdd);  

  cardElement.querySelector('.elements__delete').addEventListener("click", cardRemove); 

  cardElement.querySelector('.elements__place-photo').addEventListener("click", imagesOpen); 
                                                 
  return cardElement;
};

// like
const likeAdd = (evt) => {
  evt.target.classList.toggle ('elements__like_active')
};

// delete
const cardRemove = (evt) => {
  evt.target.closest('.elements__card').remove();
};
// image popup
const imagesOpen = (evt) => {
  imageContainer.style.backgroundImage = `url(${evt.target.src})`;
  imageCaption.textContent = evt.target.alt;
  togglePopup(evt);
};
// add
const cardAdd = (cardsContainer, cardElement) => {
  cardsContainer.prepend(cardElement);
};

// render
initialCards.forEach((element) =>
  cardAdd(cardsContainer, cardCreate(element.name, element.link))
);