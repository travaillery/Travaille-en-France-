const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Envoi en cours...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Erreur");
      }

      form.innerHTML = `
        <div style="text-align:center; padding:25px;">
          <h2>✅ Inscription envoyée</h2>
          <p>Votre dossier a bien été reçu.</p>
          <p>Nous allons vérifier votre paiement.</p>
          <p><strong>Merci pour votre inscription.</strong></p>
        </div>
      `;

    } catch (error) {
      button.disabled = false;
      button.textContent = "Envoyer mon inscription";
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
}
