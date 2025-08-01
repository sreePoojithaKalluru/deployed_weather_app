document.addEventListener("DOMContentLoaded", () => {
  const searchList = document.getElementById("searchList");

  // Fetch recent weather searches from backend
  fetch("/admin/searches")
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized or Server Error");
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        searchList.innerHTML = "<li>No searches found.</li>";
        return;
      }

      data.forEach(search => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>City:</strong> ${search.city || "N/A"}<br/>
          <strong>Temp:</strong> ${search.temp ?? "--"}°C<br/>
          ${search.weather ? `<strong>Weather:</strong> ${search.weather}<br/>` : ""}
          <strong>Date:</strong> ${search.timestamp ? new Date(search.timestamp).toLocaleString() : "N/A"}
        `;
        searchList.appendChild(li);
      });
    })
    .catch(err => {
      searchList.innerHTML = `<li style="color:red;">Error loading search history.</li>`;
      console.error("❌ Failed to load admin data:", err);
    });

  // Add Logout Button
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.style.cssText = `
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 6px;
    background: #e74c3c;
    color: white;
    border: none;
    cursor: pointer;
  `;
  logoutBtn.addEventListener("click", () => {
    fetch("/logout", { method: "POST" })
      .then(() => {
        window.location.href = "/login.html";
      })
      .catch(() => alert("Logout failed"));
  });

  document.querySelector(".container").appendChild(logoutBtn);
});

