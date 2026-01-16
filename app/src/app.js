const url = "https://ponyapi.net/v1/episode/all";

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status);

        const result = await response.json();
        const episodes = result.data;

        const container = document.querySelector(".container");
        const backBtn = document.querySelector(".backBtn");
        const searchinput = document.querySelector("#search");

        function renderCards(list = []) {
            container.innerHTML = "";
            backBtn.classList.add("hidden");

            list.forEach((episode) => {
                const card = document.createElement("div");
                card.className =
                    "rounded-xl bg-white shadow-md p-4 flex flex-col gap-3";

                card.innerHTML = `
                    <h3>${episode.name}</h3>
                    <img class="h-48 w-full object-cover rounded-md" src="${episode.image}">
                `;

                const button = document.createElement("button");
                button.textContent = "View More Information";
                button.className =
                    "mt-auto rounded-md bg-indigo-600 px-4 py-2 text-white";

                button.addEventListener("click", () => {
                    backBtn.classList.remove("hidden");
                    container.innerHTML = `
                        <h3>${episode.name}</h3>
                        <img class="h-48 w-full object-cover rounded-md" src="${episode.image}">
                        <p>Air Date: ${episode.airdate}</p>
                        <p>Storyboard: ${episode.storyboard}</p>
                        <p>Written By: ${episode.writtenby}</p>
                        <a href="${episode.url}" target="_blank">Episode Page</a>
                    `;
                });

                card.appendChild(button);
                container.appendChild(card);
            });
        }

        searchinput.addEventListener("input", () => {
            const query = searchinput.value.trim().toLowerCase();
            const filteredEpisodes = episodes.filter((episode) =>
                episode.name.toLowerCase().includes(query)
            );
            renderCards(filteredEpisodes);
        });

        backBtn.addEventListener("click", () => renderCards(episodes));

        renderCards(episodes);

    } catch (error) {
        console.error("Error:", error);
    }
}

getData(url);