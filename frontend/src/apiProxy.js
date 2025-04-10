const LOAD_BALANCER_URL = 'http://localhost:4000'; // NGINX Load Balancer

export async function apiFetch(path, options = {}) {
    try {
        const res = await fetch(`${LOAD_BALANCER_URL}${path}`, options);
        if (res.ok) return res;
        throw new Error('Request failed.');
    } catch (err) {
        console.error('Failed to reach load balancer:', err);
        throw err;
    }
}
