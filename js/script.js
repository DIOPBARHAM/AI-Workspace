/* ==================================================================
   NAVIGATION ENTRE MODULES
   (nécessaire dès la Partie 1 pour que le menu latéral fonctionne)
================================================================== */
const menuItems = document.querySelectorAll(".menu-item");
const modules = document.querySelectorAll(".module");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((i) => i.classList.remove("active"));
    modules.forEach((m) => m.classList.remove("active"));

    item.classList.add("active");
    document.getElementById(item.dataset.target).classList.add("active");
  });
});

/* ==================================================================
   PARTIE 3 — RÉSUMÉ DE TEXTE (simulé)
================================================================== */
document.getElementById("resume-btn").addEventListener("click", () => {
  const texte = document.getElementById("resume-input").value.trim();
  const output = document.getElementById("resume-output");

  if (!texte) {
    output.textContent = "Veuillez saisir un texte à résumer.";
    return;
  }

  // Simulation : on garde juste les 20 premiers mots
  const resume = texte.split(" ").slice(0, 20).join(" ") + "...";
  output.textContent = resume;

  saveToHistory("Résumé de texte", texte, resume);
});