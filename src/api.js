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
