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
  var select = document.getElementById("beer-list");

  beers.forEach(function(beer, index){
    var option = document.createElement("option");
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
  clearList();
  var dog = document.getElementById('defaultImage');
  dog.style.display = "none";
  var chosen = document.querySelector("select");
  var beer = beers[chosen.value];
  var beerName = createBeerName(beer);
  var tag = createTagLine(beer);
  var pairings = createPairings(beer);
  var ingredients = createIngredients(beer);
  var image = createImage(beer);
}

var clearList = function(){
  var foodPairings = document.getElementById("foodPairings");
  foodPairings.innerHTML = " ";
}

var createIngredients = function(beer){
  var label = document.getElementById("labelForIngredients");
  label.innerHTML = "Ingredients:";
  createMaltList(beer);
  createHopList(beer);
  createYeastList(beer);
}

var createMaltList = function(beer){
    var maltList = this.ingredientLists(beer.ingredients.malt);
    var malts = document.getElementById("malts");
    malts.innerHTML = '<span id="label">Malts: </span>' + maltList;
}

var createHopList = function(beer){
  var hopList = this.ingredientLists(beer.ingredients.hops);
  var hops = document.getElementById("hops");
  hops.innerHTML = '<span id="label">Hops: </span>' + hopList;
}

var createYeastList = function(beer){
  var yeast = document.getElementById("yeast");
  yeast.innerHTML = '<span id="label">Yeast: </span>' + beer.ingredients.yeast;
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
  beerName.style.backgroundColor = "#00afdb";
  return beerName;
}

var createImage = function(beer){
  var img = document.getElementById("imageofBeer");
  var button = document.getElementById("popupButton");
  button.innerText = "Show details";
  button.style.backgroundColor = "#00afdb";
  img.src = beer.image_url;
  img.title = beer.description;
  popup(beer);
}

var popup = function(beer){
  var popup = document.getElementById("popUp");
  var btn = document.getElementById("popupButton");
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function() {
    popup.style.display = "block";
    var content = document.getElementById("popupContent");
    content.innerText = beer.description;
    content.style.fontSize = "12px";
  };
  span.onclick = function() {
    popup.style.display = "none";
  };
}

var createTagLine = function(beer){
  var tagLine = document.getElementById("subtitleForBeer");
  tagLine.innerText = beer.tagline;
  return tagLine;
}

var createPairings = function(beer){
  var label = document.getElementById("labelForFoodPairings");
  label.innerText = "Food Pairings:"
  var foodPairings = document.getElementById("foodPairings");
  for(each of beer.food_pairing){
    var li = document.createElement("li");
    li.innerText = each;
    li.classList = "food";
    foodPairings.appendChild(li);
  }
}


window.addEventListener('load', app);
