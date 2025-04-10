const servers = [
    'http://localhost:3000', // Backend1
    'http://192.168.1.20:3000', // Backend2
];

export async function apiFetch(path, options = {}) {
    for (const server of servers) {
        try {
            const res = await fetch(`${server}${path}`, options);
            if (res.ok) return res;
        } catch (err) {
            console.warn(`Failed to reach ${server}. Trying next...`);
        }
    }
    throw new Error('All backend servers are unreachable.');
}
