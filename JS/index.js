window.addEventListener("load", () => {
    let userData = sessionStorage.getItem("currentUser");

    if (!userData){
        window.location.href = "login.html";  
        return;
    }
    
    let user = JSON.parse(userData);

    let displayUser = document.getElementById("displayUser");
    displayUser.innerHTML = `
        <span><strong>مرحباً  </strong>${user.name}</span>
        <span><strong>العمر  </strong>${user.age}</span>
        <span><strong>الايميل   </strong>${user.email}</span>
    `
});

const exitBtn = document.getElementById("exit");

exitBtn.addEventListener("click", () => {

    sessionStorage.removeItem("currentUser");


});
