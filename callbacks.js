
document.getElementById('callbackButton').addEventListener('click', () => {
    displayMessageAfterDelay((message) => {
        document.getElementById('output').innerText = message;
        displayMessageAfterDelay(fetchDataAndDisplay, 5000);
    }, 5000);
});

function displayMessageAfterDelay(callback, delay) {
    setTimeout(() => {
        callback('Callback executed after 5 seconds');
    }, delay);
}

function fetchDataAndDisplay() {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            const posts = data.posts.map(post => post.title).join('<br>');
            document.getElementById('output').innerHTML = posts;
        })
        .catch(error => {
            document.getElementById('output').innerText = 'Failed to fetch data';
        });
}



