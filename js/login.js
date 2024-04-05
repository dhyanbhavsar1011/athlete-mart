document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const userSection = document.getElementById("userSection");

  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (loggedInUser) {
    userSection.textContent = `Welcome, ${loggedInUser}!`;
    const logoutButton = document.createElement("button");
    logoutButton.style.marginLeft = "10px";
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("loggedInUser");
      window.location.reload(); // Reload the page to update header
    });
    userSection.appendChild(logoutButton);
  } else {
    const loginButton = document.createElement("button");
    loginButton.textContent = "Login";
    loginButton.setAttribute("href", "account.html");
    loginButton.addEventListener("click", function () {
      // Redirect to login page or show login form
      window.location.href = "account.html";
    });
    userSection.appendChild(loginButton);
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    // Retrieve registered users from local storage
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Registered Users:", registeredUsers);

    // Check if provided username and password match any registered user
    const user = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Authentication successful, set session
      sessionStorage.setItem("loggedInUser", username);
      alert("Login Successfull");
      window.location.reload(); // Reload the page to update header
    } else {
      alert("Invalid username or password");
    }
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("email").value; // Changed to email input
    const password = document.getElementById("cpassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Your registration logic here (Example: storing user in local storage)
    const newUser = {
      name: name,
      username: username, // Changed to username
      password: password,
    };

    // Retrieve existing registered users from local storage
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if a user with the same username already exists
    const existingUser = registeredUsers.find(
      (user) => user.username === username
    );
    if (existingUser) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Add the new user to the array of registered users
    registeredUsers.push(newUser);

    // Update the registered users data in local storage
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    alert("Registration successful");

    window.location.reload(); // Reload the page to update header
  });
});
