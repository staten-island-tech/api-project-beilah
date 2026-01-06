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

      card.innerHTML = `
        <h3 class="epName">${episode.name}</h3>
        <img 
          src="${episode.image}" 
          alt="${episode.name}" 
          onerror="this.src='/placeholder.png'"
        >
        <h4>Season: ${episode.season} • Episode: ${episode.episode} • Overall: ${episode.overall}</h4>
        <button class="moreInfo">View More Information</button>
      `;
      container.appendChild(card);
    });

      document.querySelectorAll(".moreInfo").forEach((button) => {
        button.addEventListener("click", (event) => {
          container.innerHTML = "";

          const info = event.target.parentElement;
          const epName = info.querySelector(".epName").textContent;

            const item = event.target.closest(".card");
            console.log(item);
          container.innerHTML = `
            <h3>${epName}</h3>
          `;
        });
      });

  } catch (error) {
    console.error("Error:", error);
  }
}

getData(url);
