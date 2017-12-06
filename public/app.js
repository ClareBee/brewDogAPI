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
  var select = document.getElementById('beer-list');

  beers.forEach(function(beer, index){
    var option = document.createElement('option');
    option.classList.add("beer");
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  });
  var selected = document.querySelector("select");
  selected.addEventListener("change", function(){
    this.handleSelection(beers);
  }.bind(this));
}

var handleSelection = function(beers){
  var chosen = document.querySelector('select');
  var beer = beers[chosen.value];
  var beerName = createBeerName(beer);
  var tag = createTagLine(beer);
  var pairings = createPairings(beer);
  var ingredients = createIngredients(beer);
  var image = createImage(beer);
  appendElements(ingredients);
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
  ingredients.push(maltSelection);
  for(hop of beer.ingredients.hops){
    if((beer.ingredients.hops.length > 0) && (!hopSelection.includes(hop.name))){
      hopSelection.push(" " + hop.name);
    }
  }
  ingredients.push(hopSelection);
  for(yeast of beer.ingredients.yeast){
    if(beer.ingredients.length > 0 && !yeastSelection.includes(yeast.name)){
      yeastSelection.push(" " + yeast.name);
    }
  }
  ingredients.push(yeastSelection);
  return ingredients;
}

var createBeerName = function(beer){
  var beerName = document.getElementById("titleForBeer");
  beerName.innerText = beer.name;
  return beerName;
}

var createImage = function(beer){
  var img = document.getElementById('imageofBeer');
  img.src = beer.image_url;
}


var createTagLine = function(beer){
  var tagLine = document.getElementById('subtitleForBeer');
  tagLine.innerText = beer.tagline;
  return tagLine;
}

var createPairings = function(beer){
  var foodPairings = document.getElementById('foodPairings');
  for(each of beer.food_pairing){
    var li = document.createElement('li');
    li.innerText = each;
    foodPairings.appendChild(li);
  }
}

var appendElements = function(ingredients){
    var list = document.getElementById('ingredients');
    list.appendChild(ingredients);
}



window.addEventListener('load', app);
