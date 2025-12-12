async function getData() {
  try {
    const response = await fetch("https://katanime.vercel.app/api/getrandom");

    if (response.status !== 200) {
      throw new Error(`error Status: ${response.status}`);
    }

    const data = await response.json();

    // extract quote object from the API response
    const quoteObj = data.result[0];

    document.getElementById("api-response").textContent =
      `${quoteObj.character} (${quoteObj.anime}): "${quoteObj.english}"`;

  } catch (error) {
    console.log("Error:", error);
  }
}
