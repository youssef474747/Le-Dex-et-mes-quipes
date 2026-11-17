const BASE_URL = "http://localhost:3000";

async function request(method , route ,body){
    const url = BASE_URL + route ;
    const options = {
    method: method,
    headers: {
        "Content-Type": "application/json"
    }
};

    const response = await fetch(url,options);
if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
}
const data = await response.json(); 
return data ;

}

// GET ALL CREATURE
async function getCreatures(){
    const creatures = await request("GET" , "/creatures"); 
    return creatures ;
}

// GET ONE CREATURE

async function getCreature(id){
    const creature = await request("GET" , "/creatures/" + id);
    return creature ;
}

// POST

async function createCreature(creature){
    const newCreature = await request("POST" , "/creatures" , creature);
    return newCreature ;
}

// PUT

async function updateCreature(id , creature){
    const updatedCreature = await request("PUT" , "/creatures" + id ,creature);
    return updatedCreature ;
}

// DELETE
async function deleteCreature(id){
    const deletedCreature = await request("DELETE" , "/creatures" + id);
    return deletedCreature;

}

export{
    request,
    getCreature,
    getCreatures,
    updateCreature,
    deleteCreature,
    getCreature,
    createCreature,

};