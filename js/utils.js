const request = async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
		loader.style.display = 'none';
		throw Error('Request error' + response.status);
	};
	return await response.json();
}

const addFn = (firstParent, secondParent, value) => {
	firstParent.append(value);
	secondParent.append(firstParent);
}

const createTitle = (text, parent) => {
	const title = document.createElement('p');
	title.className = 'info__subtitle';
	title.append(text);
	parent.append(title)
}

