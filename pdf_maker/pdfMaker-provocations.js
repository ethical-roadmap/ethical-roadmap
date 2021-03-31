---
---
{% assign provocation_ds_cards = site.provocation_ds_cards | sort: "ref" %}

const provocationCardsForPDF = [];

let tempP = {};
let texts = [];

{% for card in provocation_ds_cards %}
tempP.ref = "{{card.ref}}";
tempP.category = "{{card.category}}";
tempP.subcategory = "{{card.subcategory}}";
{% for text in card.text %}
texts.push("{{text}}");
{% endfor %}
tempP.texts = [...texts];
provocationCardsForPDF.push({...tempP});
tempP = {};
texts = []; 
{% endfor %}

const provocationCardsPDFGenerator = () => {

    var jsPDF = window.jspdf.jsPDF;

    const CARD_WIDTH = 136;
    const CARD_HEIGHT = 93;
    const CARD_DISTANCE = 12;
    const CARD_COLOR = '#76443c';
    
    const cardFront = (doc, x, y, texts) => {

        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_WIDTH, CARD_HEIGHT, 'F');

        x += 1;
        y += 1;
        
        doc.setFillColor('#ffffff');
        doc.rect(x, y, 134, 91, 'F'); 

        x += 2;
        y += 2;

        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, 130, 87, 'F');

        let formatedTexts = [];

        let yToBeMoved = 0;

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
                    yToBeMoved += 7
                }
            }
            lines.push(line);
        
            formatedTexts.push(lines);
            yToBeMoved += 10;
        }

        x += 130 / 2; 
        y += (87 / 2) - (yToBeMoved / 2);

        for(let formatedText of formatedTexts) {
            
            for(let sentence of formatedText) {
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(16);
                doc.setFont('Pasajero');
                doc.text(x - doc.getTextWidth(sentence) / 2, y, sentence, null);
                y += 7
            }

            y += 10
        }
        
    }

    const emptyCardFront = (doc, x, y) => {

        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_WIDTH, CARD_HEIGHT, 'F');

        x += 1;
        y += 1;
        
        doc.setFillColor('#ffffff');
        doc.rect(x, y, 134, 91, 'F');

    }

    const createCardFrontPage = (doc, cards) => {

        const x = 6;
        const y = 6;

        const positions = [
            {x, y},
            {x: x + CARD_WIDTH + CARD_DISTANCE, y},
            {x, y: y + CARD_HEIGHT + CARD_DISTANCE},
            {x: x + CARD_WIDTH + CARD_DISTANCE, y: y + CARD_HEIGHT + CARD_DISTANCE}
        ]

        for(let i = 0; i < positions.length ; i++) {
            if(cards[i] != null)
                cardFront(doc, positions[i].x, positions[i].y, cards[i].texts)
            else
                emptyCardFront(doc, positions[i].x, positions[i].y, );
        }

    }

    const cardBack = (doc, x, y, category, subcategory) => {

        doc.setDrawColor(0);
        doc.setLineWidth(0.1);
        doc.setFillColor('#ffffff');
        doc.rect(x, y, CARD_WIDTH, CARD_HEIGHT, 'D');

        let yToBeMoved = 0;

        const lines = [];
        category = category.toLowerCase();
        let line = '';
        const splittedCategory = category.split(' ');

        for(let word of splittedCategory) {
            if(line.length + word.length + 1 < 21) {
                line += `${word} `;
            } else {
                lines.push(line);
                line = `${word} `; 
                yToBeMoved += 10
            }
        }
        lines.push(line);

        yToBeMoved += 17;

        x += CARD_WIDTH / 2;
        y += (CARD_HEIGHT / 2) - (yToBeMoved / 2);
        
        for(let l of lines) {
            doc.setTextColor(CARD_COLOR);
            doc.setFontSize(27);
            doc.setFont('Pasajero');
            doc.text(x - doc.getTextWidth(l) / 2, y , l.toLowerCase(), null);
            y += 10
        }

        doc.setTextColor('#000000');
        doc.setFontSize(16);
        doc.setFont('Calibri', 'normal');
        doc.text(x - doc.getTextWidth(subcategory) / 2, y + 17, subcategory.toLowerCase(), null);
        y += 7
    }

    const createCardBackPage = (doc, category, subcategory) => {

        const x = 6;
        const y = 6;

        cardBack(doc, x, y, category, subcategory);
        cardBack(doc, x + CARD_WIDTH + CARD_DISTANCE, y, category, subcategory);
        cardBack(doc, x, y + CARD_HEIGHT + CARD_DISTANCE, category, subcategory);
        cardBack(doc, x + CARD_WIDTH + CARD_DISTANCE, y + CARD_HEIGHT + CARD_DISTANCE, category, subcategory);

    }


    const generatePdf = (cards) => {

        const doc = new jsPDF({
            orientation: 'l',
            unit: 'mm',
            format: 'a4',
        });

        let firstPage = true;

        const cardsByCategory = new Map();

        for(let card of cards) {
            if(cardsByCategory.has(card.category)) {
                const cardList = cardsByCategory.get(card.category);
                cardList.push(card);
                cardsByCategory.set(cardsByCategory, cardList);
            } else {
                cardsByCategory.set(card.category, [card]);
            }
        }
        
        cardsByCategory.forEach((cards) => {

            for(let i = 0; i < cards.length; i+=4) {
                const temp = cards.slice(i,i+4);
                if(!firstPage)
                    doc.addPage();
                else
                    firstPage = false;
                createCardBackPage(doc, cards[0].category, cards[0].subcategory);
                doc.addPage();
                createCardFrontPage(doc, temp);
            }

        });

        return doc;
     
    }

    const downloadPdf = (cards) => {
        const doc = generatePdf(cards);
        doc.save("provocation_cards.pdf")
    }

    const generateMiroPdf = (cards) => {

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [CARD_WIDTH, CARD_HEIGHT * 2],
        }); 

        for (let i=0; i < cards.length; i++) {
            if(i != 0)
                doc.addPage();
            cardBack(doc, 0, 0, cards[i].category, cards[i].subcategory);
            cardFront(doc, 0, CARD_HEIGHT, cards[i].texts);
        }

        return doc;
    }

    const downloadMiroPdf = (cards) => {
        const doc = generateMiroPdf(cards);
        doc.save("provocation_cards_miro.pdf");
    }

    return {
        generatePdf,
        downloadPdf,
        generateMiroPdf,
        downloadMiroPdf,
    }
}
