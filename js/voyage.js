(function () {
  // URL de l'API REST de WordPress

  console.log("Rest API");

  let bouton_categorie = document.querySelectorAll(".bouton__categorie");
  console.log(bouton_categorie.length);
  for (const elm of bouton_categorie) {
    elm.addEventListener("mousedown", function (e) {
      console.log(e.target.id.split("_")[1]);
      let categories = e.target.id.split("_")[1];
      var url = `https://gftnth00.mywhc.ca/tim44/wp-json/wp/v2/posts?categories=${categories}`;
      restApi(url);
    });
  }
  let categories = 3;
  // Effectuer la requête HTTP en utilisant fetch()
  function restApi(url) {
    fetch(url)
      .then(function (response) {
        // Vérifier si la réponse est OK (statut HTTP 200)
        if (!response.ok) {
          throw new Error(
            "La requête a échoué avec le statut " + response.status
          );
        }
        // Analyser la réponse JSON
        return response.json();
        console.log(response.json());
      })
      .then(function (data) {
        // La variable "data" contient la réponse JSON
        console.log(data);
        let restapi = document.querySelector(".contenu__restapi");
        restapi.innerHTML = "";

        // Maintenant, vous pouvez traiter les données comme vous le souhaitez
        // Par exemple, extraire les titres des articles comme dans l'exemple précédent
        data.forEach(function (article) {
          let titre = article.title.rendered;

          if (article.meta && article.meta.ville_avoisinante) {
            // Afficher la valeur du champ personnalisé "ville"
            console.log("Ville :", article.meta.ville_avoisinante);
          }

          let contenu = article.excerpt.rendered;
          contenu = contenu.substring(0, 75) + " ...";
          console.log(titre);

          let carte = document.createElement("div");
          carte.classList.add("restapi__carte");
          carte.innerHTML = `
        <h2>${titre}<h2>
        <p>${contenu}<p>
        `;
          restapi.appendChild(carte);
        });
      })
      .catch(function (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la récupération des données :", error);
      });
  }
})();
