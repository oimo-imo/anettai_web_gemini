
const url = 'http://localhost:3000/anettai_web_gemini/images/sns/note.png';

async function check() {
    try {
        const res = await fetch(url);
        console.log(`URL: ${url}`);
        console.log(`Status: ${res.status}`);
        console.log(`Content-Type: ${res.headers.get('content-type')}`);
    } catch (err) {
        console.error('Fetch error:', err.message);
    }
}

check();
