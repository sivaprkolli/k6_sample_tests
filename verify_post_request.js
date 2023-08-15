import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';


export const options ={
    vus : 1,
    duration: '10s',
}


export default function(){
    const url = 'https://dummyjson.com/auth/login';
    const payload = JSON.stringify({
        "username" : "kminchelle",
        "password" : "0lelplR",
        "expiresInMins" : 60   
    })

    const params = {
        headers : {
            'Content-type':'application/json',
        }
    }

    const resp = http.post(url, payload, params);
    sleep(1);
    check(resp, {
            'is status 200': (r) => r.status === 200,
            'is resp body has username': (r) => r.body.includes('kminchelle')
    })

}