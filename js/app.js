'use strict';

// const { Chart } = require("chart.js");

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
let seenProductsArr = [];

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

  while(seenProductsArr.length < 6) {
    let product = selectRandomProduct();
    if(!seenProductsArr.includes(product)) {
      seenProductsArr.push(product);
    }
  }

  let product1 = seenProductsArr.shift()
  let product2 = seenProductsArr.shift()
  let product3 = seenProductsArr.shift()

  image1.src = allProducts[product1].src;
  image1.alt = allProducts[product1].alt;
  allProducts[product1].views++;


  image2.src = allProducts[product2].src;
  image2.alt = allProducts[product2].alt;
  allProducts[product2].views++;

  image3.src = allProducts[product3].src;
  image3.alt = allProducts[product3].alt;
  allProducts[product3].views++;

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
  numberOfVotes++;
  let clickedProduct = e.target.alt;
  console.log(clickedProduct);

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].score++;
      break;
    }
  }
  if (numberOfVotes === maxVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultsButton.className = 'clicks-allowed';
    resultsButton.addEventListener('click', renderResults);
    resultsButton.addEventListener('click', renderChart);
    alert('Please Click: View Results');
  } else {
    renderProduct();
  }
}

myContainer.addEventListener('click', handleClick);
renderProduct();

// Chart Builder

// Create Labels
function renderChart() {
  let labels = [];
  let votes = [];
  let numViews = [];
  
  // Create Arrays for Sorting
  for(let i = 0; i < allProducts.length; i++) {
    labels.push(allProducts[i].name);
    votes.push(allProducts[i].score);
    numViews.push(allProducts[i].views);
  }
  console.log(labels);
  console.log(votes);

  // Merge Arrays
  let merged = labels.map((label, i) => {
    return {
      'label': labels[i],
      'votes': votes[i],
      'views': numViews[i]
    }
  });
  // console.log(merged);

  // Sort Arrays by Votes
  let sortArray = merged.sort(function(a, b) {
    return b.votes - a.votes
  });

  // console.log(sortArray);

  let sortedLabels = [];
  let sortedVotes = [];
  let sortedViews = [];

  for (let i = 0; i < sortArray.length; i++) {
    sortedLabels.push(sortArray[i].label);
    sortedVotes.push(sortArray[i].votes);
    sortedViews.push(sortArray[i].views);
  }

  const ctx = document.getElementById('resultsChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedLabels,
      datasets: [{
        label: '# of Votes',
        data: sortedVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: sortedViews,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
    }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
