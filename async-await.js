document.getElementById('asyncButton').addEventListener('click', async () => {
    document.getElementById('output').innerText = 'Loading...';
    try {
        const posts = await fetchDataWithTimeout(fetchDataWithAsyncAwait, 5000);
        document.getElementById('output').innerHTML = posts.join('<br>');
    } catch (error) {
        document.getElementById('output').innerText = error;
    }
});

async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://dummyjson.com/posts');
        const data = await response.json();
        return data.posts.map(post => post.title);
    } catch (error) {
        throw 'Failed to fetch data';
    }
}

function fetchDataWithTimeout(promiseFunction, timeout) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject('Operation timed out');
        }, timeout);

        promiseFunction()
            .then(data => {
                clearTimeout(timer);
                resolve(data);
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error);
            });
    });
}