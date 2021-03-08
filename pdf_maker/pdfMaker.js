
const provocationCardsPDFGenerator = () => {

    var jsPDF = window.jspdf.jsPDF;

    const CARD_WIDTH = 136;
    const CARD_HEIGHT = 93;
    const CARD_DISTANCE = 12;
    const CARD_COLOR = '#76443c';
    
    const cardFront = (doc, x, y, texts) => {

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
                doc.text(x, y + doc.getTextWidth(sentence) / 2, sentence, null, 90);
                x += 7
            }

            x += 10
        }
        
    }

    const emptyCardFront = (doc, x, y) => {

        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

        x += 1;
        y += 1;
        
        doc.setFillColor('#ffffff');
        doc.rect(x, y, 91, 134, 'F');

    }

    const createCardFrontPage = (doc, cards) => {

        const x = 6;
        const y = 6;

        const positions = [
            {x, y},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y},
            {x, y: y + CARD_WIDTH + CARD_DISTANCE},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y: y + CARD_WIDTH + CARD_DISTANCE}
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
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'D');

        let xToBeMoved = 0;

        const lines = [];
        category = category.toLowerCase();
        let line = '';
        const splittedCategory = category.split(' ');

        for(let word of splittedCategory) {
            if(line.length + word.length + 1 < /*14*/21) {
                line += `${word} `;
            } else {
                lines.push(line);
                line = `${word} `; 
                xToBeMoved += 10
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
            doc.text(x, y + doc.getTextWidth(l) / 2, l.toLowerCase(), null, 90);
            x += 10
        }

        doc.setTextColor('#000000');
        doc.setFontSize(16);
        doc.setFont('Calibri', 'normal');
        doc.text(x + 17, y + doc.getTextWidth(subcategory) / 2, subcategory.toLowerCase(), null, 90);
        x += 7
    }

    const createCardBackPage = (doc, category, subcategory) => {

        const x = 6;
        const y = 6;

        cardBack(doc, x, y, category, subcategory);
        cardBack(doc, x + CARD_HEIGHT + CARD_DISTANCE, y, category, subcategory);
        cardBack(doc, x, y + CARD_WIDTH + CARD_DISTANCE, category, subcategory);
        cardBack(doc, x + CARD_HEIGHT + CARD_DISTANCE, y + CARD_WIDTH + CARD_DISTANCE, category, subcategory);

    }


    const generatePdf = (cards) => {

        const doc = new jsPDF({
            orientation: 'p',
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

            if(!firstPage)
                doc.addPage();
            else
                firstPage = false;

            createCardBackPage(doc, cards[0].category, cards[0].subcategory);

            for(let i = 0; i < cards.length; i+=4) {
                const temp = cards.slice(i,i+4);
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

    return {
        generatePdf,
        downloadPdf,
    }
}

