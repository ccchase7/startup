class LoginHelper
{
    msgElement;
    usernameBox;
    passwordBox;
    
    constructor()
    {
        this.msgElement = document.getElementById("login-register-message");
        this.usernameBox = document.getElementById("username-textbox");
        this.passwordBox = document.getElementById("password-textbox");
    }

    async loginFromEnter(event)
    {
        if ((event.keyCode === 13)) {
            await this.login();
        }
    }

    async login()
    {
        this.setMessage("Logging in...");
        if (this.validateUsernamePassword())
        {
            await this.loginOrCreate(`/api/auth/login`);
        }
    }

    async register()
    {
        this.setMessage("Registering...");
        if(this.validateUsernamePassword())
        {
            await this.loginOrCreate(`/api/auth/create`);
        }
    }

    async loginOrCreate(endpoint) {
        let userName = this.usernameBox.value;
        let password = this.passwordBox.value;

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
          this.initialSetup(true);
        } else {
          this.setMessage(body.msg)
        }
      }

    logout()
    {
        fetch(`/api/auth/logout`, {
            method: 'delete',
          }).then(() => {
            localStorage.setItem('userName', "");
            this.setMessage("Please login / register to continue.");
            this.initialSetup(false);
          });
    }

    async validateUsernamePassword()
    {
        let username = this.usernameBox.value;
        let password = this.passwordBox.value;

        if ((username === "") || (password === ""))
        {
            setMessage("Username and Password must not be empty.");
            return false;
        }

        return true;
    }

    initialSetup(on_off)
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

    setMessage(msg)
    {
        this.msgElement.textContent = msg;
    }  
}

const loginHelper = new LoginHelper();
