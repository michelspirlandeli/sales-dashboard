export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

type RequestOptions = {
    method?: string;
    body?: string;
    headers?: Record<string, string>;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });

    if (!response.ok) {
        let message = `HTTP ${response.status}`;
        try {
            const err = await response.json();
            message = err.message ?? message;
        } catch { /* ignore parse error */ }
        console.error('[API Error]', response.status, message);
        throw new Error(message);
    }

    if (response.status === 204) return undefined as unknown as T;
    return response.json() as Promise<T>;
}

export const api = {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (path: string) => request<void>(path, { method: 'DELETE' }),
};

export default api;