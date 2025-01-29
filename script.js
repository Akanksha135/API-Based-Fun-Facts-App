// Fetch random fact from API
async function fetchFact() {
    const apis = [
        "https://uselessfacts.jsph.pl/random.json?language=en", // Random trivia
        "https://v2.jokeapi.dev/joke/Any?type=single", // Random joke
        "https://numbersapi.p.rapidapi.com/random/trivia?json=true", // Number fact
    ];

    const randomApi = apis[Math.floor(Math.random() * apis.length)];

    try {
        const response = await fetch(randomApi, {
            headers: randomApi.includes("numbersapi.p.rapidapi.com")
                ? { "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY" }
                : {},
        });

        const data = await response.json();
        let fact = "";

        if (data.text) fact = data.text; // Trivia API
        else if (data.joke) fact = data.joke; // Joke API
        else if (data.number) fact = `Did you know? ${data.text}`; // Numbers API

        document.getElementById("fact").innerText = fact;
    } catch (error) {
        document.getElementById("fact").innerText = "Failed to fetch a fact. Try again!";
        console.error("Error fetching data:", error);
    }
}
