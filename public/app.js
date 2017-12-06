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

var ingredients = function(beer){
  var maltSelection =[];
  var hopSelection = [];
  var yeastSelection = [];
  var ingredients = [];
  for(malt of beer.ingredients.malt){
    if(beer.ingredients.malt.length > 0 && !maltSelection.includes(malt.name)){
    maltSelection.push(" " + malt.name);
    }
  }
  for(hop of beer.ingredients.hops){
    if(beer.ingredients.hops.length > 0 && !hopSelection.includes(hop.name)){
      hopSelection.push(" " + hop.name);
    }
  }
  for(yeast of beer.ingredients.yeast){
    if(beer.ingredients.length > 0 && !yeastSelection.includes(yeast.name)){
      yeastSelection.push(" " + yeast.name);
    }
  }
  ingredients.push(maltSelection);
  ingredients.push(hopSelection);
  ingredients.push(yeastSelection);
  return ingredients;
}


var populateList = function(beers){
  var list = document.getElementById('beer-list');
  beers.forEach(function(beer, index){
      var beerName = document.createElement('ul');
      var tagLine = document.createElement('li');
      var foodPairings = document.createElement('li');
      var ingredients = document.createElement('ul');
      var malts = document.createElement('li');
      var hops = document.createElement('li');
      var yeast = document.createElement('li');
      var img = document.createElement('img');

      beerName.innerText = beer.name;
      tagLine.innerText = beer.tagline;

      var pairings = beer.food_pairing.join(', ');
      foodPairings.innerText = "Food Pairings: " + pairings;

      var ingreds = this.ingredients(beer);
      ingredients.innerText = "Ingredients";
      malts.innerText = "Malts: " + ingreds[0];
      hops.innerText = "Hops: " + ingreds[1];
      yeast.innerText = "Yeast: " + ingreds[2];
      img.src = beer.image_url;
      beerName.value = index;

      list.appendChild(beerName);
      beerName.appendChild(tagLine);
      beerName.appendChild(foodPairings);
      beerName.appendChild(ingredients);
      ingredients.appendChild(malts);
      ingredients.appendChild(hops);
      ingredients.appendChild(yeast);
      beerName.appendChild(img);
  });
}



window.addEventListener('load', app);
