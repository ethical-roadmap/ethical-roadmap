const { jsPDF } = require("jspdf");
const pasajeroFont = require('./Pasajero-normal.js');
const calibriFont = require('./Calibri-normal.js');
const fs = require('fs');

pasajeroFont.addPasajeroFont(jsPDF);
calibriFont.addCalibriFont(jsPDF);

const CARD_WIDTH = 136;
const CARD_HEIGHT = 93;
const CARD_DISTANCE = 12;
const CARD_COLOR = '#80483b';

const content = fs.readdirSync('../_provocation_ds_cards/english');
console.log(content);

const cards = [];

for(let c of content) {
    const d = fs.readFileSync(`../_provocation_ds_cards/english/${c}`, 'utf8');
    const splitted = d.split('\n');
    console.log(splitted);
}



const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
});
 
const testData = [
    {
        ref: 1,
        lang: "en",
        category: "technology",
        subcategory: "[provocations]",
        text: ["Somebody steals data from prototypes", "What do you do?"]
    },
    {
        ref: 1,
        lang: "en",
        category: "technology",
        subcategory: "[provocations]",
        text: ["Somebody steals data from prototypes", "What do you do?"]
    },
    {
        ref: 1,
        lang: "en",
        category: "technology",
        subcategory: "[provocations]",
        text: ["Somebody steals data from prototypes", "What do you do?"]
    },
    {
        ref: 26,
        lang: "en",
        category: "relationships between family members",
        subcategory: "[provocations]",
        text:["a participant with dementia doesn't remember why he is part of a research process", "what do keep reminding them?"]
    }
]


const cardFront = (x, y, texts) => {

    doc.setDrawColor(0);
    doc.setFillColor(CARD_COLOR);
    doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

    x += 1;
    y += 1;
    
    doc.setFillColor('#ffffff');
    doc.rect(x, y, 91, 134, 'F'); 

    x += 2;
    y += 2;

    doc.setFillColor(CARD_COLOR);
    doc.rect(x, y, 87, 130, 'F');

    let formatedTexts = [];

    let xToBeMoved = 0;

    for(let sentence of texts) {
        const lines = [];
        sentence = sentence.toLowerCase();
        let line = '';
        const splittedSentence = sentence.split(' ');

        for(let word of splittedSentence) {
            if(line.length + word.length + 1 < 32) {
                line += `${word} `;
            } else {
                lines.push(line);
                line = `${word} `; 
                xToBeMoved += 7
            }
        }
        lines.push(line);
    
        formatedTexts.push(lines);
        xToBeMoved += 10;
    }

    x += (87 / 2) - (xToBeMoved / 2);
    y += 130 / 2;

    for(let formatedText of formatedTexts) {
        
        for(let sentence of formatedText) {
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.setFont('Pasajero');
            doc.text(x, y + ((sentence.length / 2) * 3.2), sentence, null, 90);
            x += 7
        }

        x += 10
    }
    
}

const emptyCardFront = (x, y) => {

    doc.setDrawColor(0);
    doc.setFillColor(CARD_COLOR);
    doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

    x += 1;
    y += 1;
    
    doc.setFillColor('#ffffff');
    doc.rect(x, y, 91, 134, 'F');

}

const createCardFrontPage = (cards) => {

    const x = 6;
    const y = 6;

    for(let i = 0; i < Math.min(cards.length, 4); i++) {
        if(i === 0)
            cardFront(x, y, cards[i].text)
        else if(i === 1)
            cardFront(x + CARD_HEIGHT + CARD_DISTANCE, y, cards[i].text)
        else if(i === 2)
            cardFront(x, y + CARD_WIDTH + CARD_DISTANCE, cards[i].text)
        else if(i === 3)
            cardFront(x + CARD_HEIGHT + CARD_DISTANCE, y + CARD_WIDTH + CARD_DISTANCE, cards[i].text)
    }

}

const cardBack = (x, y, category, subcategory) => {

    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.setFillColor('#ffffff');
    doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'D');

    let xToBeMoved = 0;

    const lines = [];
    category = category.toLowerCase();
    let line = '';
    const splittedCategory = category.split(' ');

    for(let word of splittedCategory) {
        if(line.length + word.length + 1 < 14) {
            line += `${word} `;
        } else {
            lines.push(line);
            line = `${word} `; 
            xToBeMoved += 7
        }
    }
    lines.push(line);

    xToBeMoved += 17;

    x += (CARD_HEIGHT / 2) - (xToBeMoved / 2);
    y += CARD_WIDTH / 2;
    
    for(let l of lines) {
        doc.setTextColor(CARD_COLOR);
        doc.setFontSize(27);
        doc.setFont('Pasajero');
        doc.text(x, y + ((l.length / 2) * 4.5) + 4.5/2, l, null, 90);
        x += 7
    }

    doc.setTextColor('#000000');
    doc.setFontSize(16);
    doc.setFont('Calibri', 'normal');
    doc.text(x + 17, y + ((subcategory.length / 2) * 2.3) , subcategory.toLowerCase(), null, 90);
    x += 7
}


//createCardFrontPage(testData);

//cardBack(6, 6, testData[0].category, testData[0].subcategory);

emptyCardFront(6, 6)

doc.save("a4.pdf")
