(function () {
    // Get the value from the "post_title" input
    const postTitle = document.querySelector('input[name="post_title"]').value;

    // Get the selected value from the "post_status" dropdown
    const postStatus = document.querySelector('select[name="post_status"]').value;

    // Get the value of the hidden "post_type" input field
    const postTypeValue = document.querySelector('input[name="post_type"]').value;

    // Determine the type based on the "post_type" value
    let postType;
    switch (postTypeValue) {
        case 'wp_meetup':
            postType = 'Meetup';
            break;
        case 'wordcamp':
            postType = 'WordCamp';
            break;
        default:
            postType = 'Unknown'; // Use 'Unknown' or any other default value you prefer
    }

    // Extract the tab title, assuming it's in the format: "Title" - rest of the title
    const tabTitleMatch = document.title.match(/"([^"]+)"/);
    const tabTitle = tabTitleMatch ? tabTitleMatch[1] : '';

    // Get the current tab's URL
    const tabUrl = window.location.href;

    // Construct the GitHub URL with pre-filled data
    const issueTitle = encodeURIComponent(`Issue for "${tabTitle}" - ${postType}`);
    const issueBody = encodeURIComponent(
        `Details:\n` +
        `- Post Title: ${postTitle}\n` +
        `- Post Type: ${postType}\n` +
        `- Post Status: ${postStatus}\n` +
        `- Page URL: ${tabUrl}\n\n` +
        `Found an issue on "${tabTitle}" related to ${postType} with the above details.`
    );

    const githubUrl = `https://github.com/WordPress/Community-Team/issues/new?title=${issueTitle}&body=${issueBody}`;

    // Send the URL back to the popup script
    chrome.runtime.sendMessage({ action: "sendLink", url: githubUrl });
})();
