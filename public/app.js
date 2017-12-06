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
  var label = document.getElementById("labelForIngredients");
  label.innerText = "Ingredients:"
  var ingredients = document.createElement('ul');
  var maltList = this.ingredientLists(beer.ingredients.malt);
  var hopList = this.ingredientLists(beer.ingredients.hops);
  ingredients.innerText = "";
  var malts = document.createElement('li');
  var hops = document.createElement('li');
  var yeast = document.createElement('li');
  malts.innerText = "Malts: " + maltList;
  hops.innerText = "Hops: " + hopList;
  yeast.innerText = "Yeast: " + beer.ingredients.yeast;
  ingredients.appendChild(malts);
  ingredients.appendChild(hops);
  ingredients.appendChild(yeast);
  return ingredients;
}

var ingredientLists = function(ingredients){
  var selection = [];
  for(each of ingredients){
    if((ingredients.length > 0) && (!selection.includes(" " + each.name))){
      selection.push(" " + each.name);
    }
  }
  return selection;
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
  var label = document.getElementById('labelForFoodPairings');
  label.innerText = "Food Pairings:"
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
