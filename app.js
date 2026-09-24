const form = document.getElementById("form");
const formCard = document.getElementById("form-card");
const button = document.getElementById("submit-button");
const errorMessage = document.getElementById("error-message");

if (form) {

  form.addEventListener("submit", async function (event) {

    event.preventDefault();

    errorMessage.style.display = "none";

    button.disabled = true;
    button.textContent = "Envoi en cours...";

    try {

      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      /*
       * L'envoi a réussi.
       * On remplace maintenant le formulaire par
       * une page de confirmation.
       */

      formCard.innerHTML = `
        <div class="success">

          <div class="success-icon">✅</div>

          <h2>
            Merci pour votre demande d'inscription
          </h2>

          <p>
            Votre demande a bien été reçue.
          </p>

          <p>
            Nous allons examiner votre dossier.
          </p>

          <div class="email-note">
            📧 Veuillez attendre la suite des informations
            directement dans votre adresse e-mail.
          </div>

          <p>
            Pensez également à vérifier votre dossier
            <strong>Spam / Courrier indésirable</strong>.
          </p>

        </div>
      `;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } catch (error) {

      console.error(error);

      button.disabled = false;
      button.textContent = "Envoyer mon inscription";

      errorMessage.style.display = "block";

    }

  });

}
