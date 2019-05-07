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
                "public_repo"
                ],
                "note": "ethical roadmap access"
            }),
        success: function(data) {
            if (typeof(Storage) !== "undefined") {
                console.log(data);
                sessionStorage.setItem("_u", username);
                sessionStorage.setItem("_t", data.token);
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
        }
    });
}


function getAuthorization() {
    if(sessionStorage.getItem('_u') == null && sessionStorage.getItem('_t') == null) {
        return null;
    } else {
        return new GitHub({
                    username: sessionStorage.getItem('_u'),
                    token: sessionStorage.getItem('_t')
                });
    }
}

function isLoggedIn() {
    var gh = getAuthorization();
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
    window.location.replace("{{site.baseurl}}/");
}



  

