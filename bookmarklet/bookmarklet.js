(() => {
    // Check if the script is running on the specified URL
    if (window.location.origin !== 'https://central.wordcamp.org') {
        console.log('This script runs only on https://central.wordcamp.org');
        return; // Exit the script if not on the specified URL
    }

    // Extract the 'post' value from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post') || 'N/A';

    const eventTitle = document.querySelector('input[name="post_title"]')?.value || 'N/A';
    const eventStatus = document.querySelector('select[name="post_status"]')?.value || 'N/A';
    const eventTypeValue = document.querySelector('input[name="post_type"]')?.value || 'N/A';
    // Extract the tab title, handling both straight and curly quotation marks
    const tabTitleMatch = document.title.match(/"([^"]+)"|“([^”]+)”/);
    const tabTitle = tabTitleMatch ? tabTitleMatch[1] || tabTitleMatch[2] : eventTitle;

    // Use the extracted postId for the eventTrackerLink if available
    const eventTrackerLink = postId !== 'N/A' ? `https://central.wordcamp.org/wp-admin/post.php?post=${postId}&action=edit` : 'N/A';

    let eventType;
    let eventLabels = 'event, application, Awaiting Triage';
    switch (eventTypeValue) {
        case 'wp_meetup':
            eventType = 'Meetup';
            eventLabels += ', Meetup, meetup-application';
            break;
        case 'wordcamp':
            eventType = 'WordCamp';
            eventLabels += ', WordCamp, wordcamp-application';
            break;
        default:
            eventType = 'WordPress Event';
            eventLabels += ', WordPress-event, wordpress-event-application';
    }

    const issueTitle = encodeURIComponent(`[${eventType}] ${eventTitle}`);
    const issueLabels = encodeURIComponent(eventLabels);
    const issueProject = encodeURIComponent(`WordPress/176`);
    const issueTrackerLink = encodeURIComponent(eventTrackerLink);

    const issueBody = encodeURIComponent(
        `### Event Name:\n\n${eventTitle}\n### Event Type:\n\n${eventType}\n### Tracker URL:\n\n${eventTrackerLink}\n\nFound ${eventType} application for "${tabTitle}" | TRACKER-${postId}.`
    );

    const githubUrl = `https://github.com/WordPress/Community-Team/issues/new?title=${issueTitle}&body=${issueBody}&labels=${issueLabels}&projects=${issueProject}`;

    window.open(githubUrl);
    //chrome.runtime.sendMessage({ url: githubUrl });
})();
