---
---

const downloadZip = async (files, filename) => {

    var zip = new JSZip();
    for(let {name, data} of files) {
        zip.file(name, data);
    }

    const content = await zip.generateAsync({type:"blob"})
    saveAs(content, filename);
}

const getFiles = async(urlList, functionList) => {

    const files = [];

    for(let {name, url} of urlList) {
        const arrayBuffer = await fetch(url).then(res => res.arrayBuffer());
        files.push({
            name,
            data: arrayBuffer,
        });
    }

    for(let {name, func, arg} of functionList) {
        const doc = func().generatePdf(arg);
        let result = doc.output('arraybuffer');
        files.push({
            name,
            data: result,
        });
    }

    return files;
}

const getMiroFiles = async(urlList, functionList) => {

    const files = [];

    for(let {name, url} of urlList) {
        const arrayBuffer = await fetch(url).then(res => res.arrayBuffer());
        files.push({
            name,
            data: arrayBuffer,
        });
    }

    for(let {name, func, arg} of functionList) {
        const doc = func().generateMiroPdf(arg);
        let result = doc.output('arraybuffer');
        files.push({
            name,
            data: result,
        });
    }

    return files;
}


const getValueFiles = async(forMiro = false) => {

    const urlList = [
        {
            name: "facilitation_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/values/facilitation-sheets.pdf"
        },
        {
            name: "blank_value_cards.pdf",
            url: "{{site.baseurl}}/assets/pdfs/values/blank-value-cards.pdf"
        },
        {
            name: "value_cards_board.pdf",
            url: "{{site.baseurl}}/assets/pdfs/values/value-cards-board.pdf"
        },
        {
            name: "capture_Sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/values/capture-sheets.pdf"
        }
    ];

    const functionList = [
        {
            name: forMiro ? "value_cards_miro.pdf" : "value_cards.pdf",
            func: valueCardsPDFGenerator,
            arg: valueCardsForPDF,
        },
        {
            name: forMiro ? "lens_cards_miro.pdf" : "lens_cards.pdf",
            func: lensesCardsPDFGenerator,
            arg: lensCardsForPDF
        }
    ];

    const files = forMiro ? await getMiroFiles(urlList, functionList) : await getFiles(urlList, functionList);
    return files;
}

const downloadValueZip = async(forMiro = false) => {
    const files = await getValueFiles(forMiro);
    await downloadZip(files, forMiro ? "value_miro.zip" : "value.zip");
}

const getTeamMembersFiles = async(forMiro = false) => {
    const urlList = [
        {
            name: "facilitation_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/team-members/team-members-facilitation-sheets.pdf"
        },
        {
            name: "capture_Sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/team-members/team-members-capture-sheets.pdf"
        },
        {
            name: "team_members_map.pdf",
            url: "{{site.baseurl}}/assets/pdfs/team-members/team-members-map.pdf"
        }
    ];

    const functionList = [
        {
            name: forMiro ? "role_cards_miro.pdf" : "role_cards.pdf",
            func: roleCardsPDFGenerator,
            arg: roleCardsForPDF
        }
    ];

    const files = forMiro ? await getMiroFiles(urlList, functionList) : await getFiles(urlList, functionList);
    return files;
}

const downloadTeamMembersZip = async(forMiro = false) => {
    const files = await getTeamMembersFiles(forMiro);
    await downloadZip(files, forMiro ? "team_members_miro.zip" : "team_member.zip");
}

const getMoralQualitiesFiles = async(forMiro = false) => {
    const urlList = [
        {
            name: "facilitation_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/moral-qualities/moral-qualities-facilitation-sheets.pdf"
        },
        {
            name: "capture_Sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/moral-qualities/moral-qualities-capture-sheets.pdf"
        }
    ];

    const functionList = [
        {
            name: forMiro ? "moral_qualities_cards_miro.pdf" : "moral_qualities_cards.pdf",
            func: moralQualitiesCardsPDFGenerator,
            arg: moralQualitiesCardsForPDF
        },
        {
            name: forMiro ? "provocation_cards_miro.pdf" : "provocation_cards.pdf",
            func: moralQualitiesProvocationCardsPDFGenerator,
            arg: moralQualitiesProvocationCardsForPDF
        }
    ];

    const files = forMiro ? await getMiroFiles(urlList, functionList) : await getFiles(urlList, functionList);
    return files;
}

const downloadMoralQualitiesZip = async(forMiro = false) => {
    const files = await getMoralQualitiesFiles(forMiro);
    await downloadZip(files, forMiro ? "moral_qualities_miro.zip" : "moral_qualities.zip");
}

const downloadMoralQualitiesJustCardsZip = async(forMiro) => {
    const functionList = [
        {
            name: forMiro ? "moral_qualities_cards_miro.pdf" : "moral_qualities_cards.pdf",
            func: moralQualitiesCardsPDFGenerator,
            arg: moralQualitiesCardsForPDF
        },
        {
            name: forMiro ? "provocation_cards_miro.pdf" : "provocation_cards.pdf",
            func: moralQualitiesProvocationCardsPDFGenerator,
            arg: moralQualitiesProvocationCardsForPDF
        }
    ];

    const files = forMiro ? await getMiroFiles([], functionList) : await getFiles([], functionList);
    await downloadZip(files, forMiro ? "moral_qualities_and_provocation_cards_miro.zip" : "moral_qualities_and_provocation_cards.zip");
}



const getCriticalFriendsFiles = async() => {
    const urlList = [
        {
            name: "critical_friends_map.pdf",
            url: "{{site.baseurl}}/assets/pdfs/critical-friends/critical-friends-map.pdf"
        },
        {
            name: "role_cards.pdf",
            url: "{{site.baseurl}}/assets/pdfs/critical-friends/critical-friends-role-cards.pdf"
        },
        {
            name: "milestones_map.pdf",
            url: "{{site.baseurl}}/assets/pdfs/critical-friends/critical-friends-milestones-map.pdf"
        },
        {
            name: "facilitation_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/critical-friends/critical-friends-facilitation-sheets.pdf"
        },
    ];

    const functionList = [];

    const files = await getFiles(urlList, functionList);
    return files;
}

const downloadCriticalFriendsZip = async() => {
    const files = await getCriticalFriendsFiles();
    await downloadZip(files, "critical_friends.zip");
}

const getConsentFiles = async(forMiro = false) => {
    const urlList = [
        {
            name: "consent_postcards.pdf",
            url: "{{site.baseurl}}/assets/pdfs/consent/consent-postcards.pdf"
        },
        {
            name: "capture_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/consent/consent-capture-sheets.pdf"
        },
        {
            name: "facilitation_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/consent/consent-facilitation-sheets.pdf"
        },
    ];

    const functionList = [
        {
            name: forMiro ? "methods_cards_miro.pdf" : "methods_card.pdf",
            func: methodsCardsPDFGenerator,
            arg: methodsCardsForPDF
        },
        {
            name: forMiro ? "outcome_cards_miro.pdf" : "outcome_cards.pdf",
            func: outcomeCardsPDFGenerator,
            arg: outputCardsForPDF
        }
    ];

    const files = forMiro ? await getMiroFiles(urlList, functionList) : await getFiles(urlList, functionList);
    return files;
}

const downloadConsentZip = async(forMiro = false) => {
    const files = await getConsentFiles(forMiro);
    await downloadZip(files, forMiro ? "consent_miro.zip" : "consent.zip");
}

const getProvocationsFiles = async(forMiro = false) => {
    const urlList = [
        {
            name: "capture_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/provocations/provocations-capture-sheets.pdf"
        },
        {
            name: "facilitation_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/provocations/provocations-facilitation-sheets.pdf"
        },
    ];

    const functionList = [
        {
            name: forMiro ? "provocation_cards_miro.pdf" : "provocation_cards.pdf",
            func: provocationCardsPDFGenerator,
            arg: provocationCardsForPDF
        },
    ];

    const files = forMiro ? await getMiroFiles(urlList, functionList) : await getFiles(urlList, functionList);
    return files;
}

const downloadProvocationsZip = async(forMiro = false) => {
    const files = await getProvocationsFiles(forMiro);
    await downloadZip(files, forMiro ? "provocations_miro.zip" : "provocations.zip");
}

const getWarpWerfFiles = async() => {
    const urlList = [
        {
            name: "strips.pdf",
            url: "{{site.baseurl}}/assets/pdfs/warp-&-weft/warp-&-weft-strips.pdf",
        },
        {
            name: "capture_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/warp-&-weft/warp-&-weft-capture-sheets.pdf"
        },
        {
            name: "facilitation_sheets.pdf",
            url: "{{site.baseurl}}/assets/pdfs/warp-&-weft/warp-&-weft-facilitation-sheets.pdf"
        },
    ];

    const functionList = [];

    const files = await getFiles(urlList, functionList);
    return files;
}

const downloadWarpWerfZip = async() => {
    const files = await getWarpWerfFiles();
    await downloadZip(files, "warpwerf.zip");
}

const addFilesToFolderZip = async(zip, folderName, files) => {
    const folder = zip.folder(folderName);
    for(let {name, data} of files) {
        folder.file(name, data);
    }
    return zip;
}

const downloadAllZip = async(forMiro = false) => {

    let zip = new JSZip();

    //Glossary
    const url = "{{site.baseurl}}/assets/pdfs/glossary/glossary-of-terms-a3-folded.pdf";
    const arrayBuffer = await fetch(url).then(res => res.arrayBuffer());
    zip.file("glossary.pdf", arrayBuffer);

    const valuesFiles = await getValueFiles(forMiro);
    zip = await addFilesToFolderZip(zip, "values", valuesFiles);

    const teamMembersFiles = await getTeamMembersFiles(forMiro);
    zip = await addFilesToFolderZip(zip, "team members", teamMembersFiles);

    const moralQualitiesFiles = await getMoralQualitiesFiles(forMiro);
    zip = await addFilesToFolderZip(zip, "moral qualities", moralQualitiesFiles);

    const criticalFriendsFiles = await getCriticalFriendsFiles(forMiro);
    zip = await addFilesToFolderZip(zip, "critial friends", criticalFriendsFiles);

    const consentFiles = await getConsentFiles(forMiro);
    zip = await addFilesToFolderZip(zip, "consent", consentFiles);

    const provocationsFiles = await getProvocationsFiles(forMiro);
    zip = await addFilesToFolderZip(zip, "provocations", provocationsFiles);

    const warpWerfFiles = await getWarpWerfFiles(forMiro);
    zip = await addFilesToFolderZip(zip, "warp and werf", warpWerfFiles);

    const content = await zip.generateAsync({type:"blob"});
    saveAs(content, forMiro ? "ethical-roadmap-miro.zip" : "ethical-roadmap.zip") ;

}

let downloading = false;

const downloadAll = async (forMiro = false, func) => {

    if(downloading) return;

    downloading = true;

    const id = forMiro ? "mda" : "pda";

    const aLink = document.getElementById(id);
    const text = aLink.innerText;

    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('button--loading');
    loaderDiv.style.height = '18px';

    while (aLink.firstChild) {
        aLink.removeChild(aLink.lastChild);
    }

    aLink.append(loaderDiv);

    await func(forMiro);

    const downloadText = document.createTextNode(text);

    while (aLink.firstChild) {
        aLink.removeChild(aLink.lastChild);
    }

    aLink.append(downloadText);
    
    downloading = false;
}
