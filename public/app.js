var app = function(){

  var url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  populateList(beers);
}

var populateList = function(beers){
  var list = document.getElementById('beer-list');
  beers.forEach(function(beer, index){
      var beerName = document.createElement('ul');
      var tagLine = document.createElement('li');
      var img = document.createElement('img');
      beerName.innerText = beer.name;
      tagLine.innerText = beer.tagline;
      img.src = beer.image_url;
      beerName.value = index;
      list.appendChild(beerName);
      beerName.appendChild(tagLine);
      beerName.appendChild(img);
  });

}

window.addEventListener('load', app);
