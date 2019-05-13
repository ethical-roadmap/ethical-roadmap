---
---

var valueCardsToBeRemoved = [];

function removeValueCard(e) {
        var valueCard = e.closest(".value-card");
        document.getElementById("value-card-list").removeChild(valueCard);

        //Show save and undo buttons
        document.getElementById('edit-buttons-container').style.display = 'block';

        //Add card reference to list of cards to be removed
        if(!valueCard.classList.contains('new-value-card')) 
            valueCardsToBeRemoved.push({
                                            'ref': valueCard.getAttribute('data-ref'),
                                            'component': valueCard  
                                        });
}

function createRemoveButton() {
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteValueCardButton');
    deleteButton.addEventListener('click', function() {
        removeValueCard(deleteButton);
    });

    var deleteButtonImg = document.createElement('img');
    deleteButtonImg.src = "{{site.baseurl}}/assets/images/remove_logo.png";
    deleteButtonImg.setAttribute('width', '25px');
    deleteButton.appendChild(deleteButtonImg);

    var deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.classList.add("deleteValueCardButtonContainer");
    deleteButtonContainer.appendChild(deleteButton);

    return deleteButtonContainer;
}


function createNewValueCard() {
    if(isLoggedIn()) {
        //regenerate new value card
        var newValueCard = document.createElement('div');
        newValueCard.classList.add('new-value-card');
        newValueCard.classList.add('value-card');

        var newValueCardInner = document.createElement('div');
        newValueCardInner.classList.add('value-card-inner');
        newValueCardInner.style = "background: #921f82;";
        newValueCard.appendChild(newValueCardInner);

        var newValueCardTextArea = document.createElement('textarea');
        newValueCardTextArea.classList.add('value-card-name');
        newValueCardTextArea.classList.add('value-card-textarea');
        newValueCardTextArea.placeholder = "add card name";
        newValueCardTextArea.setAttribute('maxlength', '32');
        newValueCardTextArea.style = "height: 20px;";
        newValueCardTextArea.addEventListener('keyup', function() {
            textareaAutoGrow(newValueCardTextArea, 20);
        });
        newValueCardInner.appendChild(newValueCardTextArea);

        newValueCardInner.appendChild(createRemoveButton());

        document.getElementById('value-card-list').insertBefore(newValueCard, document.getElementById('add-value-card'));

        //Show save and undo buttons
        document.getElementById('edit-buttons-container').style.display = 'block';
    }
}

function textareaAutoGrow(element, size) {
    element.style.height = size+"px";
    element.style.height = (element.scrollHeight)+"px";
}

function saveValueCards() {
    if(isLoggedIn()) {
        var newCards = document.querySelectorAll('.value-card-textarea');
        for(var i = 0; i < newCards.length; i++) {
            
            //Replace input with div
            var parent = newCards[i].parentElement;
            parent.removeChild(newCards[i]);

            var cardName = document.createElement('div');
            cardName.classList.add('value-card-name');
            cardName.innerText = newCards[i].value;

            parent.appendChild(cardName);
        
            //Push new value card to repo
            writeValueCard("{{ values.lang }}", newCards[i].value);
        }

        //Hide editing buttons
        document.getElementById('edit-buttons-container').style.display = 'none';
    }
}

function undoAll() {
    if(isLoggedIn()) {
        //Add all cards removed
        for(var i = 0; i < valueCardsToBeRemoved.length; i++)
            document.getElementById('value-card-list').insertBefore(valueCardsToBeRemoved[i].component, document.getElementById('add-value-card'));

        //Remove all references to cards to be removed
        valueCardsToBeRemoved = [];

        //Remove all new cards added
        var newCards = document.querySelectorAll('.new-value-card');
        console.log(newCards);
        
        for(var j = 0; j < newCards.length; j++) {
            document.getElementById('value-card-list').removeChild(newCards[j]);
        }

        //Hide editing buttons
        document.getElementById('edit-buttons-container').style.display = 'none';
    }
}

function valueCardsUserFeatures() {
    if (isLoggedIn()) {
        //add remove button to each card
        var valueCards = document.querySelectorAll('.value-card-inner');
        for(var i = 0; i < valueCards.length; i++) {
            valueCards[i].appendChild(createRemoveButton());
        }

        //add create card button
        var addValueCard = document.createElement('div');
        addValueCard.classList.add('value-card');
        addValueCard.id = 'add-value-card';
        addValueCard.style = 'cursor: pointer;';
        addValueCard.addEventListener('click', function() {
            createNewValueCard();
        });

        var valueCardInner = document.createElement('div');
        valueCardInner.classList.add('value-card-inner');
        valueCardInner.style = 'background: white;';
        addValueCard.appendChild(valueCardInner);

        var valueCardName = document.createElement('div');
        valueCardName.classList.add('value-card-name');
        valueCardName.style = 'color: #921f82; font-weight: bold; font-size: 60px;'
        valueCardName.innerHTML = '+';
        valueCardInner.appendChild(valueCardName);

        document.getElementById('value-card-list').appendChild(addValueCard);
               
        //add save and undo buttons
        var container = document.createElement('div');
        container.id = 'edit-buttons-container';

        var saveButton = document.createElement('button');
        saveButton.classList.add('edit-button');
        saveButton.addEventListener('click', function() {
            saveValueCards();
        });
        container.appendChild(saveButton);

        var saveImg = document.createElement('img');
        saveImg.src = '{{site.baseurl}}/assets/images/save.png';
        saveImg.setAttribute('width', '50px');
        saveImg.setAttribute('height', '50px');
        saveButton.appendChild(saveImg);

        var undoButton = document.createElement('button');
        undoButton.classList.add('edit-button');
        undoButton.addEventListener('click', function() {
            undoAll();
        });
        container.appendChild(undoButton);

        var undoImg = document.createElement('img');
        undoImg.src = '{{site.baseurl}}/assets/images/undo.png';
        undoImg.setAttribute('width', '50px');
        undoImg.setAttribute('height', '50px');
        undoButton.appendChild(undoImg);

        document.getElementById('value-card-list').closest('.category-content-1-column').appendChild(container);

    }    
}

valueCardsUserFeatures();
