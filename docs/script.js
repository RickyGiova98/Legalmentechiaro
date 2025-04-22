
async function traduci() {
    const input = document.getElementById("input").value;
    const response = await fetch('https://verbose-alike-can.glitch.me/traduci', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testo: input })
    });
    const data = await response.json();
    document.getElementById("output").value = data.risultato || "Errore nella traduzione.";
}
