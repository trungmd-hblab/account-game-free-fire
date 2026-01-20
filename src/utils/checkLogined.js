import Cookies from "js-cookie";

export function checkLogin(){
    let token = Cookies.get('client_accessToken')
    if(token) return true;
    return false;
}