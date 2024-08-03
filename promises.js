document.getElementById('promiseButton').addEventListener('click', () => {
    document.getElementById('output').innerText = 'Loading..';
    fetchDataWithPromise()
        .then(posts => {
            document.getElementById('output').innerHTML = posts.join('<br>');
        })
        .catch(error => {
            document.getElementById('output').innerText = error;
        });
});

function fetchDataWithPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://dummyjson.com/posts')
                .then(response => response.json())
                .then(data => {
                    resolve(data.posts.map(post => post.title));
                })
                .catch(error => {
                    reject('Failed to fetch data');
                });
        }, 1000);

        setTimeout(() => {
            reject('Operation timed out');
        }, 5000);
    });
}
