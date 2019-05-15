---
---

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    let auth = btoa(username + ":" + password);
    getPreviousAuthorizarion(auth, username);
}

function getPreviousAuthorizarion(auth, username) {
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
                deleteAuthorization(auth, authId, username)    
        
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

function deleteAuthorization(auth, authId, username) {
    $.ajax({
        type: 'DELETE',
        url: 'https://api.github.com/authorizations/'+ authId,
        headers: { 
            Authorization: 'Basic ' + auth,
            Accept: 'application/json'
        },
        dataType: 'json',
        success: function(data) {
            getNewAuthorization(auth, username);
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

function getNewAuthorization(auth, username) {
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
                window.location.replace("{{site.baseurl}}/");
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


function packNavigationLogin() {
    var gh = getGitHubHelper();
    console.log(gh);
    if(gh != null) {
        gh.getUser().getProfile().then((data) => {
            var username = document.createElement('div');
            username.innerText = data.data.name;
            document.getElementById("login-user").appendChild(username);

            var logoutButton = document.createElement('button');
            logoutButton.innerText = "Logout";
            logoutButton.style = "color: black;"
            document.getElementById("login-user").appendChild(logoutButton);
            logoutButton.addEventListener("click", logout);
        });
    } else {
        var loginButton = document.createElement('a');
        loginButton.innerText = "Login";
        loginButton.href = "{{site.baseurl}}/en/login/";
        loginButton.style = "color: black;"
        document.getElementById("login-user").appendChild(loginButton);
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

  

