'use strict';

// Global Variables

let myContainer = document.querySelector('section');
let resultsButton = document.querySelector('section + div');
let results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let numberOfVotes = 0;
let maxVotes = 25;
let allProducts = [];

function Product(name, fileType = 'jpg') {
  this.name = name;
  this.fileType = fileType;
  this.src = `img/${this.name}.${this.fileType}`;
  this.alt = name;
  this.score = 0;
  this.views = 0;
  allProducts.push(this);
}

// List of Products
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// console.log(allProducts);

// Random Number Generator

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct() {
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
  let product3 = selectRandomProduct();

  while(product1 == product2) {
    product2 = selectRandomProduct();
  }
  while(product1 == product3) {
    product3 = selectRandomProduct();
  }
  while(product2 == product3){
    product3 = selectRandomProduct();
  }
  console.log(product1, product2, product3);

  image1.src = allProducts[product1].src;
  image1.alt = allProducts[product1].alt;
  allProducts[product1].views++;
  // console.log(allProducts[product1]);

  image2.src = allProducts[product2].src;
  image2.alt = allProducts[product2].alt;
  allProducts[product2].views++;
  // console.log(allProducts[product2]);

  image3.src = allProducts[product3].src;
  image3.alt = allProducts[product3].alt;
  allProducts[product3].views++;
  // console.log(allProducts[product3]);

}

function renderResults() {
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].score} votes and was seen ${allProducts[i].views} times.`;
    results.appendChild(li);
  }
}

function handleClick(e) {
  while (e.target === myContainer) {
    alert('Please click an image');
    break;
  }
  console.log(e.target.alt);
  numberOfVotes++;
  let clickedProduct = e.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (e.target.alt === allProducts[i].name) {
      console.log(allProducts[i]);
      allProducts[i].score++;
      break;
    }
  }
  if (numberOfVotes === maxVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultsButton.className = 'clicks-allowed';
    resultsButton.addEventListener('click', renderResults)
    alert('Please Click: View Results');
  } else {
    renderProduct();
  }
}

myContainer.addEventListener('click', handleClick);
renderProduct();
