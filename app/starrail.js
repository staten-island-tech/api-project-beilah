const url = '/hsr/api/v1/characters';

async function getData(url) {
  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(`Error status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    const container = document.querySelector(".container");
    container.innerHTML = "";

    result.forEach(character => {
      const card = document.createElement("div");
      card.classList.add("card");
      image = character.img
      card.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${image}" alt="${character.name}">
        <p>${character.element} • ${character.path}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

getData(url);
