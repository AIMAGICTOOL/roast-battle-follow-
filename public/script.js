document.addEventListener('DOMContentLoaded', () => {

  // VIEW NAVIGATION (FEED VS PROFILE)
  const feedView = document.getElementById('feedView');
  const profileView = document.getElementById('profileView');

  // Mobile Bottom Nav
  const navFeedBtn = document.getElementById('navFeedBtn');
  const navProfileBtn = document.getElementById('navProfileBtn');

  // Desktop Side Nav
  const sideNavFeedBtn = document.getElementById('sideNavFeedBtn');
  const sideNavProfileBtn = document.getElementById('sideNavProfileBtn');
  const dtNavFeedBtn = document.getElementById('dtNavFeedBtn');
  const dtNavProfileBtn = document.getElementById('dtNavProfileBtn');

  function switchView(viewName) {
    if (viewName === 'feed') {
      feedView?.classList.add('active-view');
      feedView?.classList.remove('hidden-view');
      profileView?.classList.remove('active-view');
      profileView?.classList.add('hidden-view');

      navFeedBtn?.classList.add('active');
      navProfileBtn?.classList.remove('active');
      sideNavFeedBtn?.classList.add('active');
      sideNavProfileBtn?.classList.remove('active');
      dtNavFeedBtn?.classList.add('active');
      dtNavProfileBtn?.classList.remove('active');
    } else {
      profileView?.classList.add('active-view');
      profileView?.classList.remove('hidden-view');
      feedView?.classList.remove('active-view');
      feedView?.classList.add('hidden-view');

      navProfileBtn?.classList.add('active');
      navFeedBtn?.classList.remove('active');
      sideNavProfileBtn?.classList.add('active');
      sideNavFeedBtn?.classList.remove('active');
      dtNavProfileBtn?.classList.add('active');
      dtNavFeedBtn?.classList.remove('active');
    }
  }

  navFeedBtn?.addEventListener('click', () => switchView('feed'));
  navProfileBtn?.addEventListener('click', () => switchView('profile'));
  sideNavFeedBtn?.addEventListener('click', () => switchView('feed'));
  sideNavProfileBtn?.addEventListener('click', () => switchView('profile'));
  dtNavFeedBtn?.addEventListener('click', () => switchView('feed'));
  dtNavProfileBtn?.addEventListener('click', () => switchView('profile'));

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

  let selectedMediaType = 'link'; // Default option

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

  // POST SUBMISSION
  const createPostForm = document.getElementById('createPostForm');
  const roastFeed = document.getElementById('roastFeed');

  createPostForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const promptText = document.getElementById('postPrompt')?.value || '';
    const videoLink = document.getElementById('postVideoLink')?.value || '';
    const file = postFileInput?.files[0];

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
      </div>
      <p class="post-prompt">"${promptText}"</p>
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
  });

});
