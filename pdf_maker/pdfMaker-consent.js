const methodsCardsPDFGenerator = () => {

    const jsPDF = window.jspdf.jsPDF;

    const CARD_WIDTH = 95;
    const CARD_HEIGHT = 95;
    const CARD_DISTANCE = 10;
    const CARD_COLOR = '#cdcb36';
    
    const cardFront = (doc, x, y, text) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

        const textSplitted = text.split(" ");

        const formatedText = [];
        let s = '';
        for(let sp of textSplitted) {
            const newString = `${s} ${sp}`
            if(doc.getTextWidth(newString) >= CARD_WIDTH - 24) {
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
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(30);
            doc.setFont('Pasajero');
            doc.text(x + CARD_WIDTH / 2 - doc.getTextWidth(formatedText[i]) / 2, y + CARD_HEIGHT / 2 + i * 12 - yMove / 2, formatedText[i]);
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
                cardFront(doc, positions[i].x, positions[i].y, cards[i])
        }

        doc.setDrawColor('#CDCDCD');
        doc.setLineWidth(0.1);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE);
        doc.line(CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE / 2, CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE * 2 + CARD_HEIGHT * 2);

        const text = "[print single sided and cut]";
        doc.setTextColor('#587183');
        doc.setFontSize(18);
        doc.setFont('Pasajero');
        doc.text(doc.internal.pageSize.getWidth() / 2 - doc.getTextWidth(text) / 2, y + CARD_HEIGHT * 2 + CARD_DISTANCE * 3 + 20 , text);

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
        }
       
        return doc;
    }

    const downloadPdf = (cards) => {
        const doc = generatePdf(cards);
        doc.save("methods_cards.pdf")
    }

    return {
        generatePdf,
        downloadPdf,
    }

}

const outcomeCardsPDFGenerator = () => {

    const jsPDF = window.jspdf.jsPDF;

    const CARD_WIDTH = 95;
    const CARD_HEIGHT = 95;
    const CARD_DISTANCE = 10;
    const CARD_COLOR = '#cdcb36';
    
    const cardFront = (doc, x, y, text) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

        doc.setFillColor(255,255,255);
        doc.rect(x + 1.5, y + 1.5, CARD_HEIGHT - 3, CARD_WIDTH - 3, 'F');

        doc.setFontSize(30);
        doc.setFont('Pasajero');
        const textSplitted = text.split(" ");
        const formatedText = [];
        let s = '';
        for(let sp of textSplitted) {
            const newString = `${s} ${sp}`
            if(doc.getTextWidth(newString) >= CARD_WIDTH - 24) {
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
                cardFront(doc, positions[i].x, positions[i].y, cards[i])
        }

        doc.setDrawColor('#CDCDCD');
        doc.setLineWidth(0.1);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT);
        doc.line(CARD_DISTANCE / 2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE, CARD_WIDTH * 2 + CARD_DISTANCE + CARD_DISTANCE/2, CARD_DISTANCE + CARD_HEIGHT * 2 + CARD_DISTANCE);
        doc.line(CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE / 2, CARD_DISTANCE + CARD_WIDTH, CARD_DISTANCE * 2 + CARD_HEIGHT * 2);

        const text = "[print single sided and cut]";
        doc.setTextColor('#587183');
        doc.setFontSize(18);
        doc.setFont('Pasajero');
        doc.text(doc.internal.pageSize.getWidth() / 2 - doc.getTextWidth(text) / 2, y + CARD_HEIGHT * 2 + CARD_DISTANCE * 3 + 20 , text);

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
        }
       
        return doc;
    }

    const downloadPdf = (cards) => {
        const doc = generatePdf(cards);
        doc.save("outcomes_cards.pdf")
    }

    return {
        generatePdf,
        downloadPdf,
    }

}
