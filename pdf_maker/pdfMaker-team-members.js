---
---
{% assign role_cards = site.role_cards | sort: "sequence" %}

const roleCardsForPDF = [];

let tempR = {};
let contribution = [];

{% for card in role_cards %}
tempR.ref = "{{card.ref}}";
tempR.name = "{{card.name}}";
tempR.subname = "{{card.subname}}";
tempR.sequence = "{{card.sequence}}";
tempR.type= "{{card.type}}";
{% for contribution in card.contribution %}
contribution.push("{{contribution}}");
{% endfor %}
tempR.contribution = [...contribution];
roleCardsForPDF.push({...tempR});
tempR = {};
contribution = []; 
{% endfor %}

const roleCardsPDFGenerator = () => {

    const jsPDF = window.jspdf.jsPDF;

    const CARD_WIDTH = 95;
    const CARD_HEIGHT = 95;
    const CARD_DISTANCE = 10;
    const CARD_COLOR = '#d8b43b';
    
    const cardFront = (doc, x, y, data) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

        let text = `${data.sequence}. ${data.name}`;
        text = text.replace("-", "- ");
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

        const yMove = (formatedText.length - 1) * 12 + 10;

        for(let i = 0; i < formatedText.length; i++) {
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(30);
            doc.setFont('Pasajero');
            doc.text(x + CARD_WIDTH / 2 - doc.getTextWidth(formatedText[i]) / 2, y + CARD_HEIGHT / 2 + 3 + i * 12 - yMove / 2, formatedText[i]);
        }

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.setFont('Calibri', 'normal');
        doc.text(x + CARD_WIDTH / 2 - doc.getTextWidth(data.subname) / 2, y + CARD_HEIGHT / 2 + yMove - yMove / 2, data.subname);
    }

    const cardBack = (doc, x, y, data) => {
    
        doc.setDrawColor(0);
        doc.setFillColor(CARD_COLOR);
        doc.rect(x, y, CARD_HEIGHT, CARD_WIDTH, 'F');

        doc.setFillColor(255,255,255);
        doc.rect(x + 1.5, y + 1.5, CARD_HEIGHT - 3, CARD_WIDTH - 3, 'F');

        const contributionTitle = `${data.sequence}. Contribution`
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.setFont('Calibri', 'normal');
        doc.text(x + CARD_WIDTH / 2 - doc.getTextWidth(contributionTitle) / 2, y + 12, contributionTitle);

        let yExtra = 0; 
        for(let i = 0; i < data.contribution.length; i++) {

            const textSplitted = data.contribution[i].split(" ");
            const formatedText = [];
            let s = '';
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
           
            for(let j = 0; j < formatedText.length; j++) {
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(16);
                doc.setFont('Calibri', 'normal');
                doc.text(x + 9, y + 24 + (12 * i) + (6 * j) + yExtra, formatedText[j]);
            }
            yExtra += (formatedText.length - 1) * 6;

        }

        doc.setTextColor(CARD_COLOR);
        doc.setFontSize(16);
        doc.setFont('Pasajero', 'normal');
        doc.text(x + CARD_WIDTH - 4, y + CARD_HEIGHT - 4, data.type, null, 90);
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
                cardBack(doc, positions[i].x, positions[i].y, cards[i])
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
        doc.save("role_cards.pdf")
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
            cardFront(doc, 0, 0, cards[i]);
            cardBack(doc, 0, CARD_HEIGHT, cards[i]);
        }

        return doc;
    }

    const downloadMiroPdf = (cards) => {
        const doc = generateMiroPdf(cards);
        doc.save("role_cards_miro.pdf");
    }

    return {
        generatePdf,
        downloadPdf,
        generateMiroPdf,
        downloadMiroPdf,
    }

}
