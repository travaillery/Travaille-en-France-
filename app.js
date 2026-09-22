const form = document.getElementById('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const f = document.getElementById('capture').files[0];

  if (!f) {
    alert('Veuillez joindre la capture.');
    return;
  }

  if (f.size > 5242880) {
    alert('La capture doit faire moins de 5 Mo.');
    return;
  }

  const r = new FileReader();

  r.onload = () => {
    const d = {
      nom: document.getElementById('nom').value,
      email: document.getElementById('email').value,
      pays: document.getElementById('pays').value,
      whatsapp: document.getElementById('whatsapp').value,
      emploi: document.getElementById('emploi').value,
      date: new Date().toLocaleString('fr-FR'),
      statut: 'Validé',
      capture: r.result
    };

    const a = JSON.parse(
      localStorage.getItem('inscriptions_travailler_france') || '[]'
    );

    a.push(d);

    localStorage.setItem(
      'inscriptions_travailler_france',
      JSON.stringify(a)
    );

    form.closest('.card').classList.add('hidden');
    document.getElementById('ok').classList.remove('hidden');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  r.readAsDataURL(f);
});
