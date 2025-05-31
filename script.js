const blogForm = document.getElementById('blogForm');
const postsContainer = document.getElementById('postsContainer');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const submitBtn = blogForm.querySelector('button');

let editId = null;

window.onload = () => {
  displayPosts();
};

blogForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return;

  let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

  if (editId) {
    posts = posts.map(post => {
      if (post.id === editId) {
        return { ...post, title, content };
      }
      return post;
    });
    editId = null;
    submitBtn.textContent = "Add Post";
  } else {
    const post = { title, content, id: Date.now() };
    posts.unshift(post);
  }

  localStorage.setItem('blogPosts', JSON.stringify(posts));
  blogForm.reset();
  displayPosts();
});

function displayPosts() {
  const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const title = document.createElement('h3');
    title.innerText = post.title;

    const content = document.createElement('p');
    content.innerText = post.content;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = () => deletePost(post.id);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerText = 'Edit';
    editBtn.onclick = () => editPost(post);

    postDiv.appendChild(title);
    postDiv.appendChild(content);
    postDiv.appendChild(editBtn);
    postDiv.appendChild(deleteBtn);
    postsContainer.appendChild(postDiv);
  });
}

function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  posts = posts.filter(post => post.id !== id);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
  displayPosts();
}

function editPost(post) {
  titleInput.value = post.title;
  contentInput.value = post.content;
  editId = post.id;
  submitBtn.textContent = "Update Post";
}
