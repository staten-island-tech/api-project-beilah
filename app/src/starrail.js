import './styles.css'

const url = "http://ponyapi.net/v1/episode/all";

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

    result.data.forEach((episode) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${episode.name}</h3>
        <img 
          src="${episode.image}" 
          alt="${episode.name}" 
          onerror="this.src='/placeholder.png'"
        >
        <h4>Season: ${episode.season} • Episode: ${episode.episode} • Overall: ${episode.overall}</h4>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getData(url);
