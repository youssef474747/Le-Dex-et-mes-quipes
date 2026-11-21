const TYPES = [
    "Feu",
    "Eau",
    "Plante",
    "Électrik",
    "Glace",
    "Ténèbres",
    "Combat",
    "Spectre",
    "Dragon",
    "Psy",
    "Normal"
];

function validateCreature(data) {
    const errors = {};

    if (!data.name || data.name.trim() === "") {
        errors.name = "Le nom est obligatoire";
    }

    if (!TYPES.includes(data.type)) {
        errors.type = "Veuillez choisir un type valide";
    }

    if (data.stats.hp < 1 || data.stats.hp > 255) {
        errors.hp = "HP doit être entre 1 et 255";
    }

    if (data.stats.attack < 1 || data.stats.attack > 255) {
        errors.attack = "Attack doit être entre 1 et 255";
    }

    if (data.stats.defense < 1 || data.stats.defense > 255) {
        errors.defense = "Defense doit être entre 1 et 255";
    }

    return errors;
}

export { validateCreature };