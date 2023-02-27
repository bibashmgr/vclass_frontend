import axios from "axios";

export const getUser = () => {
    const user = localStorage.getItem('VCLASS_USER');
    if(user){
        return JSON.parse(user);
    }
}

export const setUser = async (token: string) => {
        return axios({
            method: 'get',
            baseURL: 'http://localhost:9999',
            url: 'auth/login/success',
            data: null,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": 'http://localhost:9999', "Authorization": `Bearer ${token}` },
        }).then((res) => {
            let user = { token: token, ...res.data.data };
            localStorage.setItem('VCLASS_USER', JSON.stringify(user));
            return user;
        }).catch((error) => {
            return null;
        })
}

export const removeUser = () =>{
    localStorage.removeItem('VCLASS_USER');
}