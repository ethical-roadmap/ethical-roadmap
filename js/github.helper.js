---
---

function login(url) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    let auth = btoa(username + ":" + password);
    getPreviousAuthorizarion(auth, username, url);
}

function getPreviousAuthorizarion(auth, username, url) {
    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/authorizations',
        headers: { 
            Authorization: 'Basic ' + auth,
            Accept: 'application/json'
        },
        dataType: 'json',
        success: function(data) {
            var authId = null;
            for(var i = 0; i < data.length && authId == null; i++) {
                if(data[i].note == "ethical roadmap access") 
                    authId = data[i].id;
            }
            if(authId != null) 
                deleteAuthorization(auth, authId, username, url)
            else 
                getNewAuthorization(auth, username, url) 
        
        },
        error: function(data) {
            console.log("Login failed");
            var s = document.createElement('div');
            s.id = "login_failed"
            s.innerText = "Login failed";
            s.style = ""
            if(document.getElementById("login_info") != null && document.getElementById("login_failed") == null) 
                document.getElementById("login_info").appendChild(s);
        }
    });
}

function deleteAuthorization(auth, authId, username, url) {
    $.ajax({
        type: 'DELETE',
        url: 'https://api.github.com/authorizations/'+ authId,
        headers: { 
            Authorization: 'Basic ' + auth,
            Accept: 'application/json'
        },
        dataType: 'json',
        success: function(data) {
            getNewAuthorization(auth, username, url);
        },
        error: function(data) {
            console.log("Login failed");
            var s = document.createElement('div');
            s.innerText = "Login failed";
            if(document.getElementById("login_info") != null)
                document.getElementById("login_info").appendChild(s);
        }
    });
}

function getNewAuthorization(auth, username, url) {
    $.ajax({
        type: 'POST',
        url: 'https://api.github.com/authorizations',
        headers: { 
            Authorization: 'Basic ' + auth,
            Accept: 'application/json'
        },
        dataType: 'json',
        data: JSON.stringify({
                "scopes": [
                    "repo",
                    
                ],
                "note": "ethical roadmap access"
            }),
        success: function(data) {
            if (typeof(Storage) !== "undefined") {
                console.log(data);
                sessionStorage.setItem("_u", username);
                sessionStorage.setItem("_t", data.token);
                sessionStorage.setItem("isLoggedIn", true);
                console.log("Login successful");
                window.location.replace(url);
            } else {
                var s = document.createElement('div');
                s.innerText = "Sorry, your browser does not support Web Storage...";
                document.getElementById("login_info").appendChild(s);
            }
        },
        error: function(data) {
            console.log("Login failed");
            var s = document.createElement('div');
            s.innerText = "Login failed";
            if(document.getElementById("login_info") != null)
                document.getElementById("login_info").appendChild(s);
            sessionStorage.setItem("isLoggedIn", false);
        }
    });
}

function isLoggedIn(){
    return (
                (typeof(Storage) !== "undefined") && 
                (sessionStorage.getItem('isLoggedIn') != null) &&
                (sessionStorage.getItem('isLoggedIn') == 'true') &&
                (sessionStorage.getItem('_u') != null) && 
                (sessionStorage.getItem('_t') != null)
           );
}

function getGitHubHelper() {
    return isLoggedIn() ? new GitHub({username: sessionStorage.getItem('_u'), token: sessionStorage.getItem('_t')}) : null;
}


function packNavigationLogin(lang) {
    var gh = getGitHubHelper();
    console.log(gh);
    if(gh != null) {

        gh.getUser().getProfile().then((data) => {

            var loggedInContainerBig = document.createElement('div');
            loggedInContainerBig.style = "color: black; display: flex; align-items: center; justify-content: center;";
            
            var usernameSpan = document.createElement('span');
            usernameSpan.innerText = `Hi ${data.data.name}!`;
            usernameSpan.style = "font-family: Calibri;"
            loggedInContainerBig.appendChild(usernameSpan);

            var logoutButtonBig = document.createElement('button');
            logoutButtonBig.style = "color: black; background: none; border: none; padding 0px; cursor: pointer;";
            logoutButtonBig.title = 'Logout';
            logoutButtonBig.addEventListener("click", logout);
            loggedInContainerBig.appendChild(logoutButtonBig);

            var logoutImg = document.createElement('img');
            logoutImg.src = '{{site.baseurl}}/assets/images/logout.png';
            logoutImg.setAttribute('width', '20px');
            logoutImg.setAttribute('height', '20px');
            logoutButtonBig.appendChild(logoutImg);

            var headerBig = document.getElementById('login-header-big');
            headerBig.style.width = 'auto';
            headerBig.appendChild(loggedInContainerBig);

            document.getElementById('login-header-small').appendChild(loggedInContainerBig.cloneNode(true));
        });

    } else {

        var loginButtonBig = document.createElement('a');
        loginButtonBig.href = `{{site.baseurl}}/${lang}/login`;
        document.getElementById('login-header-big').appendChild(loginButtonBig);

        var loginImgBig = document.createElement('img');
        loginImgBig.src = "{{site.baseurl}}/assets/images/login.png";
        loginImgBig.alt = "Login";
        loginImgBig.title = "Login";
        loginImgBig.style.width = "100%"; 
        loginButtonBig.appendChild(loginImgBig);

        var loginButtonSmall = document.createElement('a');
        loginButtonSmall.href = `{{site.baseurl}}/${lang}/login`;
        loginButtonSmall.style.color = 'black';
        document.getElementById('login-header-small').appendChild(loginButtonSmall);

        var loginButtonSmallContainer = document.createElement('div');
        loginButtonSmallContainer.style = "display: flex; align-items: center; height: 100%; text-align: center; justify-content:center;"
        loginButtonSmall.appendChild(loginButtonSmallContainer);

        var loginImgSmall = document.createElement('img');
        loginImgSmall.src = src="{{site.baseurl}}/assets/images/login.png";
        loginImgSmall.alt = "Login";
        loginImgSmall.title = "Login";
        loginImgSmall.style.height = "100%"; 
        loginButtonSmallContainer.appendChild(loginImgSmall);

        var loginSpan = document.createElement('span');
        loginSpan.innerText = "Login";
        loginSpan.style.paddingLeft = "5px";
        loginButtonSmallContainer.appendChild(loginSpan);

    }
}

function logout() {
    sessionStorage.removeItem('_u');
    sessionStorage.removeItem('_t');
    sessionStorage.setItem("isLoggedIn", false);
    window.location.replace("{{site.baseurl}}/");
}

function valueCardFileContent(ref, lang, sequence, name) {
    return  (
`---
ref: ${ref}
lang: ${lang}
sequence: ${sequence}
name: ${name}
---`);
}

function writeValueCard(lang, text) {
 
    var filename = text.split(' ').join('-');

    let langFolder;
    if(lang == 'en') {
        langFolder='english'; 
    } 
 
    var path = `_value_cards/${langFolder}/${filename}.md`;
    var sequence = document.getElementsByClassName('value-card').length - 1;

    getAuthorization().getRepo('lapc1995', 'ethical-roadmap')
        .writeFile('gh-pages', 
                    path, 
                    valueCardFileContent(filename, lang, sequence, text), 
                    `Added new value card ${path}`,
                    { encode: true }).then((data) => {
                        console.log(data);
                    }).catch((data) => {
                        console.log(data);
                    });
}

function roleCardFileContent(ref, lang, sequence, name, subname, contributions, type) {
    var formatedContributions = '';
    for(var i = 0; i < contributions.length; i++) {
        formatedContributions += `- ${contributions[i]}
`
    }

    return (
`---
ref: ${ref}
lang: ${lang}
sequence: ${sequence}
name: ${name}
subname: ${subname}
contribution:
${formatedContributions}
type: ${type}
---`);        
}

function writeRoleCard(lang, name, subname, contributions, type) {
    var filename = name.split(' ').join('-');

    let langFolder;
    if(lang == 'en') {
        langFolder='english'; 
    } 
 
    var path = `_value_cards/${langFolder}/${filename}.md`;
    var sequence = document.getElementsByClassName('flip-card').length + 1;

    getAuthorization().getRepo('lapc1995', 'ethical-roadmap')
        .writeFile('gh-pages', 
                    path, 
                    roleCardFileContent(filename, lang, sequence, name, subname, contributions, type), 
                    `Added new role card ${path}`,
                    { encode: true }).then((data) => {
                        console.log(data);
                    }).catch((data) => {
                        console.log(data);
                    });
}


function testFileWritting() {
    getAuthorization().getRepo('lapc1995', 'ethical-roadmap').writeFile('gh-pages', 
                                                                        '_value_cards/english/test1.md', 
                                                                        'why', 
                                                                        'test',
                                                                        {
                                            
                                                                            encode: true
                                                                        }).then((data) => {
        console.log(data);
    }).catch((data) => {
        console.log(data);
    });

}

function textareaAutoGrow(element, size) {
    element.style.height = size+"px";
    element.style.height = (element.scrollHeight)+"px";
}

async function submitFeedback(subject, body) {
    return new Promise(resolve => { 
        var gh = getGitHubHelper();
        if(gh != null) {
            var issue = {
                "title": subject,
                "body": body
            }
            var issuesHelper = gh.getIssues('ethical-roadmap', 'ethical-roadmap')
            issuesHelper.createIssue(issue).then((data) => {
                resolve(true);
            }).catch((data) => {
                resolve(false);
            });
        } 
    })
}

  

