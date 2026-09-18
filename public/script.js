document.addEventListener('DOMContentLoaded', () => {
  // 1. SLIDING THEME TOGGLE SWITCH LOGIC
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // Check saved theme preference on page load
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.checked = true;
  }

  // Toggle Theme on Switch Change
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

  // 2. MODAL OPEN / CLOSE HANDLERS
  const openModalBtn = document.getElementById('openModalBtn');
  const fabBtn = document.getElementById('fabBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const postModal = document.getElementById('postModal');
  const createPostForm = document.getElementById('createPostForm');

  const openModal = () => postModal.classList.remove('hidden');
  const closeModal = () => postModal.classList.add('hidden');

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (fabBtn) fabBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside box
  if (postModal) {
    postModal.addEventListener('click', (e) => {
      if (e.target === postModal) closeModal();
    });
  }

  // 3. FORM SUBMISSION (DUMMY ADD TO FEED)
  if (createPostForm) {
    createPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const prompt = document.getElementById('postPrompt').value;
      const imageUrl = document.getElementById('postImage').value;

      if (!prompt.trim()) return;

      const roastFeed = document.getElementById('roastFeed');
      const newPost = document.createElement('article');
      newPost.className = 'post-card glass-panel';

      const imageHTML = imageUrl 
        ? `<div class="media-box"><img src="${imageUrl}" alt="Target Image" class="post-img"></div>` 
        : '';

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
          <button class="share-btn"><i class="fa-solid fa-arrow-turn-up"></i> Share Roast</button>
        </div>
      `;

      roastFeed.prepend(newPost);
      createPostForm.reset();
      closeModal();
    });
  }

  // 4. FILTER PILLS SELECTION
  const pillBtns = document.querySelectorAll('.pill-btn');
  pillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pillBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
