document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME SWITCHER
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.checked = true;
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('change', () => {
      if (themeToggleBtn.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // 2. BOTTOM NAVIGATION & VIEW SWITCHING (Feed & Profile)
  const navFeedBtn = document.getElementById('navFeedBtn');
  const navProfileBtn = document.getElementById('navProfileBtn');

  const feedView = document.getElementById('feedView');
  const profileView = document.getElementById('profileView');

  const switchView = (activeBtn, activeView) => {
    [navFeedBtn, navProfileBtn].forEach(btn => btn?.classList.remove('active'));
    [feedView, profileView].forEach(view => {
      if(view) {
        view.classList.remove('active-view');
        view.classList.add('hidden-view');
      }
    });

    if (activeBtn) activeBtn.classList.add('active');
    if (activeView) {
      activeView.classList.remove('hidden-view');
      activeView.classList.add('active-view');
    }
  };

  if (navFeedBtn) navFeedBtn.addEventListener('click', () => switchView(navFeedBtn, feedView));
  if (navProfileBtn) navProfileBtn.addEventListener('click', () => switchView(navProfileBtn, profileView));

  // 3. EDIT PROFILE BIO MODAL
  const editProfileBtn = document.getElementById('editProfileBtn');
  const editBioModal = document.getElementById('editBioModal');
  const closeBioModalBtn = document.getElementById('closeBioModalBtn');
  const editBioForm = document.getElementById('editBioForm');

  if (editProfileBtn) editProfileBtn.addEventListener('click', () => editBioModal.classList.remove('hidden'));
  if (closeBioModalBtn) closeBioModalBtn.addEventListener('click', () => editBioModal.classList.add('hidden'));

  if (editBioForm) {
    editBioForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newHandle = document.getElementById('inputUsername').value;
      const newBio = document.getElementById('inputBio').value;

      if(newHandle) document.getElementById('profileDisplayName').innerText = newHandle;
      if(newBio) document.getElementById('profileBioText').innerText = `"${newBio}"`;

      editBioModal.classList.add('hidden');
    });
  }

  // 4. CREATE POST MODAL (Drop Roast FAB Button)
  const fabBtn = document.getElementById('fabBtn');
  const postModal = document.getElementById('postModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const createPostForm = document.getElementById('createPostForm');

  if (fabBtn) fabBtn.addEventListener('click', () => postModal.classList.remove('hidden'));
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => postModal.classList.add('hidden'));

  if (createPostForm) {
    createPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const prompt = document.getElementById('postPrompt').value;
      const imageUrl = document.getElementById('postImage').value;

      if (!prompt.trim()) return;

      const roastFeed = document.getElementById('roastFeed');
      const newPost = document.createElement('article');
      newPost.className = 'post-card glass-panel';

      const imageHTML = imageUrl ? `<div class="media-box"><img src="${imageUrl}" alt="Target Image" class="post-img"></div>` : '';

      newPost.innerHTML = `
        <div class="post-header">
          <div class="avatar-glow">🔥</div>
          <div class="user-info">
            <span class="username">@You <span class="tag-badge">Fresh Target</span></span>
            <span class="post-time">Just now</span>
          </div>
        </div>
        <p class="post-prompt">"${prompt}"</p>
        ${imageHTML}
        <div class="post-footer">
          <button class="react-btn"><span class="emoji">💀</span> <span class="count">0</span></button>
          <button class="react-btn"><span class="emoji">🔥</span> <span class="count">0 Savages</span></button>
          <button class="share-btn"><i class="fa-solid fa-arrow-turn-up"></i> Share</button>
        </div>
      `;

      roastFeed.prepend(newPost);
      createPostForm.reset();
      postModal.classList.add('hidden');
      switchView(navFeedBtn, feedView);
    });
  }
});
