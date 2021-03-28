const moralQualitiesCardsPDFGenerator = () => {

    const jsPDF = window.jspdf.jsPDF;

    const CARD_WIDTH = 95;
    const CARD_HEIGHT = 95;
    const CARD_DISTANCE = 10;
    const CARD_COLOR = '#767756';
    
    const cardFront = (doc, x, y, text) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(0,0,0);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'S');

        const textSplitted = text.split(" ");

        const formatedText = [];
        let s = '';
        for(let sp of textSplitted) {
            if(s.length + sp.length >= 16) {
                formatedText.push(s);
                s = '';
                s += ` ${sp}`;
            } else {
                s += ` ${sp}`;
            }
        }
        if(s != '')
            formatedText.push(s);

        const yMove = (formatedText.length - 1) * 12;

        for(let i = 0; i < formatedText.length; i++) {
            doc.setTextColor(CARD_COLOR);
            doc.setFontSize(30);
            doc.setFont('Pasajero');
            doc.text(x + CARD_WIDTH / 2 - doc.getTextWidth(formatedText[i]) / 2, y + CARD_HEIGHT / 2 + i * 12 - yMove / 2, formatedText[i]);
        }

    }

    const cardBack = (doc, x, y, text) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

        const textSplitted = text.split(" ");
        const formatedText = [];
        let s = '';

        doc.setFontSize(16);
        doc.setFont('Pasajero', 'normal');

        for(let sp of textSplitted) {
            let newString = `${s} ${sp}`;
            if(doc.getTextWidth(newString) >= CARD_WIDTH - 20) {
                s = s.trim();
                formatedText.push(s);
                s = '';
                s += ` ${sp}`;
            } else {
                s += ` ${sp}`;
            }
        }
        if(s != '') {
            s = s.trim();
            formatedText.push(s);
        }

        const yMove = (formatedText.length - 1) * 6 / 2;
        for(let j = 0; j < formatedText.length; j++) {
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.setFont('Pasajero', 'normal');
            doc.text(x + CARD_WIDTH / 2 - doc.getTextWidth(formatedText[j]) / 2, y + CARD_HEIGHT / 2  + (6 * j) - yMove, formatedText[j]);
        }
    }

    const createCardFrontPage = (doc, cards) => {

        const x = 5;
        const y = 5;

        const positions = [
            {x, y},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y},
            {x, y: y + CARD_WIDTH + CARD_DISTANCE},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y: y + CARD_WIDTH + CARD_DISTANCE}
        ]

        for(let i = 0; i < positions.length ; i++) {
            if(cards[i] != null)
                cardFront(doc, positions[i].x, positions[i].y, cards[i].front)
        }

        doc.setDrawColor('#CDCDCD');
        doc.setLineWidth(0.1);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE);
        doc.line(CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE / 2, CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE * 2 + CARD_HEIGHT * 2);

    }

    const createCardBackPage = (doc, cards) => {

        const x = 5;
        const y = 5;

        const positions = [
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y},
            {x, y},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y: y + CARD_WIDTH + CARD_DISTANCE},
            {x, y: y + CARD_WIDTH + CARD_DISTANCE}
        ]

        for(let i = 0; i < positions.length ; i++) {
            if(cards[i] != null)
                cardBack(doc, positions[i].x, positions[i].y, cards[i].back)
        }

        doc.setDrawColor('#CDCDCD');
        doc.setLineWidth(0.1);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE);
        doc.line(CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE / 2, CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE * 2 + CARD_HEIGHT * 2);

    }

    const generatePdf = (cards) => {

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });

        let firstPage = true;

        const chunk = 4;
        for (let i=0; i< cards.length; i+=chunk) {
            const tempArray = cards.slice(i,i+chunk);
            if(!firstPage)
                doc.addPage();
            createCardFrontPage(doc, tempArray);
            firstPage = false

            doc.addPage();
            createCardBackPage(doc, tempArray);
        }
       
        return doc;
    }

    const downloadPdf = (cards) => {
        const doc = generatePdf(cards);
        doc.save("moral_quality_cards.pdf")
    }

    return {
        generatePdf,
        downloadPdf,
    }

}

const moralQualitiesProvocationCardsPDFGenerator = () => {

    const jsPDF = window.jspdf.jsPDF;

    const CARD_WIDTH = 95;
    const CARD_HEIGHT = 95;
    const CARD_DISTANCE = 10;
    const CARD_COLOR = '#767756';
    
    const cardFront = (doc, x, y, text) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

        const textSplitted = text.split(" ");

        const formatedText = [];
        let s = '';
        for(let sp of textSplitted) {
            if(s.length + sp.length >= 16) {
                formatedText.push(s);
                s = '';
                s += ` ${sp}`;
            } else {
                s += ` ${sp}`;
            }
        }
        if(s != '')
            formatedText.push(s);

        const yMove = (formatedText.length - 1) * 12;

        for(let i = 0; i < formatedText.length; i++) {
            doc.setTextColor(255,255,255);
            doc.setFontSize(30);
            doc.setFont('Pasajero');
            doc.text(x + CARD_WIDTH / 2 - doc.getTextWidth(formatedText[i]) / 2, y + CARD_HEIGHT / 2 + i * 12 - yMove / 2, formatedText[i]);
        }

    }

    const cardBack = (doc, x, y) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

    }

    const createCardFrontPage = (doc, cards) => {

        const x = 5;
        const y = 5;

        const positions = [
            {x, y},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y},
            {x, y: y + CARD_WIDTH + CARD_DISTANCE},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y: y + CARD_WIDTH + CARD_DISTANCE}
        ]

        for(let i = 0; i < positions.length ; i++) {
            if(cards[i] != null)
                cardFront(doc, positions[i].x, positions[i].y, cards[i].front)
        }

        doc.setDrawColor('#CDCDCD');
        doc.setLineWidth(0.1);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE);
        doc.line(CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE / 2, CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE * 2 + CARD_HEIGHT * 2);

    }

    const createCardBackPage = (doc, cards) => {

        const x = 5;
        const y = 5;

        const positions = [
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y},
            {x, y},
            {x: x + CARD_HEIGHT + CARD_DISTANCE, y: y + CARD_WIDTH + CARD_DISTANCE},
            {x, y: y + CARD_WIDTH + CARD_DISTANCE}
        ]

        for(let i = 0; i < positions.length ; i++) {
            if(cards[i] != null)
                cardBack(doc, positions[i].x, positions[i].y)
        }

        doc.setDrawColor('#CDCDCD');
        doc.setLineWidth(0.1);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE);
        doc.line(CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE / 2, CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE * 2 + CARD_HEIGHT * 2);

    }

    const generatePdf = (cards) => {

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });

        let firstPage = true;

        const chunk = 4;
        for (let i=0; i< cards.length; i+=chunk) {
            const tempArray = cards.slice(i,i+chunk);
            if(!firstPage)
                doc.addPage();
            createCardFrontPage(doc, tempArray);
            firstPage = false

            doc.addPage();
            createCardBackPage(doc, tempArray);
        }
       
        return doc;
    }

    const downloadPdf = (cards) => {
        const doc = generatePdf(cards);
        doc.save("moral_quality_cards.pdf")
    }

    return {
        generatePdf,
        downloadPdf,
    }

}
