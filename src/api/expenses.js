// Thin wrapper around the Express API in /server

const request = async (method, url, body) => {
    const response = await fetch(`/api/expenses${url}`, {
        method,
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
        throw new Error(message);
    }

    return response.status === 204 ? null : response.json();
};

export const fetchExpenses = () => request('GET', '');
export const createExpense = (expenseData) => request('POST', '', expenseData);
export const updateExpense = (id, updates) => request('PATCH', `/${id}`, updates);
export const deleteExpense = (id) => request('DELETE', `/${id}`);
