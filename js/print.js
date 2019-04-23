function print() {
    const filename  = 'ThisIsYourPDFFilename.pdf';

    html2canvas(document.querySelectorAll('#nodeToRenderAsPDF')).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.save(filename);
    });
}

// Variant
// This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.
async function print(quality = 1) {
    const filename  = 'ThisIsYourPDFFilename.pdf';
    var pages = document.querySelectorAll('#nodeToRenderAsPDF');
    let pdf = new jsPDF('p', 'mm', 'a4');

    for(var i = 0; i < pages.length; i++) {
        await html2canvas(pages.item(i), {scale: quality}).then(canvas => {
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
            pdf.addPage();
        });
    }
    pdf.save(filename);
    
}