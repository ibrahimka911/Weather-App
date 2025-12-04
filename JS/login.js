const validator = new JustValidate('#form', {
    validateBeforeSubmitting: true,
    errorLabelCssClass: 'is-label-valid',
    errorLabelStyle: {
        border: "1px solid #B81111",
        borderRadius: "10px", 
        color: "red",
        padding: "5px",
        margin: "5px",
    }
});
validator 
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
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let errorMsg = document.getElementById("errorMsg");
        
        let Users = JSON.parse(localStorage.getItem("users"));

        if (!Users) {
            errorMsg.textContent  = "لا يوجد مستخدمون مسجلون، الرجاء إنشاء حساب اولاً";
            errorMsg.style.display = "block";
            return;
        }
        else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        };

        let matchUser = Users.find(user => user.email === email && user.password === password);

        if (!matchUser) {
            errorMsg.textContent  = "الايميل او كلمة المرور غير صحيحة";
            errorMsg.style.display = "block";
            return;
        }
        else {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
            let currentUser = {
                id: matchUser.id,
                name: matchUser.name,
                email: matchUser.email,
                age: matchUser.age,
            };
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        };
        window.location.href = "./index.html";  
});

