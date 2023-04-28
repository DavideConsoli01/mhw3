
const key_gif = 'mAvCsm3x3r5UhimJjQvAbWmHVSf8Uomb';			
const gif_api_endpoint = 'http://api.giphy.com/v1/gifs/search'



function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}
    


function onJson(json) {
    console.log('JSON GIF ricevuto');
    console.log(json);
    // Svuotiamo la libreria
    const FF= document.querySelector('#FF');
    FF.innerHTML = '';
    // Leggi il numero di risultati
    const results = json.data
    for(result of results) {
        console.log(result+'questo e un result');
        }
  
    // Processa ciascun risultato
    for(result of results)
    {
      console.log(result);

      // Leggiamo info
      const immagine = result.images.downsized_medium.url;
      const img = document.createElement('img');
      img.src = immagine;
     
      FF.appendChild(img);
    }
  }

function search(event){
    event.preventDefault();

    const gioco_input= document.querySelector('#gioco');
    const gioco_value= encodeURIComponent(gioco_input.value);

    gif_request = gif_api_endpoint + '?api_key='  + key_gif + '&q=' + gioco_value + '&limit=' + 5;
    fetch(gif_request).then(onResponse).then(onJson);


}




const form = document.querySelector('#ricerca');
form.addEventListener('submit', search)


//Oauth 2.0
const clientId = "4e5bbdbe340444fcab187983b414425c" ; 
const clientSec = "49d0811d93264d1686d97d718c77cb2c" ; 


function onTokenResponse(response) {
    return response.json();
}

function getToken(json)
{
	token_data = json;
}

function onJsonSpotify(json) {
   
    const song = document.querySelector('#song');
    song.innerHTML = '';

    const result = json.tracks.items[0] ;

    const album = document.createElement('span');
    const name_album = result.album.name;
    album.textContent = "Album: " + name_album;

    const artist = document.createElement('span');
    const name_artist = result.artists[0].name;
    artist.textContent = "Artist: " + name_artist;

    const image = document.createElement('img');
    image.src = result.album.images[0].url;

    const link = document.createElement('a');
    const url_link = result.preview_url;
    link.textContent = "Click per ascoltare";
    link.href = url_link;
   
    
    song.appendChild(image);
    song.appendChild(artist);
    song.appendChild(album);
    song.appendChild(link);   
}

function searchOnSpotify(event){
    event.preventDefault();
    //Leggi valore del campo di testo
	const song_input = document.querySelector('#author');
    const song_value = encodeURIComponent(song_input.value);
    //eseguo richiesta
    fetch("https://api.spotify.com/v1/search?type=track&include_external=audio&q=" + song_value,
    {
        headers:
        {
            'Authorization': 'Bearer ' + token_data.access_token
        }
    }
    ).then(onResponse).then(onJsonSpotify);
}

//richiesta token
let token_data;
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSec)
    }
}
).then(onTokenResponse).then(getToken);

const formMusic = document.querySelector('#music');
formMusic.addEventListener('submit', searchOnSpotify);
