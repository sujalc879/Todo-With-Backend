async function getUserInformation() {
    let fetchData = await fetch("http://localhost:3001/todos", {
        method : "GET",
        "Content-Type" : "application/json",
        headers : {
            token : localStorage.getItem("token")
        }
    });

    await fetchData;
    
    window.location.href = "index.html";
}
getUserInformation()

async function signUp() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    let fetchData = await fetch("http://localhost:3001/signup", {
        "method" : "POST",
        "headers" : {
            "Content-Type" : "application/json",
        },
        "body" : JSON.stringify({
            username : username.value,
            password : password.value
        })
    })

    await fetchData;

    username.value = "";
    password.value = "";

   // alert("you are signup");
}

async function signIn() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    
    try {
    let fetchData = await fetch("http://localhost:3001/signin", {
        "method" : "POST",
        "headers" : {
            "Content-Type" : "application/json",
        },
        "body" : JSON.stringify({
            username : username.value,
            password : password.value
        })
    })

    let response = await fetchData.json();

    if (fetchData.ok) {
        localStorage.setItem("token", `${response.token}`)
        window.location.href = "index.html";
    } else {
        alert("invalid id or password")
    }
    
    
    } catch (error) {
        console.log("the error is " + error);
    }

    // alert("you are signin");
}