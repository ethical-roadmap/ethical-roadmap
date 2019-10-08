---
---

function createPage() {

    var container = document.getElementById('feedback-container');
    
    if(isLoggedIn()) {

        var categorySection = document.createElement('div');
        categorySection.classList.add('category-section');
        container.appendChild(categorySection);

        var categoryCard = document.createElement('div');
        categoryCard.classList.add('category-card-big');
        categoryCard.classList.add('sh-2');
        container.appendChild(categoryCard);
    
        var header = document.createElement('div');
        header.classList.add('category-primary-header');
        header.style = 'background: #5b7385;';
        header.innerHTML = 'Give us your feedback'
        categoryCard.appendChild(header);

        var row = document.createElement('div');
        row.classList.add('category-content-row');
        categoryCard.appendChild(row);
        
        var column = document.createElement('div');
        column.classList.add('category-content-1-column');
        column.style = 'width: 100%;';
        row.appendChild(column);

        var left = document.createElement('div');
        left.style = 'text-align:left';
        column.appendChild(left);

        var form = document.createElement('form');
        form.id = 'feedbackform';
        form.style = 'width: 100%;';
        left.appendChild(form);

        var subjectDiv = document.createElement('div');
        form.appendChild(subjectDiv);

        var subjectLabel = document.createElement('label');
        subjectLabel.for = 'subject';
        subjectLabel.innerHTML = 'Subject:'
        subjectDiv.appendChild(subjectLabel)

        var subjectInput = document.createElement('input');
        subjectInput.id = 'subject';
        subjectInput.type = 'text';
        subjectInput.name = 'subject';
        subjectInput.style = 'width: 100%; margin-top: 5px; font-size: 20px';
        subjectDiv.appendChild(subjectInput);

        var br = document.createElement('br');
        form.appendChild(br)

        var bodyDiv = document.createElement('div');
        form.appendChild(bodyDiv);

        var bodyLabel = document.createElement('label');
        bodyLabel.for = "body";
        bodyLabel.innerHTML = 'Body:'
        bodyDiv.appendChild(bodyLabel)

        var bodyInput = document.createElement('textarea');
        bodyInput.id = 'body';
        bodyInput.name = 'body';
        bodyInput.form = 'feedbackform';
        bodyInput.style= 'width: 100%; margin-top: 5px; height: 450px; font-size: 13px; border-color: lightgrey;';
        bodyInput.placeholder = 'Enter text here...';
        bodyDiv.appendChild(bodyInput);

        var buttonDiv = document.createElement('div');
        buttonDiv.style = 'text-align: right; width: 100%; padding-bottom: 20px;'
        form.appendChild(buttonDiv);

        var button = document.createElement('a');
        button.classList.add('download-button');
        button.style = 'margin-right: -7px;';
        button.href = 'javascript:sendFeedback()';
        button.innerHTML = 'Send Feedback';
        buttonDiv.appendChild(button)
        
    } else  {

        var cardList = document.createElement('div');
        cardList.classList.add('card-list');
        cardList.style = 'margin-top: 20px; margin-bottom: 20px;';
        container.appendChild(cardList);

        var loginContainer = document.createElement('div');
        loginContainer.id = 'login-container';
        loginContainer.style = 'background: white; border-radius: 12px; width: 300px; padding-top: 30px;';
        cardList.appendChild(loginContainer);

        var loginContainerHeader = document.createElement('div');
        loginContainerHeader.id = 'login-container-header';
        loginContainerHeader.style = 'padding-bottom: 10px;';
        loginContainer.appendChild(loginContainerHeader);

        var loginImage = document.createElement('img');
        loginImage.src='{{site.baseurl}}/assets/images/GitHub_Logo.png';
        loginImage.style='width:90%; height: auto;';
        loginContainerHeader.appendChild(loginImage);

        var loginContainerBody = document.createElement('div');
        loginContainerBody.id = 'login-container-body';
        loginContainerBody.style = 'padding-left: 30px; padding-right: 30px';
        loginContainer.appendChild(loginContainerBody);

        var loginForm = document.createElement('form');
        loginContainerBody.appendChild(loginForm);

        var usernameInput = document.createElement('input');
        usernameInput.id = 'username';
        usernameInput.type = 'text';
        usernameInput.value = '';
        usernameInput.placeholder = 'Username/E-Mail';
        usernameInput.style = 'width: 100%; font-size: 18px; margin-bottom: 12px;';
        loginForm.appendChild(usernameInput);
        
        var passwordInput = document.createElement('input');
        passwordInput.id = 'password';
        passwordInput.type = 'password';
        passwordInput.value = '';
        passwordInput.placeholder = 'Password';
        passwordInput.style = 'width: 100%; font-size: 18px; margin-bottom: 22px;';
        loginForm.appendChild(passwordInput);

        var loginInfo = document.createElement('div');
        loginInfo.id = 'login_info';
        loginContainerBody.appendChild(loginInfo);

        var loginContainerFooter1 = document.createElement('div');
        loginContainerFooter1.id = 'login-container-footer-1';
        loginContainer.appendChild(loginContainerFooter1);

        var loginInput = document.createElement('input');
        loginInput.type = 'button';
        loginInput.value = 'LOG IN';
        loginInput.addEventListener("click", function() { login('{{site.baseurl}}/en/feedback') });
        loginInput.style = 'color: black; border: none; background: none; height: 60px; width: 100%; border-top-style: solid; border-bottom-style: solid; border-color: lightgray; border-width: 1px; font-size: 14px;font-weight: 400;font-family: Calibri;';
        loginContainerFooter1.appendChild(loginInput);

        var orDiv = document.createElement('div');
        orDiv.style = 'font-size: 12px; font-weight: 400; font-family: Calibri';
        orDiv.innerHTML = 'or';
        loginContainer.appendChild(orDiv);

        var loginContainerFooter2 = document.createElement('div');
        loginContainerFooter1.id = 'login-container-footer-2';
        loginContainer.appendChild(loginContainerFooter2);

        var registerDiv = document.createElement('div');
        registerDiv.style = 'text-align: center; width: 100%; padding-bottom: 20px; padding-top: 20px; border-top-style: solid; border-color: lightgray; border-width: 1px;';
        loginContainerFooter2.appendChild(registerDiv);

        var registerInput = document.createElement('a');
        registerInput.href = 'https://github.com/join';
        registerInput.target = '_blank';
        registerInput.rel = 'noopener noreferrer';
        registerInput.style = 'border: none;background: none;color: black;width: 100%;display: inline-block;text-decoration: none;font-size: 14px;font-weight: 400;font-family: Calibri;';
        registerInput.innerHTML = 'REGISTER';
        registerDiv.appendChild(registerInput);
    }
}

function sendFeedback() {
   var subject =  document.getElementById('subject').value.trim()
   var body = document.getElementById('body').value.trim()
    if(subject != '' && body != '') {
        submitFeedback(subject, body).then((data) => {
            console.log(data)
            if(data == true) {
                alert("Thank you for your feedback!");
                window.location.replace("{{site.baseurl}}/");
            } else {
                alert("Thank something went wrong!");
            }
        });
    } else {
      alert("All fields are required!");
    }
}

