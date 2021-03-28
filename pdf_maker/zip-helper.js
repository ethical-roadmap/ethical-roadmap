---
---

const downloadZip = (files, filename) => {

    var zip = new JSZip();
    for(let {name, data} of files) {
        zip.file(name, data);
    }

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, filename);
    });

}

const downloadValueZip = async() => {

    const files = [];

    //Load Facilitation Sheets    
    const urlFS = "{{site.baseurl}}/assets/pdfs/values/facilitation-sheets.pdf";
    const arrayBufferFS = await fetch(urlFS).then(res => res.arrayBuffer());
    files.push({
        name: "facilitation_sheets.pdf",
        data: arrayBufferFS,
    });

    //Load Value Cards
    const doc1 = valueCardsPDFGenerator().generatePdf(valueCardsForPDF);
    let valueCards = doc1.output('arraybuffer');
    files.push({
        name: "value_cards.pdf",
        data: valueCards,
    });

    //Load Blank Value Cards
    const urlBVC = "{{site.baseurl}}/assets/pdfs/values/blank-value-cards.pdf";
    const arrayBufferBVC = await fetch(urlBVC).then(res => res.arrayBuffer());
    files.push({
        name: "blank_value_cards.pdf",
        data: arrayBufferBVC,
    });

    //Load Value Cards Board
    const urlVCB = "{{site.baseurl}}/assets/pdfs/values/value-cards-board.pdf";
    const arrayBufferVCB = await fetch(urlVCB).then(res => res.arrayBuffer());
    files.push({
        name: "value_cards_board.pdf",
        data: arrayBufferVCB,
    });

    //Load Lens Cards
    const doc2 = lensesCardsPDFGenerator().generatePdf(lensCardsForPDF);
    let lensCards = doc2.output('arraybuffer');
    files.push({
        name: "lens_cards.pdf",
        data: lensCards,
    });

    //Load Capture Sheets
    const urlCS = "{{site.baseurl}}/assets/pdfs/values/capture-sheets.pdf";
    const arrayBufferCS = await fetch(urlCS).then(res => res.arrayBuffer());
    files.push({
        name: "capture_Sheets.pdf",
        data: arrayBufferCS,
    });

    downloadZip(files, "value.zip");
}

