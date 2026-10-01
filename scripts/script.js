const postContainer = document.querySelector("#root");
const prevPostBtn = document.querySelector(".left");
const nextPostBtn = document.querySelector(".right");
const BASE_URL = "https://jsonplaceholder.typicode.com";

let currentPostId = Number(localStorage.getItem("currentPostId"));

const getPostById = async (currentPostId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${currentPostId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

const renderPost = (post) => {
  const title = document.createElement("p");
  const body = document.createElement("p");
  const id = document.createElement("h3");
  const continer = document.createElement("div");
  title.textContent = post.title;
  body.textContent = post.body;
  id.textContent = post.id;
  continer.classList.add("post");
  title.classList.add("subheader");
  continer.append(id, title, body);
  postContainer.append(continer);
};

const loadPost = async () => {
  postContainer.innerHTML = "";
  const loaderContainer = document.createElement("div");
  const spinner = document.createElement("div");
  loaderContainer.classList.add("loader-container");
  spinner.classList.add("spinner");
  loaderContainer.appendChild(spinner);
  postContainer.appendChild(loaderContainer);

  const postData = await getPostById(currentPostId);
  postContainer.innerHTML = "";
  if (postData) {
    renderPost(postData);
    localStorage.setItem("currentPostId", currentPostId);
  }
  prevPostBtn.disabled = currentPostId === 1;
};

loadPost();

nextPostBtn.addEventListener("click", () => {
  currentPostId++;
  loadPost();
});

prevPostBtn.addEventListener("click", () => {
  currentPostId--;
  loadPost();
});
