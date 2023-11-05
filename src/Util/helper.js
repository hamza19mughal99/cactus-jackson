export const cloudURL = 'https://cactus-jack.azurewebsites.net/assets/uploads/'

export function getToken() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth?.accessToken;
}

export function getRefreshToken() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth?.refreshToken
};

export function updateLocalAccessToken(token, subscription) {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    userAuth.accessToken = token;
    userAuth.subscription = subscription
    localStorage.setItem("user", JSON.stringify(userAuth));
}

export function CurrentUserInfo() {
    let userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
    return userAuth
}