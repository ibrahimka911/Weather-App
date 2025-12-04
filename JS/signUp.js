const validator = new JustValidate('#form', {
    validateBeforeSubmitting: true,
    errorLabelCssClass: 'is-label-valid',
    errorLabelStyle: {
    border: "1px solid #B81111",
    borderRadius: "10px", 
    color: "red",
    padding: "5px"}
});

validator 
    .addField('#name', [
        {
            rule: 'required',
            errorMessage: 'الاسم مطلوب',
        },
        {
            rule: 'minLength',
            value: 12,
            errorMessage: 'يجب ادخال الاسم الكامل',
        },
        {
            rule: 'customRegexp',
            value: /^[\u0600-\u06FFa-zA-Z\s]+$/,
            errorMessage: 'يجب ان يتكون الاسم من احرف فقط',
        },
    ])
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'الايميل  مطلوب',
        },
        {
            rule: 'email',
            errorMessage: 'يجب ادخال ايميل صحيح',
        },
    ])
    .addField('#age', [
        {
            rule: 'required',
            errorMessage: 'العمر مطلوب',
        },        
        {
            rule: 'customRegexp',
            value: /^[0-9]+$/,
            errorMessage: 'يسمح بإدخال أرقام فقط',
        },
        {
            rule: 'minNumber',
            value: 10,
            errorMessage: 'يجب ان لا يقل العمر عن 10',
        },
        {
            rule: 'maxNumber',
            value: 100,
            errorMessage: 'يجب ان لا يتجاوز العمر  100',
        },
    ])
    .addField('#password', [
        {
            rule: 'required',
            errorMessage: 'كلمة المرور مطلوبة ',
        },
        {
            rule: 'customRegexp',
            value: /^[A-Za-z0-9]{6,}$/,
            errorMessage: 'يجب الا تقل كلمة المرور عن 6 احرف',
        },
    ])
    .onSuccess(() => {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let age = document.getElementById("age").value;
        let password = document.getElementById("password").value;
        
        let users = JSON.parse(localStorage.getItem("users"));
        if (users === null) {
            users = [];
        }
        
        const foundUser = users.find((user) => user.email == email);
        if (foundUser) {
            let checkMsg = document.getElementById("errorMsg");
            checkMsg.style.display = "block";
            checkMsg.textContent  = "الايميل المدخل مسجل سابقاً";
            return;
        } 
        else {
            let user = {
                id: users.length, 
                name: name, 
                email: email, 
                age: age, 
                password: password,
            };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
        };
        window.location.href = "login.html";  
    })