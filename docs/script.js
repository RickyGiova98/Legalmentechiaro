// Selettori degli elementi HTML (assicurati che gli ID corrispondano a quelli nel tuo HTML)
const inputTextarea = document.getElementById('inputText');
const outputTextarea = document.getElementById('outputText');
const translateButton = document.getElementById('translateButton');

// Aggiunge un event listener al pulsante per gestire il click
translateButton.addEventListener('click', async () => {
    // Legge il testo dall'area di input e lo trimma (rimuove spazi iniziali/finali)
    const testoDaTradurre = inputTextarea.value.trim();
    if (!testoDaTradurre) {
        alert("Inserisci il testo giuridico da tradurre.");
        return; // esce se l'input è vuoto
    }

    // Opzionale: mostra un messaggio di caricamento nell'area di output
    outputTextarea.value = "Traduzione in corso...";

    try {
        // Esegue la richiesta POST all'endpoint /api/traduci con il testo inserito
       const res = await fetch('https://verbose-alike-can.glitch.me/traduci', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ testo: testoDaTradurre })
});
        // Controlla se la risposta HTTP è OK (status 200-299)
        if (!response.ok) {
            outputTextarea.value = "Errore del server (codice " + response.status + ").";
            return; // esce dalla funzione in caso di errore dal server
        }

        // Converte la risposta in JSON
        const data = await response.json();

        // Inserisce il risultato nell'area di output, se presente
        if (data.risultato) {
            outputTextarea.value = data.risultato;
        } else {
            outputTextarea.value = "Nessun risultato disponibile.";
        }
    } catch (errore) {
        // Gestisce errori di rete o altri errori nella fetch
        console.error("Errore nella richiesta:", errore);
        outputTextarea.value = "Impossibile contattare il server per la traduzione.";
    }
});
