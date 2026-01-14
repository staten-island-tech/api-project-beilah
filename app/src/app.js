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
        const backBtn = document.querySelector(".backBtn");


        container.innerHTML = "";


        function renderCards() {
            container.innerHTML = "";
            backBtn.classList.add("hidden");


            result.data.forEach((episode) => {
                const card = document.createElement("div");
                card.classList.add("card");


                card.classList.add(
                    "rounded-xl",
                    "bg-white",
                    "shadow-md",
                    "p-4",
                    "flex",
                    "flex-col",
                    "gap-3",
                    "hover:shadow-lg",
                    "transition"
                );


                card.innerHTML = `
                <h3>${episode.name}</h3>
                <img class="h-48 w-full object-cover rounded-md" src="${episode.image}">
                `;


                const button = document.createElement("button");
                button.textContent = "View More Information";
                button.classList.add("moreInfo");
                button.classList.add(
                "mt-auto",
                "rounded-md",
                "bg-indigo-600",
                "px-4",
                "py-2",
                "text-sm",
                "font-medium",
                "text-white",
                "hover:bg-indigo-500",
                "transition"
            );


                backBtn.classList.add(
                "mt-auto",
                "rounded-md",
                "bg-indigo-600",
                "px-4",
                "py-2",
                "text-sm",
                "font-medium",
                "text-white",
                "hover:bg-indigo-500",
                "transition"
            );


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


        backBtn.addEventListener("click", renderCards);


        renderCards();


    } catch (error) {
        console.error("Error:", error);
    }
}


getData(url);









