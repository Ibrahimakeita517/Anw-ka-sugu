const produits = [
  { nom: "Riz", prix: 2500, image: "img/riz.jpg" },
  { nom: "Sucre", prix: 750 , image: "img/sucre.jpg" },
  { nom: "Huile végétale", prix: 1500, image: "img/huile.jpg" },
  { nom: "Thé vert", prix: 500, image: "img/the.jpg" },
  { nom: "Lait en poudre", prix: 4000, image: "img/lait.jpg" },
  { nom: "Pâte alimentaire", prix: 2000, image: "img/pate.jpg" },
  { nom: "Tomate concentrée", prix: 500, image: "img/tomate.jpg" },
  { nom: "Farine de mil", prix: 500, image: "img/farine-mil.jpg" },
  { nom: "Farine de maïs", prix: 400, image: "img/farine-mais.jpg" },
  { nom: "Sel iodé", prix: 200, image: "img/sel.jpg" },
  { nom: "Poivre noir", prix: 200, image: "img/poivre.jpg" },
  { nom: "Piment sec", prix: 100, image: "img/piment.jpg" },
  { nom: "Oignon", prix: 300, image: "img/oignon.jpg" },
  { nom: "Ail", prix: 300, image: "img/ail.jpg" },
  { nom: "Pain", prix: 300, image: "img/pain.jpg" },
  { nom: "Sardine en boîte", prix: 300, image: "img/sardine.jpg" },
  { nom: "Spaghetti", prix: 800, image: "img/spaghetti.jpg" },
  { nom: "Petit pois", prix: 1200, image: "img/petit-pois.jpg" },
  { nom: "Pois chiche", prix: 900, image: "img/pois-chiche.jpg" },
  { nom: "Haricot sec", prix: 800, image: "img/haricot.jpg" },
  { nom: "Viande de bœuf", prix: 3500, image: "img/viande.jpg" },
  { nom: "Poulet local", prix: 4000, image: "img/poulet.jpg" },
  { nom: "Poisson sec", prix: 2000, image: "img/poisson-sec.jpg" },
  { nom: "Poisson fumé", prix: 2500, image: "img/poisson-fume.jpg" },
  { nom: "Œufs", prix: 1500, image: "img/oeufs.jpg" },
  { nom: "Yaourt local", prix: 500, image: "img/yaourt.jpg" },
  { nom: "Jus de bissap", prix: 300, image: "img/bissap.jpg" },
  { nom: "Jus de gingembre", prix: 300, image: "img/gingembre.jpg" },
  { nom: "Pain sucré", prix: 400, image: "img/pain-sucre.jpg" },
  { nom: "Soumbala", prix: 100, image: "img/soumbala.jpg" },
  { nom: "Beurre de karité alimentaire", prix: 600, image: "img/karite.jpg" },
  { nom: "Néré", prix: 100, image: "img/nere.jpg" },
  { nom: "Couscous de mil", prix: 1200, image: "img/couscous.jpg" },
  { nom: "Frites de patate", prix: 800, image: "img/patate.jpg" },
  { nom: "Banane plantain", prix: 900, image: "img/banane.jpg" },
  { nom: "Miel pur", prix: 3000, image: "img/miel.jpg" },
  { nom: "Lait caillé", prix: 400, image: "img/lait-caille.jpg" }
];



let panier = [];
let vraiCode = "";
  

const productList = document.getElementById("product-list");
const formulaire = document.getElementById("formulaire");
const searchInput = document.getElementById("searchInput");

function afficherProduits() {
  productList.innerHTML = "";
  const search = searchInput.value.toLowerCase(); // 🔍 récupération du texte tapé

  produits.forEach((produit, index) => {
    if (produit.nom.toLowerCase().includes(search)) {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}" class="image-produit">
        <h3>${produit.nom}</h3>
        <p>Prix : ${produit.prix} FCFA</p>
        <button onclick="ajouterAuPanier(${index})">Ajouter au panier</button>
      `;
      productList.appendChild(card);
    }
  });
}

const listeProduits = document.getElementById("liste-produits");

produits.forEach(produit => {
  const produitDiv = document.createElement("div");
  produitDiv.className = "produit";

  produitDiv.innerHTML = `
    <img src="${produit.image}" alt="${produit.nom}" class="image-produit">
    <h3>${produit.nom}</h3>
    <p>Prix : ${produit.prix} FCFA</p>
    <button onclick="ajouterAuPanier('${produit.nom}', ${produit.prix})">Ajouter au panier</button>
  `;

  listeProduits.appendChild(produitDiv);
});

function ajouterAuPanier(index) {
  const produit = produits[index];
  const existant = panier.find(p => p.nom === produit.nom);
  if (existant) {
    existant.qte += 1;
  } else {
    panier.push({ nom: produit.nom, prix: produit.prix, qte: 1 });
  }
  afficherPanier();
}

function modifierQte(index, change) {
  panier[index].qte += change;
  if (panier[index].qte <= 0) panier.splice(index, 1);
  afficherPanier();
}

function afficherPanier() {
  const contenu = document.getElementById("contenuPanier");
  contenu.innerHTML = "";
  if (panier.length === 0) {
    contenu.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }
  let total = 0;
  panier.forEach((item, index) => {
    contenu.innerHTML += `
      <div class="item-panier">
        <span>${item.nom} - ${item.prix} FCFA x ${item.qte}</span>
        <button onclick="modifierQte(${index}, 1)">+</button>
        <button onclick="modifierQte(${index}, -1)">-</button>
      </div>
    `;
    total += item.prix * item.qte;
  });
  contenu.innerHTML += `<p><strong>Total : ${total} FCFA</strong></p>`;
}

// Initialisation
searchInput.addEventListener("input", afficherProduits);
afficherProduits();
function validerCommande() {
  const quartier = document.getElementById("quartier").value;
  const rue = document.getElementById("rue").value;
  const porte = document.getElementById("porte").value;
  const telephone = document.getElementById("telephone").value;
  const paiement = document.getElementById("paiement").value;

  if (!quartier || !rue || !porte || !telephone || !paiement) {
    alert("Veuillez remplir tous les champs et choisir un mode de paiement.");
    return;
  }

  // Simule l'envoi d'un code
  const codeEnvoye = "1234"; // Tu peux le rendre aléatoire si tu veux

  const codeUtilisateur = prompt("Entrez le code de confirmation reçu (ex: 1234)");

  if (codeUtilisateur === codeEnvoye) {
    document.getElementById("confirmationMessage").style.display = "block";
    document.getElementById("confirmationMessage").innerHTML = "<h3>Commande confirmée ! Livraison en cours...</h3>";
  } else {
    alert("Code incorrect. Veuillez réessayer.");
  }
}                     

