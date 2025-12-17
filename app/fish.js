async function getData() {
  try {
    const response = await fetch("https://www.fishwatch.gov/api");

    if (response.status !== 200) {
      throw new Error(`error Status: ${response.status}`);
    }

    const data = await response.json();

    // extract quote object from the API response
    const fish = data.result[0];

    document.getElementById("api-response").textContent =
     `${fish["Species Name"]} — Scientific Name: ${fish["Scientific Name"]}`;

  } catch (error) {
    console.log("Error:", error);
  }
}
