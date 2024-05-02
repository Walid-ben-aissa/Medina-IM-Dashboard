const apiBaseUrl = 'http://localhost:3000/api/';


export async function login(username: string, password: string): Promise<{ token: string }> {
    try {
        const response = await fetch(apiBaseUrl + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        return response.json();
    }
    catch (error) {
        console.error('Error:', error);
        return { token: '' };
    }
}

export async function register(username: string, password: string): Promise<{ message: string }>{
    try {
        const response = await fetch(apiBaseUrl + 'users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.status==400){
            return { message: 'User Already Exist' };
        }
        else{
            return { message: 'User registered successfully' };
        }
        
    }
    catch (error) {
        console.error('Error:', error);
        return { message: '' };
    }
}

export async function getProfile(token: string): Promise<{id: string, username: string, password: string}> {
    try {
        const response = await fetch(apiBaseUrl + 'users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    }
    catch (error) {
        console.error('Error:', error);
        return { id: '', username: '', password: '' };
    }
}



