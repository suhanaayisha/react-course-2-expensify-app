// Shared fetch wrapper for the Express API in /server

let onUnauthorized = () => {};

// Called when a signed-in request comes back 401 (e.g. the session expired)
export const setUnauthorizedHandler = (handler) => {
    onUnauthorized = handler;
};

export default async (method, url, body, { handleUnauthorized = true } = {}) => {
    const response = await fetch(`/api${url}`, {
        method,
        credentials: 'same-origin',
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        let message = `Request failed (${response.status})`;
        try {
            const data = await response.json();
            message = data.error || message;
        } catch (e) {
            // response had no JSON body
        }
        if (response.status === 401 && handleUnauthorized) {
            onUnauthorized();
        }
        const error = new Error(message);
        error.status = response.status;
        throw error;
    }

    return response.status === 204 ? null : response.json();
};
