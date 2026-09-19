document.addEventListener('DOMContentLoaded', () => {

  // VIEW NAVIGATION (FEED VS NOTIFICATIONS VS PROFILE)
  const feedView = document.getElementById('feedView');
  const notifView = document.getElementById('notifView');
  const profileView = document.getElementById('profileView');

  const navFeedBtn = document.getElementById('navFeedBtn');
  const navNotifBtn = document.getElementById('navNotifBtn');
  const navProfileBtn = document.getElementById('navProfileBtn');

  const sideNavFeedBtn = document.getElementById('sideNavFeedBtn');
  const sideNavNotifBtn = document.getElementById('sideNavNotifBtn');
  const sideNavProfileBtn = document.getElementById('sideNavProfileBtn');
  
  const dtNavFeedBtn = document.getElementById('dtNavFeedBtn');
  const dtNavNotifBtn = document.getElementById('dtNavNotifBtn');
  const dtNavProfileBtn = document.getElementById('dtNavProfileBtn');

  function switchView(viewName) {
    feedView?.classList.add('hidden-view');
    feedView?.classList.remove('active-view');
    notifView?.classList.add('hidden-view');
    notifView?.classList.remove('active-view');
    profileView?.classList.add('hidden-view');
    profileView?.classList.remove('active-view');

    [navFeedBtn, navNotifBtn, navProfileBtn, sideNavFeedBtn, sideNavNotifBtn, sideNavProfileBtn, dtNavFeedBtn, dtNavNotifBtn, dtNavProfileBtn].forEach(btn => btn?.classList.remove('active'));

    if (viewName === 'feed') {
      feedView?.classList.add('active-view');
      feedView?.classList.remove('hidden-view');
      navFeedBtn?.classList.add('active');
      sideNavFeedBtn?.classList.add('active');
      dtNavFeedBtn?.classList.add('active');
    } else if (viewName === 'notif') {
      notifView?.classList.add('active-view');
      notifView?.classList.remove('hidden-view');
      navNotifBtn?.classList.add('active');
      sideNavNotifBtn?.classList.add('active');
      dtNavNotifBtn?.classList.add('active');
    } else if (viewName === 'profile') {
      profileView?.classList.add('active-view');
      profileView?.classList.remove('hidden-view');
      navProfileBtn?.classList.add('active');
      sideNavProfileBtn?.classList.add('active');
      dtNavProfileBtn?.classList.add('active');
    }
  }

  navFeedBtn?.addEventListener('click', () => switchView('feed'));
  navNotifBtn?.addEventListener('click', () => switchView('notif'));
  navProfileBtn?.addEventListener('click', () => switchView('profile'));

  sideNavFeedBtn?.addEventListener('click', () => switchView('feed'));
  sideNavNotifBtn?.addEventListener('click', () => switchView('notif'));
  sideNavProfileBtn?.addEventListener('click', () => switchView('profile'));

  dtNavFeedBtn?.addEventListener('click', () => switchView('feed'));
  dtNavNotifBtn?.addEventListener('click', () => switchView('notif'));
  dtNavProfileBtn?.addEventListener('click', () => switchView('profile'));

  // + FOLLOW BUTTON TOGGLE ACTION
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-follow-small')) {
      if (e.target.classList.contains('following')) {
        e.target.classList.remove('following');
        e.target.innerText = '+ Follow';
      } else {
        e.target.classList.add('following');
        e.target.innerText = 'Following';
      }
    }
  });

  // INSTAGRAM-STYLE AUTO-TAG FORMATTER (@mention parser)
  function parseUserTags(text) {
    if (!text) return '';
    return text.replace(/@([a-zA-Z0-9_]+)/g, '<span class="user-tag">@$1</span>');
  }

  // THEME TOGGLE
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  themeToggleBtn?.addEventListener('change', () => {
    if (themeToggleBtn.checked) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  });

  // MODAL CONTROLS
  const postModal = document.getElementById('postModal');
  const editBioModal = document.getElementById('editBioModal');

  const fabBtn = document.getElementById('fabBtn');
  const sideFabBtn = document.getElementById('sideFabBtn');
  const dtFabBtn = document.getElementById('dtFabBtn');

  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeBioModalBtn = document.getElementById('closeBioModalBtn');
  const editProfileBtn = document.getElementById('editProfileBtn');

  function openModal(modal) { modal?.classList.remove('hidden'); }
  function closeModal(modal) { modal?.classList.add('hidden'); }

  fabBtn?.addEventListener('click', () => openModal(postModal));
  sideFabBtn?.addEventListener('click', () => openModal(postModal));
  dtFabBtn?.addEventListener('click', () => openModal(postModal));
  editProfileBtn?.addEventListener('click', () => openModal(editBioModal));

  closeModalBtn?.addEventListener('click', () => closeModal(postModal));
  closeBioModalBtn?.addEventListener('click', () => closeModal(editBioModal));

  // MEDIA TYPE TOGGLE
  const tabLinkBtn = document.getElementById('tabLinkBtn');
  const tabUploadBtn = document.getElementById('tabUploadBtn');
  const mediaLinkContainer = document.getElementById('mediaLinkContainer');
  const mediaUploadContainer = document.getElementById('mediaUploadContainer');
  const postFileInput = document.getElementById('postFileInput');
  const fileNameLabel = document.getElementById('fileNameLabel');

  let selectedMediaType = 'link';

  if (tabLinkBtn && tabUploadBtn && mediaLinkContainer && mediaUploadContainer) {
    tabLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectedMediaType = 'link';
      tabLinkBtn.classList.add('active');
      tabUploadBtn.classList.remove('active');
      mediaLinkContainer.classList.remove('hidden');
      mediaUploadContainer.classList.add('hidden');
    });

    tabUploadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectedMediaType = 'upload';
      tabUploadBtn.classList.add('active');
      tabLinkBtn.classList.remove('active');
      mediaUploadContainer.classList.remove('hidden');
      mediaLinkContainer.classList.add('hidden');
    });
  }

  postFileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      fileNameLabel.innerText = "Selected: " + e.target.files[0].name;
    }
  });

  // HELPER TO EXTRACT YOUTUBE EMBED URL
  function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    let videoId = null;
    try {
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        videoId = urlParams.get('v');
      } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
      }
    } catch (err) {
      console.error("Invalid URL format", err);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  // RENDER SINGLE POST CARD
  function renderPostCard(post) {
    const formattedPrompt = parseUserTags(post.promptText);
    let mediaHTML = '';

    if (post.mediaType === 'youtube' && post.mediaUrl) {
      const embedUrl = getYouTubeEmbedUrl(post.mediaUrl);
      if (embedUrl) {
        mediaHTML = `
          <div class="media-box">
            <div class="video-container">
              <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>`;
      }
    } else if (post.mediaType === 'file' && post.mediaUrl) {
      if (post.mediaUrl.match(/\.(mp4|webm|ogg)$/i)) {
        mediaHTML = `
          <div class="media-box">
            <video src="${post.mediaUrl}" controls class="post-video"></video>
          </div>`;
      } else {
        mediaHTML = `
          <div class="media-box">
            <img src="${post.mediaUrl}" class="post-img" alt="Target Media">
          </div>`;
      }
    }

    const card = document.createElement('article');
    card.className = 'post-card glass-panel';
    card.dataset.id = post._id;
    card.innerHTML = `
      <div class="post-header">
        <div class="avatar-glow">👑</div>
        <div class="user-info">
          <span class="username">${post.author || '@YourHandle'} <span class="tag-badge">Assassin</span></span>
          <span class="post-time">${new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <button class="btn-follow-small">+ Follow</button>
      </div>
      <p class="post-prompt">"${formattedPrompt}"</p>
      ${mediaHTML}
      <div class="post-footer">
        <button class="react-btn skull-btn" onclick="reactToPost('${post._id}', 'skull', this)">
          <span class="emoji">💀</span> <span class="count">${post.skullsCount || 0}</span>
        </button>
        <button class="react-btn flame-btn" onclick="reactToPost('${post._id}', 'flame', this)">
          <span class="emoji">🔥</span> <span class="count">${post.flamesCount || 0} Savages</span>
        </button>
        <button class="share-btn"><i class="fa-solid fa-arrow-turn-up"></i> Share</button>
      </div>
    `;

    return card;
  }

  // FETCH POSTS FROM DATABASE ON LOAD
  const roastFeed = document.getElementById('roastFeed');

  async function loadPosts() {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success && data.posts.length > 0) {
        roastFeed.innerHTML = '';
        data.posts.forEach(post => {
          roastFeed.appendChild(renderPostCard(post));
        });
      }
    } catch (err) {
      console.error("Error loading posts from DB:", err);
    }
  }

  loadPosts();

  // SUBMIT NEW POST TO DATABASE
  const createPostForm = document.getElementById('createPostForm');

  createPostForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const promptText = document.getElementById('postPrompt')?.value || '';
    const videoLink = document.getElementById('postVideoLink')?.value || '';

    let mediaType = 'none';
    let mediaUrl = '';

    if (selectedMediaType === 'link' && videoLink.trim() !== '') {
      mediaType = 'youtube';
      mediaUrl = videoLink.trim();
    }

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: '@YourHandle',
          promptText,
          mediaType,
          mediaUrl
        })
      });

      const result = await response.json();
      if (result.success) {
        roastFeed.prepend(renderPostCard(result.post));
        createPostForm.reset();
        if (fileNameLabel) fileNameLabel.innerText = "Choose Image or Video (Max 15s)";
        closeModal(postModal);
        switchView('feed');
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  });

});

// GLOBAL REACTION FUNCTION FOR REAL-TIME DB COUNTERS
async function reactToPost(postId, type, btnElement) {
  try {
    const res = await fetch(`/api/posts/${postId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });
    const data = await res.json();
    if (data.success) {
      const countSpan = btnElement.querySelector('.count');
      if (type === 'flame') {
        countSpan.innerText = `${data.post.flamesCount} Savages`;
      } else if (type === 'skull') {
        countSpan.innerText = data.post.skullsCount;
      }
    }
  } catch (err) {
    console.error("Reaction failed:", err);
  }
}
