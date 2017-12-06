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

var createIngredients = function(beer){
  var ingredients = document.createElement('ul');
  var ingreds = this.ingredientList(beer);
  ingredients.innerText = "Ingredients";
  var malts = document.createElement('li');
  var hops = document.createElement('li');
  var yeast = document.createElement('li');
  malts.innerText = "Malts: " + ingreds[0];
  hops.innerText = "Hops: " + ingreds[1];
  yeast.innerText = "Yeast: " + ingreds[2];
  ingredients.appendChild(malts);
  ingredients.appendChild(hops);
  ingredients.appendChild(yeast);
  return ingredients;
}

var ingredientList = function(beer){
  var maltSelection =[];
  var hopSelection = [];
  var yeastSelection = [];
  var ingredients = [];
  for(malt of beer.ingredients.malt){
    if((beer.ingredients.malt.length > 0) && (!maltSelection.includes(malt.name))){
      maltSelection.push(" " + malt.name);
    }
  }

  for(hop of beer.ingredients.hops){
    if((beer.ingredients.hops.length > 0) && (!hopSelection.includes(hop.name))){
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



var createBeerName = function(beer){
  var beerName = document.createElement('ul');
  beerName.innerText = beer.name;
  beerName.innerText;
  return beerName;
}

var createImage = function(beer){
  var img = document.createElement('img');
  img.src = beer.image_url;
  return img;
}
var populateList = function(beers){
  beers.forEach(function(beer, index){
      var beerName = createBeerName(beer);
      var tag = createTagLine(beer);
      var pairings = createPairings(beer);
      var ingredients = createIngredients(beer);
      var image = createImage(beer);
      appendElements(beerName, tag, pairings, ingredients, image);
  });
}

var createTagLine = function(beer){
  var tagLine = document.createElement('li');
  tagLine.innerText = beer.tagline;
  return tagLine;
}

var createPairings = function(beer){
  var foodPairings = document.createElement('li');
  var pairings = beer.food_pairing;
  foodPairings.innerText = "Food Pairings: " + pairings;
  return foodPairings;
}

var appendElements = function(beer, tag, pairings, ingredients, image){
    var list = document.getElementById('beer-list');
    list.appendChild(beer);
    beer.appendChild(tag);
    beer.appendChild(pairings);
    beer.appendChild(ingredients);
    beer.appendChild(image);
}



window.addEventListener('load', app);
