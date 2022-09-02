

const overviewDiv = document.querySelector(".overview");
const ulListItems = document.querySelector(".repo-list");
const username = "Josh-Darling13";


async function fetchGitHubInfo (user){
    
    const response = await fetch (`https://api.github.com/users/${user}`);
    let apiInfo = await response.json();
  // console.log(apiInfo);
    //return apiInfo
  displayFetchedInfo (apiInfo);
};

fetchGitHubInfo(username);


function displayFetchedInfo (apiInfo){
    console.log(apiInfo.bio);
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
// console.log(apiRespo);


displayRepos(apiRespo);
 
};

fetchGitHubRepos(username);

const displayRepos = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      ulListItems.append(repoItem);
    }
};
