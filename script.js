const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const quoteContainer = document.querySelector("#quote-container");
const loader = document.querySelector(".loader");
const quoteButton = document.querySelector("#new-Quote");
const twitterButton = document.querySelector("#twitter");


let quoteArray = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function fetchingQuote() {
    loading();
    try{
        const response = await fetch('https://type.fit/api/quotes');
        quoteArray = await response.json();
        newQuote();
    }
    catch {
        // if promised rejected local quotes will be displayed
        quoteArray = [...localQuotes];
        newQuote();
    }
    
}

function newQuote() {
    const singleQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
    if(singleQuote.text.length>70){
        quote.classList.add("long-quote")
    }else {
        quote.classList.remove("long-quote")
    }
    quote.textContent = singleQuote.text;
    author.textContent = singleQuote.author;
    complete();
    
}



// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
    window.open(twitterUrl, '_blank');
  }



// onload
fetchingQuote();
quoteButton.addEventListener("click",newQuote);
twitterButton.addEventListener("click",tweetQuote);
setInterval(()=>{
   newQuote();
},5000);

