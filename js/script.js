


const overviewDiv = document.querySelector(".overview");
const username = "Josh-Darling13";


async function fetchGitHubInfo (user){
    
    const response = await fetch (`https://api.github.com/users/${user}`);
    let apiInfo = await response.json();
    console.log(apiInfo);
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


/*
Below the async function to fetch your GitHub user data, 
create and name a new function to display the fetched user 
information on the page. This function should accept the 
JSON data as a parameter.

Inside the function, create a new div and give it a class
of “user-info”. 


Using innerHTML, populate the div, with the following 
elements for figure, image, and paragraphs:


*/