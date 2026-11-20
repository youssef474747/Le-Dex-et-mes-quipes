import { getCreatures, getCreature } from "./api.js";
import { createCards, showLoading, showError, showDetails } from "./ui.js";
import {  saveLastSearch,getLastSearch, toggleFavorite,  saveLastType, getLastType} from "./storage.js";

let offset = 0;
let loadedPokemons = [];
let selectedType = "all";
let allPokemons = [];
let isSearching = false;
let selectedSort = "id";
let sortOrder = "asc";

const filters = document.getElementById("filters");
const loadMoreBtn = document.getElementById("load-more");
const searchInput = document.getElementById("search");
const clearSearchBtn = document.getElementById("clear-search");
const sortSelect = document.getElementById("sort");

// Afficher les Pokémon selon le filtre

async function filterPokemons() {
    try {
        let type = "";

        if (selectedType !== "all") {
            type = selectedType;
        }

        const name = searchInput.value.toLowerCase().trim();

        const creatures = await getCreatures(name, type, selectedSort, sortOrder);
        createCards(creatures);

    } catch (error) {
        showError("Erreur lors du filtrage");
    }
}

// Charger les premiers Pokémon
async function init() {
    try {
        showLoading();

         const pokemons = await getCreatures();

        loadedPokemons = pokemons;
        allPokemons = [...pokemons];

selectedType = getLastType();

const lastSearch = getLastSearch();

searchInput.value = lastSearch;

await filterPokemons();
    } catch (error) {
        showError("Erreur lors du chargement");
    }
}


loadMoreBtn.style.display = "none";

// Filtrer par type

filters.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    selectedType = button.dataset.type;
    saveLastType(selectedType);

    filterPokemons();
});


// Lancer l'application
init();

// RECHERCH

searchInput.addEventListener("input", function () {
    const name = searchInput.value.toLowerCase().trim();
    saveLastSearch(name);

    filterPokemons();
});

sortSelect.addEventListener("change" , function(){
const value = sortSelect.value;    if(value === "name-asc"){
        selectedSort ="name";
        sortOrder ="asc";
    }else if(value === "name-desc"){
        selectedSort ="name";
        sortOrder = "desc" ;
    }else{
        selectedSort ="id";
        sortOrder ="asc" ;
    }
    filterPokemons() ;
})
 

// afficher les details

const grid =document.getElementById("grid");
grid.addEventListener("click" , async function(event){
    const favoriteButton = event.target.closest(".favorite-btn");
    if(favoriteButton){
        const id =Number(favoriteButton.dataset.id);
        const pokemon = loadedPokemons.find(function(item){
            return item.id === id ;
        });
        if(!pokemon)return ;
        const favorites = toggleFavorite(pokemon);
        const saved = favorites.some(function(item){
            return item.id === id ;
        });

        favoriteButton.textContent = saved ? "❤️" : "♡";
        return ;
    }
    const card = event.target.closest(".creature-card");
    if(!card) return ;

    try{
        const pokemon = await getCreature(card.dataset.id);
        showDetails(pokemon);
    }catch(error){
        alert("Erreur lors du chargement des details ");
    }
});


// Effacer la recherche
clearSearchBtn.addEventListener("click",async function() {
    searchInput.value = "";
    saveLastSearch("");
       filterPokemons();

});
