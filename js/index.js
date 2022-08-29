const init = () => {
  const formElement = document.getElementById("github-form");
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById("search");

    fetch(`https://api.github.com/search/users?q=${usernameInput.value}`, {
      headers: {
        Accept: "application / vnd.github.v3 + json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        const usersContainer = document.getElementById("user-list");
        usersContainer.innerHTML = "";
        usersContainer.innerHTML = data.items
          .map((item) => {
            return `<li class="user">${item.login}</li>`;
          })
          .join("");
        const users = document.getElementsByClassName("user");
        for (let user of users) {
          user.addEventListener("click", (event) => {
            console.log({ event: event.target.innerHTML });
            const username = event.target.innerHTML;
            fetch(`https://api.github.com/users/${username}/repos`, {
              headers: {
                Accept: "application / vnd.github.v3 + json",
              },
            })
              .then((response) => response.json())
              .then((reposList) => {
                console.log({ reposList });
                const reposListContainer =
                  document.getElementById("repos-list");
                reposListContainer.innerHTML = "";
                reposListContainer.innerHTML = reposList
                  .map((item) => {
                    return `<li>${item.name}</li>`;
                  })
                  .join("");
              });
          });
        }
      });
  });
};

document.addEventListener("DOMContentLoaded", init);