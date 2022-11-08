"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: "http://localhost:3000/api/auth/session/google",
        client_id: "620068405520-gp8slrdq8cf3auev149squ3e3k5oejvb.apps.googleusercontent.com",
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };
    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
}
exports.default = getGoogleOAuthURL;
