// using callbacks

const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' }
]

function getPosts() {
    setTimeout(() => {
        let output = ''
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

// posts one and two are displayed

getPosts();

// post three is created and pushed to the posts array
// getPosts is called again and all three posts are displayed

createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);