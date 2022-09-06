const overviewDiv = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const backButton = document.querySelector('.view-repos');
const filterInput = document.querySelector('.filter-repos');

const username = "Josh-Darling13";

async function fetchGitHubInfo (user){
    
    const response = await fetch (`https://api.github.com/users/${user}`);
    let apiInfo = await response.json();
    displayFetchedInfo (apiInfo);
};

fetchGitHubInfo(username);

function displayFetchedInfo (apiInfo){

    const name = apiInfo.name;
    const bio = apiInfo.bio;
    const location = apiInfo.location;
    const public_repos = apiInfo.public_repos;
    const avatar_url = apiInfo.avatar_url;
    const profileInfo = `
        <div class="user-info">
            <figure>
                <img alt="user avatar" src="${avatar_url}" />   
            </figure>
        <div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of public repos:</strong> ${public_repos}</p>
        </div> 
    `;
    overviewDiv.innerHTML = profileInfo;
};

async function fetchGitHubRepos (user){
    const response = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    let apiRespo = await response.json();
    displayRepos(apiRespo);
 };

 fetchGitHubRepos (username);

const displayRepos = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        fetchGitRepoInfo (username, repoName);
    }
  });

async function fetchGitRepoInfo (username, repoName){
    const response = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    let repoInfo = await response.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (const language in languageData) {
      languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};

function displayRepoInfo(repoInfo, languages){

    filterInput.classList.remove("hide");
    backButton.classList.remove("hide");
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    reposSection.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoDataSection.append(div);
};


backButton.addEventListener('click', function(){
    reposSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener('input', function(e){
    let invale = e.target.value;
    console.log(invale);
    const repos = document.querySelectorAll(".repo");

    const lowerInvale = invale.toLowerCase();
    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(lowerInvale)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
    }
});



