---
---

var terms = {
    {% for term in site.glossary %}
        "{{ term.title }}" : {
                                "definition": "{{ term.definition }}",
                                "category": "{{ term.category }}"
                            }{% unless forloop.last %},{% endunless %}
    {% endfor %}
    }
    
var idx = lunr(function () {

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);

    this.ref('term');
    this.field('term');
    this.field('definition');
    this.field('category');
    
    for (key in terms) {
        this.add({
            'term': key,
            'definition': terms[key].definition,
            'category': terms[key].category,
        });
    }
});
    
    
function allTerms() {
    var termsList = document.getElementById('terms');
    while (termsList.firstChild)
        termsList.removeChild(termsList.firstChild);

    for (key in terms)
        termsList.appendChild(termBlock(key, terms[key].definition));
}

allTerms();
    
function search(search_term) {
    var result = idx.search(search_term);

    result = result.sort(function(a, b) {
        if(a.ref < b.ref) return -1;
        if(a.ref > b.ref) return 1;
        return 0;
    });

    var termsList = document.getElementById('terms');
    while (termsList.firstChild)
        termsList.removeChild(termsList.firstChild);

    if(result.length == 0) {
        var emptyList = document.createElement('div');
        emptyList.innerText = 'No search results'
        emptyList.classList.add("noSearchResults");
        termsList.appendChild(emptyList);
    } else {
        for(var i = 0; i < result.length; i++)
            termsList.appendChild(termBlock(result[i].ref, terms[result[i].ref].definition)); 
    }   
}
    
function termBlock(term, definition) {
    var termBlock = document.createElement('div');
    termBlock.className = "termBlock";
    
    var termTitle = document.createElement('div');
    termTitle.className = "termTitle";
    termTitle.innerText = term;
    termBlock.appendChild(termTitle);

    var termDefinition = document.createElement('div');
    termDefinition.className = "termDefinition";
    termDefinition.innerText = definition;
    termBlock.appendChild(termDefinition);

    return termBlock;
}

var alphabetList = document.getElementById('alphabet');

const letterSelectionHandler = function(e) {
    var current = document.getElementsByClassName("active-alphabet-letter-button");

    // If there's no active class
    if (current.length > 0)
        current[0].classList.remove("active-alphabet-letter-button");

    // Add the active class to the current/clicked button
    this.classList.add("active-alphabet-letter-button");

    if(this.id == "alphabet-all-button")
        allTerms();
    else
        search('category: c' + this.innerText);
}

var allButton = document.createElement('button');
allButton.id = "alphabet-all-button";
allButton.classList.add("alphabet-letter-button");
allButton.classList.add("active-alphabet-letter-button");
allButton.innerText = "All";
allButton.addEventListener('click', letterSelectionHandler);
alphabetList.appendChild(allButton);


for (var i = 65; 90 >= i; i++) { // A-65, Z-90
    var letterButton = document.createElement('button');
    letterButton.classList.add("alphabet-letter-button");
    letterButton.innerText = String.fromCharCode(i);
    
    if(idx.search("category: c" + letterButton.innerText).length == 0) {
        letterButton.setAttribute("disabled", "true");
    } else {    
        letterButton.addEventListener('click', letterSelectionHandler);
    }

    alphabetList.appendChild(letterButton);
}

const typeHandler = function(e) {
    if(e.target.value == '') {
        allTerms();
        document.getElementById("alphabet-all-button").classList.add("active-alphabet-letter-button");
    } else {
        var current = document.getElementsByClassName("active-alphabet-letter-button");

        if (current.length > 0)
            current[0].classList.remove("active-alphabet-letter-button");

        var inputs = e.target.value.split(" ");
        var searchRegex = "";
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i] != "") {
                if(i == inputs.length-1)
                    searchRegex += (' +' + inputs[i] + '*');
                else 
                    searchRegex += (' +' + inputs[i]);
            }
        }
        search(searchRegex);
    }
}

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener('input', typeHandler);  // register for oninput
searchInput.addEventListener('propertychange', typeHandler); // for IE8
searchInput.addEventListener('change', typeHandler); // fallback for Firefox for <select><option>, for <input> oninput is enough

function clearSearch() {
    var searchInput = document.getElementById("searchInput");
    if(searchInput.value != '') {
        searchInput.value= '';
        allTerms();
        document.getElementById("alphabet-all-button").classList.add("active-alphabet-letter-button");
    }
}
    