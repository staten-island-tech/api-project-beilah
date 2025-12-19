const url = "https://www.amiiboapi.com/api/amiibo/?gameseries=Animal%20Crossing";

async function getData(url) {
  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(`error Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)

    const container = document.querySelector(".container");
    container.innerHTML="";

    data.amiibo.forEach(character => {
      const card = document.createElement("div");
      card.classList.add("card");

       card.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.image}">
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

getData(url);