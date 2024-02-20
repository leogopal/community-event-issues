(() => {
  const postTitle = document.querySelector('input[name="post_title"]')?.value || 'N/A';
  const postStatus = document.querySelector('select[name="post_status"]')?.value || 'N/A';
  const postTypeValue = document.querySelector('input[name="post_type"]')?.value || 'N/A';
  // Extract the tab title, handling both straight and curly quotation marks
  const tabTitleMatch = document.title.match(/"([^"]+)"|“([^”]+)”/);
  const tabTitle = tabTitleMatch ? tabTitleMatch[1] || tabTitleMatch[2] : postTitle;

  let postType;
  switch (postTypeValue) {
    case 'wp_meetup': postType = 'Meetup'; break;
    case 'wordcamp': postType = 'WordCamp'; break;
    default: postType = 'Unknown';
  }

  const issueTitle = encodeURIComponent(`Issue for "${tabTitle}" - ${postType}`);

  const issueBody = encodeURIComponent(
    `Details:\n- Post Title: ${postTitle}\n- Post Type: ${postType}\n- Post Status: ${postStatus}\n- Page URL: ${window.location.href}\n\nFound an issue on "${tabTitle}" related to ${postType} with the above details.`
  );

  const githubUrl = `https://github.com/WordPress/Community-Team/issues/new?title=${issueTitle}&body=${issueBody}`;

  chrome.runtime.sendMessage({ url: githubUrl });
})();