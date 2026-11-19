import { isFavorite } from "./storage.js";


let grid = document.getElementById("grid");
let creatureCount = document.getElementById("creature-count");
let detail = document.getElementById("detail");

function createCards(pokemons , append = false){
    if(!append){
       grid.replaceChildren();    }
    if(pokemons.length === 0){
        const message =document.createElement("p");
        message.className ="col-span-full text-center";
        message.textContent = "Aucune créature trouvée";
        grid.appendChild(message);
        creatureCount.textContent = 0;
        return ;
    }







    pokemons.forEach(function(pokemon){
        let card = document.createElement("div");
        card.className = "creature-card relative bg-white rounded-xl p-4 shadow-sm border cursor-pointer";
        card.dataset.id = pokemon.id ;
         const favoriteButton = document.createElement("button");
         favoriteButton.type = "button";
         favoriteButton.className = "favorite-btn absolute top-2 right-2 z-10 text-2xl";     
         favoriteButton.dataset.id = pokemon.id;
         card.dataset.id = pokemon.id ;
         favoriteButton.textContent =isFavorite(pokemon.id) ? "❤️" : "♡";
         card.appendChild(favoriteButton) ;

         const image = document.createElement("img");
         image.src = pokemon.image ;
         image.alt = pokemon.name ;
         image.className = "w-full h-40 object-contain";
         card.appendChild(image);

         const name = document.createElement("h3");
         name.className ="font-bold text-lg mt-2 capitalize" ;
         name.textContent = pokemon.name ;
         card.appendChild(name) ;

         const type = document.createElement("p");
         type.textContent = "type : " + pokemon.type ;
         card.appendChild(type) ;

         const hp = document.createElement("p");
         hp.textContent = "Hp : " + pokemon.stats.hp ;
         card.appendChild(hp) ;

         const attack = document.createElement("p");
         attack.textContent = "Attack : " + pokemon.stats.attack ;
         card.appendChild(attack);

         const defense = document.createElement("p");
         defense.textContent = "Defense : " + pokemon.stats.defense ;
         card.appendChild(defense) ;
         
         grid.appendChild(card) ;
         });

    creatureCount.textContent = grid.children.length;
}


function showLoading(){
    const message = document.createElement("p") ;
    message.className ="col-span-full text-center"
    message.textContent = "Chargements des pokémons ..."; 
    grid.replaceChildren(message)
}

function showError(message){
   const erreurMessage = document.createElement("p")

   erreurMessage.className ="col-span-full text-center text-red-500" ;
   erreurMessage.textContent =message ;
   grid.replaceChildren(erreurMessage)
}




function showDetails(pokemon) {
    detail.replaceChildren();

    const image = document.createElement("img") ;
    image.src = pokemon.image ;
    image.alt = pokemon.name ;
    image.className = "w-full h-48 object-contain";
    detail.append(image);

    const name = document.createElement("h2"); 
    name.className = "font-display text-3xl font-extrabold capitalize";
    name.textContent = pokemon.name
    detail.append(name) ;

    const type = document.createElement("p");
    type.textContent = "Type : " + pokemon.type ; 
    detail.append(type);

    const statsContainer = document.createElement("div");
    statsContainer.className = "flex flex-col gap-4";
    detail.append(statsContainer);

    const hp = document.createElement("p") ;
    hp.textContent ="Hp : " + pokemon.stats.hp
    statsContainer.append(hp);

    const attack = document.createElement("p");
    attack.textContent ="Attack : " + pokemon.stats.attack ;
    statsContainer.append(attack);

    const defense = document.createElement("p");
    defense.textContent = "Defense : " + pokemon.stats.defense ; 
    statsContainer.append(defense) ;

    const percentage = Math.min((value / 255) * 100, 100);
    
//     detail.innerHTML = `
//         <div class="flex items-center justify-between">
//             <span class="font-mono text-sm">Détail</span>

//             <button id="close-details" type="button"
//                 class="btn-outline w-11 px-0 bg-red-500">
//                 X
//             </button>
//         </div>

//         <img src="${pokemon.image}" alt="${pokemon.name}"
//             class="w-full h-48 object-contain">

//         <h2 class="font-display text-3xl font-extrabold capitalize">
//             ${pokemon.name}
//         </h2>

//         <p>Type : ${pokemon.type}</p>
// <div class="flex flex-col gap-4">
//     ${createStatBar("HP", pokemon.stats.hp, "bg-red-500")}

//     ${createStatBar("Attack", pokemon.stats.attack, "bg-green-800")}

//     ${createStatBar("Defense", pokemon.stats.defense, "bg-blue-500")}
// </div>
//     `;

//     document.getElementById("close-details").addEventListener("click", function() {
//         detail.innerHTML = `
//             <h2 class="font-display text-3xl font-extrabold">
//                 Sélectionnez un Pokémon
//             </h2>
//             <p>Cliquez sur une carte pour afficher les détails</p>
//         `;
//     });

// }

   function createStatBar(label, value, color) {
    const percentage = Math.min((value / 255) * 100, 100);

    return `
        <div class="flex flex-col gap-1">
            <div class="flex justify-between text-sm font-bold">
                <span>${label}</span>
                <span>${value}</span>
            </div>

            <div class="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                    class="h-full rounded-full ${color}"
                    style="width: ${percentage}%">
                </div>
            </div>
        </div>
    `;
}

export { createCards, showLoading, showError, showDetails } 