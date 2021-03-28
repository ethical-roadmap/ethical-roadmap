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


const getValueFiles = async() => {

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
            name: "value_cards.pdf",
            func: valueCardsPDFGenerator,
            arg: valueCardsForPDF,
        },
        {
            name: "lens_cards.pdf",
            func: lensesCardsPDFGenerator,
            arg: lensCardsForPDF
        }
    ];

    const files = await getFiles(urlList, functionList);
    return files;
}

const downloadValueZip = async() => {
    const files = await getValueFiles();
    downloadZip(files, "value.zip");
}

const getTeamMembersFiles = async() => {
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
            name: "role_cards.pdf",
            func: roleCardsPDFGenerator,
            arg: roleCardsForPDF
        }
    ];

    const files = await getFiles(urlList, functionList);
    return files;
}

const downloadTeamMembersZip = async() => {
    const files = await getTeamMembersFiles();
    downloadZip(files, "team_members.zip");
}

const getMoralQualitiesFiles = async() => {
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
            name: "moral_qualities_cards.pdf",
            func: moralQualitiesCardsPDFGenerator,
            arg: moralQualitiesCardsForPDF
        },
        {
            name: "provocation_cards.pdf",
            func: moralQualitiesProvocationCardsPDFGenerator,
            arg: moralQualitiesProvocationCardsForPDF
        }
    ];

    const files = await getFiles(urlList, functionList);
    return files;
}

const downloadMoralQualitiesZip = async() => {
    const files = await getMoralQualitiesFiles();
    downloadZip(files, "moral_qualities.zip");
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
    downloadZip(files, "critical_friends.zip");
}

const getConsentFiles = async() => {
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
            name: "methods_cards.pdf",
            func: methodsCardsPDFGenerator,
            arg: methodsCardsForPDF
        },
        {
            name: "outcome_cards.pdf",
            func: outcomeCardsPDFGenerator,
            arg: outputCardsForPDF
        }
    ];

    const files = await getFiles(urlList, functionList);
    return files;
}

const downloadConsentZip = async() => {
    const files = await getConsentFiles();
    downloadZip(files, "consent.zip");
}

const getProvocationsFiles = async() => {
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
            name: "provocation_cards.pdf",
            func: provocationCardsPDFGenerator,
            arg: provocationCardsForPDF
        },
    ];

    const files = await getFiles(urlList, functionList);
    return files;
}

const downloadProvocationsZip = async() => {
    const files = await getProvocationsFiles();
    downloadZip(files, "provocations.zip");
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
    downloadZip(files, "warpwerf.zip");
}

const addFilesToFolderZip = async(zip, folderName, files) => {
    const folder = zip.folder(folderName);
    for(let {name, data} of files) {
        folder.file(name, data);
    }
    return zip;
}

const downloadAllZip = async() => {

    let zip = new JSZip();

    const valuesFiles = await getValueFiles();
    zip = await addFilesToFolderZip(zip, "values", valuesFiles);

    const teamMembersFiles = await getTeamMembersFiles();
    zip = await addFilesToFolderZip(zip, "team members", teamMembersFiles);

    const moralQualitiesFiles = await getMoralQualitiesFiles();
    zip = await addFilesToFolderZip(zip, "moral qualities", moralQualitiesFiles);

    const criticalFriendsFiles = await getCriticalFriendsFiles();
    zip = await addFilesToFolderZip(zip, "critial friends", criticalFriendsFiles);

    const consentFiles = await getConsentFiles();
    zip = await addFilesToFolderZip(zip, "consent", consentFiles);

    const provocationsFiles = await getProvocationsFiles();
    zip = await addFilesToFolderZip(zip, "provocations", provocationsFiles);

    const warpWerfFiles = await getWarpWerfFiles();
    zip = await addFilesToFolderZip(zip, "warp and werf", warpWerfFiles);

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, filename);
    });

}