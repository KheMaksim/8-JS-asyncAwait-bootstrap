const loader = document.querySelector('#preloader');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const searchArea = document.querySelector('#search-Area');
const cardContainer = document.querySelector('.card__container');
const cardBtn = document.querySelectorAll('.card__btn.btn');
const alertWindow = document.querySelector('.info');
const title = document.querySelector('.info__title');
const list = document.querySelector('.info__list');

const modal = () => {
	overlay.style.display = 'block';
	alertWindow.style.display = 'flex'
}
const close = () => {
	overlay.style.display = 'none';
	alertWindow.style.display = 'none'
}

const createCard = (image, cocktail) => {
	const card = document.createElement('div');
	card.className = 'card';
	const cardImage = document.createElement('img');
	cardImage.className = 'card__image'
	cardImage.setAttribute('src', image);
	const cardBody = document.createElement('div');
	cardBody.className = 'card-body';
	const coctailName = document.createElement('h2');
	coctailName.className = 'card-title';
	const button = document.createElement('a');
	button.className = "card__btn btn"
	addFn(coctailName, cardBody, cocktail);
	addFn(button, cardBody, 'Show more information');
	addFn(card, cardContainer, cardImage);
	addFn(card, cardContainer, cardBody);
}

const ingredientsList = (cocktail) => {
	const ul = document.createElement('ul')
	ul.className = 'info__list';
	ul.append('Ingredients: ');
	for (let j = 1; j <= 15; j++) {
		const ingredient = cocktail[`strIngredient${j}`];
		const measure = cocktail[`strMeasure${j}`];
		if (ingredient !== null) {
			const li = document.createElement('li');
			li.className = 'info__subtitle';
			const img = document.createElement('img');
			img.className = 'info__image';
			img.setAttribute('src', `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`);
			li.append(img);
			if (measure !== null) {
				li.append(`${ingredient} (${measure}).`);
			} else {
				li.append(`${ingredient}.`);
			}
			ul.append(li);
		}
	}
	alertWindow.append(ul);
}

const addModalInfo = (cocktail) => {
	const { strDrink, strCategory, strAlcoholic, strGlass, strInstructions } = cocktail;
	createTitle(`${strDrink} cocktail info:`, alertWindow);
	ingredientsList(cocktail);
	createTitle(`Category: ${strCategory}`, alertWindow);
	if (strAlcoholic === true) {
		createTitle(`Alcoholic: yes`, alertWindow);
	} else {
		createTitle(`Alcoholic: non-alcoholic`, alertWindow);
	}
	createTitle(`Glass type: ${strGlass}`, alertWindow);
	createTitle(`Instructions: ${strInstructions}`, alertWindow);
	const btn = document.createElement('button');
	btn.className = 'info__btn';
	btn.append('close');
	alertWindow.append(btn);
	modal();
	btn.addEventListener("click", close);
}

const mainInfo = async (url) => {
	loader.style.display = 'block';
	try {
		const { drinks } = await request(url);
		for (let i = 0; i < drinks.length; i++) {
			const { strDrink, strDrinkThumb } = drinks[i];
			createCard(strDrinkThumb, strDrink);
		}
		loader.style.display = 'none';
		const cardBtns = document.querySelectorAll('.card__btn.btn');
		cardBtns.forEach((btn, i) => {
			btn.addEventListener('click', () => {
				alertWindow.innerHTML = '';
				addModalInfo(drinks[i]);
			});
		})
	} catch (error) {
		myAlert('You entered a wrong cocktail name! Try again.')
		console.error(error);
	} finally {
		loader.style.display = 'none';
	}
}

overlay.addEventListener("click", close);

form.addEventListener('submit', (e) => {
	e.preventDefault();
	cardContainer.innerHTML = '';
	mainInfo(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchArea.value}`);
	// mainInfo(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchArea.value}`);
})