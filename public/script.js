document.addEventListener('DOMContentLoaded', () => {

  // VIEW NAVIGATION (FEED VS NOTIFICATIONS VS PROFILE)
  const feedView = document.getElementById('feedView');
  const notifView = document.getElementById('notifView');
  const profileView = document.getElementById('profileView');

  // Mobile Bottom Nav Buttons
  const navFeedBtn = document.getElementById('navFeedBtn');
  const navNotifBtn = document.getElementById('navNotifBtn');
  const navProfileBtn = document.getElementById('navProfileBtn');

  // Desktop Navigation Buttons
  const sideNavFeedBtn = document.getElementById('sideNavFeedBtn');
  const sideNavNotifBtn = document.getElementById('sideNavNotifBtn');
  const sideNavProfileBtn = document.getElementById('sideNavProfileBtn');
  
  const dtNavFeedBtn = document.getElementById('dtNavFeedBtn');
  const dtNavNotifBtn = document.getElementById('dtNavNotifBtn');
  const dtNavProfileBtn = document.getElementById('dtNavProfileBtn');

  function switchView(viewName) {
    // Hide all views
    feedView?.classList.add('hidden-view');
    feedView?.classList.remove('active-view');
    notifView?.classList.add('hidden-view');
    notifView?.classList.remove('active-view');
    profileView?.classList.add('hidden-view');
    profileView?.classList.remove('active-view');

    // Reset active button states
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

  // THEME TOGGLE (LIGHT / DARK MODE)
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

  // MEDIA TYPE TOGGLE (LINK VS FILE UPLOAD)
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

  // POST SUBMISSION WITH INSTAGRAM-STYLE USER TAGGING
  const createPostForm = document.getElementById('createPostForm');
  const roastFeed = document.getElementById('roastFeed');

  createPostForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const promptText = document.getElementById('postPrompt')?.value || '';
    const videoLink = document.getElementById('postVideoLink')?.value || '';
    const file = postFileInput?.files[0];

    const formattedPrompt = parseUserTags(promptText);
    let mediaHTML = '';

    if (selectedMediaType === 'link' && videoLink.trim() !== '') {
      const embedUrl = getYouTubeEmbedUrl(videoLink.trim());
      if (embedUrl) {
        mediaHTML = `
          <div class="media-box">
            <div class="video-container">
              <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>`;
      }
    } else if (selectedMediaType === 'upload' && file) {
      const fileUrl = URL.createObjectURL(file);
      if (file.type.startsWith('video/')) {
        mediaHTML = `
          <div class="media-box">
            <video src="${fileUrl}" controls class="post-video"></video>
          </div>`;
      } else if (file.type.startsWith('image/')) {
        mediaHTML = `
          <div class="media-box">
            <img src="${fileUrl}" class="post-img" alt="Uploaded Target">
          </div>`;
      }
    }

    const newPostCard = document.createElement('article');
    newPostCard.className = 'post-card glass-panel';
    newPostCard.innerHTML = `
      <div class="post-header">
        <div class="avatar-glow">👑</div>
        <div class="user-info">
          <span class="username">@YourHandle <span class="tag-badge">Assassin</span></span>
          <span class="post-time">Just now</span>
        </div>
        <button class="btn-follow-small">+ Follow</button>
      </div>
      <p class="post-prompt">"${formattedPrompt}"</p>
      ${mediaHTML}
      <div class="post-footer">
        <button class="react-btn"><span class="emoji">💀</span> <span class="count">0</span></button>
        <button class="react-btn"><span class="emoji">🔥</span> <span class="count">0 Savages</span></button>
        <button class="share-btn"><i class="fa-solid fa-arrow-turn-up"></i> Share</button>
      </div>
    `;

    roastFeed?.prepend(newPostCard);
    createPostForm.reset();
    if (fileNameLabel) fileNameLabel.innerText = "Choose Image or Video (Max 15s)";
    closeModal(postModal);
    switchView('feed');
  });

});
