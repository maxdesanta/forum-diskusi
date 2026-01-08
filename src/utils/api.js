export const api = {
    // key
    BASE_URL: 'https://forum-api.dicoding.dev/v1',

    // method thread
    getThreads: async () => {
        const response = await fetch(`${api.BASE_URL}/threads`);
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { threads } } = data;
        return threads ;
    },

    getDetailThread: async (id) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}`);
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { detailThread } } = data;
        return detailThread;
    },

    addThread: async ({title, body, category = 'Perkenalan'}) => {
        const response = await fetch(`${api.BASE_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
            body: JSON.stringify({
                title,
                body,
                category,
            }),
        });
        const data = await response.json();
        console.log(data);
        const { status, message } = data;

        if (status !== 'success') {
        throw new Error(message);
        }

        const { data: { thread } } = data;

        return thread;
    },

    // method comment
    addComment: async ({id, content}) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
            body: JSON.stringify({
                content
            }),
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { comment } } = data;
        console.log(comment)
        return comment ;
    },

    // method vote
    upVoteThread: async (id) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { vote } } = data;
        return vote;
    },

    downVoteThread: async (id) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { vote } } = data;
        return vote;
    },

    neutralVoteThread: async (id) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}/neutral-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { vote } } = data;
        return vote;
    },

    upVoteComment: async (id, idComment) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}/comments/${idComment}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { vote } } = data;
        return vote;
    },

    downVoteComment: async (id, idComment) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}/comments/${idComment}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { vote } } = data;
        return vote;
    },

    neutralVoteComment: async (id, idComment) => {
        const response = await fetch(`${api.BASE_URL}/threads/${id}/comments/${idComment}/neutral-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`
            },
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { vote } } = data;
        return vote;
    },

    // method laderboards
    getLaderboards: async () => {
        const response = await fetch(`${api.BASE_URL}/leaderboards`);
        const responeJson = await response.json();
        const { status, message } = responeJson;
        
        if (status !== 'success') {
            throw new Error(message);
        }
        
        const { data: { leaderboards } } = responeJson;
        return leaderboards;
    },

    // auth
    register: async ({name, email, password}) => {
        const response = await fetch(`${api.BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { user } } = data;
        return user ;
    },

    login: async ({email, password}) => {
        const response = await fetch(`${api.BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        const { status, message } = data;
        
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { token } } = data;
        console.log(token)
        return token ;
    },

    getAllUsers: async () => {
        const response = await fetch(`${api.BASE_URL}/users`);
        const responseJson = await response.json();
        const { status, message } = responseJson;
        
        if (status !== 'success') {
            throw new Error(message);
        }
        
        const { data: { users } } = responseJson;
        return users;
    },

    getOwnProfile: async () => {
        const response = await fetch(`${api.BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.getToken()}`,
            },
        });
        const responseJson = await response.json();
        const { status, message } = responseJson;
        
        if (status !== 'success') {
            throw new Error(message);
        }
        
        const { data: { user } } = responseJson;
        return user;
    },

    // method token
    putToken: (token) => localStorage.setItem('token', token),
    getToken: () => localStorage.getItem('token'),
    deleteToken: () => localStorage.removeItem('token'),
};