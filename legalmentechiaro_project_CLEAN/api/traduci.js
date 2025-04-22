
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { testo } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "Sei un assistente legale. Riscrivi in italiano semplice e comprensibile il seguente testo giuridico, mantenendo il significato ma eliminando il legalese."
                },
                {
                    role: "user",
                    content: testo
                }
            ]
        })
    });

    const result = await response.json();
    const risposta = result.choices?.[0]?.message?.content?.trim();
    res.status(200).json({ risultato: risposta });
}
