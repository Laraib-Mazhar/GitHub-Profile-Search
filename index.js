const url = "https://api.github.com/users";

// Get elements from the DOM
const searchInputElement = document.getElementById('searchInput');
const searchButtonElement = document.getElementById('search-btn');
const profileContainerElement = document.getElementById('profileContainer');
const loadingElement = document.getElementById('loading');

// Function to generate HTML for user profile
const generateProfile = (profile) => {
  return `
    <div class="profile-box">
      <div class="top-section">
        <div class="left">
          <div class="avatar">
            <img src="${profile.avatar_url}" alt="Avatar">
          </div>
          <div class="self">
            <h1>${profile.name}</h1>
            <h1>@${profile.login}</h1>
          </div>
        </div>
        <a href="${profile.html_url}" target="_blank">
          <button class="primary-btn">Check Profile</button>
        </a>
      </div>

      <div class="about">
        <h2>About</h2>
        <p>${profile.bio || "No bio available."}</p>
      </div>

      <div class="status">
        <div class="status-item">
          <h3>Followers</h3>
          <p>${profile.followers}</p>
        </div>
        <div class="status-item">
          <h3>Following</h3>
          <p>${profile.following}</p>
        </div>
        <div class="status-item">
          <h3>Repos</h3>
          <p>${profile.public_repos}</p>
        </div>
      </div>
    </div>
  `;
};

// Function to fetch GitHub profile data
const fetchProfile = async () => {
  const username = searchInputElement.value.trim();
  
  // Show loading status
  loadingElement.innerText = "Loading...";
  loadingElement.style.color = "black";

  try {
    const res = await fetch(`${url}/${username}`);
    const data = await res.json();

    if (res.ok) {
      loadingElement.innerText = "";
      profileContainerElement.innerHTML = generateProfile(data);
    } else {
      loadingElement.innerText = data.message || "User not found";
      loadingElement.style.color = "red";
      profileContainerElement.innerText = "";
    }

    console.log("data", data);
  } catch (error) {
    console.log({ error });
    loadingElement.innerText = "An error occurred";
    loadingElement.style.color = "red";
  }
};

// Add click event to search button
searchButtonElement.addEventListener("click", fetchProfile);
