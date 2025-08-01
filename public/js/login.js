document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("form");
const username = form.username;
const password = form.password;
  
    // Toggle password visibility
const toggleBtn = document.createElement("button");
toggleBtn.type = "button";
toggleBtn.textContent = "👁 Show Password";
toggleBtn.style.marginLeft = "10px";
toggleBtn.style.cursor = "pointer";
toggleBtn.style.padding = "4px 8px";
toggleBtn.style.border = "1px solid #ccc";
toggleBtn.style.backgroundColor = "#f5f5f5";
toggleBtn.style.borderRadius = "4px";
  
password.after(toggleBtn);
  
toggleBtn.addEventListener
  