import "./styles.css";

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

      const button = document.createElement("button");
      button.textContent = "View More Information";
      button.classList.add("moreInfo");

      button.addEventListener("click", () => {
        container.innerHTML = `
      <h3>${episode.name}</h3>
      <img src="${episode.image}">
      <p>Air Date: ${episode.airdate}</p>
      <p>Storyboard: ${episode.storyboard}</p>
      <p>Written By: ${episode.writtenby}</p>
      <a href="${episode.url}" target="_blank">Episode Page</a>
    `;
      });

      card.innerHTML = `
    <h3>${episode.name}</h3>
    <img src="${episode.image}">
  `;
      card.appendChild(button);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getData(url);
