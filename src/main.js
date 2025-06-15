document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.querySelector('main');
    setTimeout(() => {
        mainContainer.classList.add('visible');
    }, 100);

    const liste1 = document.getElementById('listeP1');
    const liste2 = document.getElementById('listeP2');
    const btnSwitch = document.querySelector('.btn-switch');
    const switchIcon = document.querySelector('.switch-icon');
    const btnConvertir = document.querySelector('.btn-convert');

    const montant1 = document.getElementById('montant1');
    const montant2 = document.getElementById('montant2');

    liste1.style.textTransform = "uppercase";
    liste2.style.textTransform = "uppercase";
    const pays = [
        {name: "mada",devise: "Ar", taux: 1},
        {name: "ang",devise: "Eur", taux: 0.00026},
        { name: "usa", devise: "USD", taux: 0.00021 },
        { name: "japon", devise: "YEN", taux: 0.029 },
        { name: "chine", devise: "YUAN", taux: 0.0013 }
    ];

     // Afficher les options
    function afficherListe(selectElement) {
        selectElement.innerHTML = "";
        pays.forEach((p, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = `${p.name} (${p.devise})`;
            selectElement.appendChild(option);
        });
    }
    afficherListe(liste1);
    afficherListe(liste2);
    
    // switch
    btnSwitch.addEventListener("click", (e) => {
        e.preventDefault();
        switchIcon.classList.add('animate');

        let temp = liste1.selectedIndex;
        liste1.selectedIndex = liste2.selectedIndex;
        liste2.selectedIndex = temp;

        // Animation des zones
        const zone1 = document.querySelector('.zone1');
        const zone2 = document.querySelector('.zone2');
        zone1.classList.add('animate');
        zone2.classList.add('animate');

        // Optionnel : échanger les montants
        let tempMontant = montant1.value;
        montant1.value = montant2.value;
        montant2.value = tempMontant;

        setTimeout(() => {
            switchIcon.classList.remove('animate');
            zone1.classList.remove('animate');
            zone2.classList.remove('animate');
        }, 500);
    })
    
    // Convertir
    btnConvertir.addEventListener("click", (e) => {
        e.preventDefault();

        let index1 = liste1.value;
        let index2 = liste2.value;

        let taux1 = pays[index1].taux;
        let taux2 = pays[index2].taux;

        let montant = parseFloat(montant1.value);

        if (isNaN(montant)) {
            alert("Veuillez entrer un montant valide !");
            return;
        }

        // Conversion
        let resultat = (montant / taux1) * taux2;
        montant2.value = resultat.toFixed(2);
    }); 
})