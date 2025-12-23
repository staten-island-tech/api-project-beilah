import './styles.css'

function getWikiaImage(url) {
  // Remove query params (?cb=...)
  let cleanUrl = url.split("?")[0];

  // Remove any existing /revision/... part
  cleanUrl = cleanUrl.replace(/\/revision\/.*$/, "");

  return cleanUrl;
}

const url = "/hsr/api/v1/characters";

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

    result.forEach((character) => {
      const card = document.createElement("div");
      card.classList.add("card");

      let image = "/placeholder.png";

      if (character.img) {
        if (character.img.startsWith("https://hsr-api.vercel.app")) {
          image = character.img.replace("https://hsr-api.vercel.app", "/hsr");
          image = encodeURI(image);
        } else if (character.img.includes("nocookie.net")) {
          image = getWikiaImage(character.img); // ✅ ORIGINAL IMAGE
        } else {
          image = encodeURI(character.img);
        }
      }

      if (character.name === "Trailblazer") {
        image = "./trailblazer.png"; // your local or hosted image
      } else if (character.name === "March_7th") {
        image = "./march7th.png"; // your local or hosted image
      }

      card.innerHTML = `
        <h3>${character.name}</h3>
        <img 
          src="${image}" 
          alt="${character.name}" 
          onerror="this.src='/placeholder.png'"
        >
        <p>${character.element} • ${character.path}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getData(url);
