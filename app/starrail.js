const url = 'https://genshin.jmp.blue/characters'
async function getData(url) {
  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(`error Status: ${response.status}`);
    }

    const data = await response.json();
      console.log(data)

    // extract  object from the API response
    const characters = data.result[0];

    const container = document.querySelector(".container");
    container.innerHTML="";

    characters.forEach(character => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${character.name}</h3>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

getData(url);