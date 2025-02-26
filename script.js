async function fetchFact() {
    const apis = [
        "https://uselessfacts.jsph.pl/random.json?language=en", 
        "https://v2.jokeapi.dev/joke/Any?type=single", 
        "https://numbersapi.p.rapidapi.com/random/trivia?json=true", 
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

        if (data.text) fact = data.text; 
        else if (data.joke) fact = data.joke; 
        else if (data.number) fact = `Did you know? ${data.text}`;

        document.getElementById("fact").innerText = fact;
    } catch (error) {
        document.getElementById("fact").innerText = "Failed to fetch a fact. Try again!";
        console.error("Error fetching data:", error);
    }
}
