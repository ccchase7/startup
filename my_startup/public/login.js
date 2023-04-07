async function loginUser() {
    loginOrCreate(`/api/auth/login`, login);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`, register);
  }
  
  async function loginOrCreate(endpoint, startAction) {
    const userName = document.querySelector('#username-textbox')?.value;
    const password = document.querySelector('#password-textbox')?.value;

    //Checks that username / password are not empty
    ready = startAction();
    document.getElementById("login-register-message").textContent = ready[1];

    if (!(ready[0]))
    {
        return;
    }

    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const body = await response.json();
  
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      //unhide the page
      initialSetup(true);
    } else {
        
    }
  }

  
async function loginFromEnter(event)
{
    if ((event.keyCode === 13)) {
        await loginUser();
    }
}

async function login()
{
    document.getElementById("login-register-message").textContent = "Logging in...";

    let resp = await processUsernamePassword();
    if (!resp[0])
    {
        return resp;
    }

    return [true, "Logging in..."];
}

async function register()
{
    document.getElementById("login-register-message").textContent = "Registering";
    //Process Login here
    let resp = await processUsernamePassword();
    if (!resp[0])
    {
        return resp;
    }

    return [true, "Registering..."];
}

function logout()
{
    document.getElementById("login-register-message").textContent = "Please login / register to continue.";
    initialSetup(false);
}

function initialSetup(on_off)
{
    document.getElementById("login-register-message").hidden = on_off;
    document.getElementById("login-register-buttons").hidden = on_off;
    document.getElementById("logout").hidden = !on_off;
    document.getElementById("everything").hidden = !on_off;

    if(on_off)
    {
        document.getElementById("main-title").style.textAlign = "center";
    }
    else
    {
        document.getElementById("username-textbox").value = "";
        document.getElementById("password-textbox").value = "";
        document.getElementById("main-title").style.textAlign = "right";
    }
    
}

async function processUsernamePassword()
{
    const usernameBox = document.getElementById("username-textbox");
    const passwordBox = document.getElementById("password-textbox");

    let username = usernameBox.value;
    let password = passwordBox.value;

    if ((username === "") || (password === ""))
    {
        return [false, "Username and Password must not be empty."];
    }

    return [true];

}
