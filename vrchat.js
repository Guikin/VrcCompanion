require("dotenv").config()
const vrchat = require("vrchat");
const configuration = new vrchat.Configuration({
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
});

const AuthenticationApi = new vrchat.AuthenticationApi(configuration);
const UsersApi = new vrchat.UsersApi(configuration);
const SystemApi = new vrchat.SystemApi(configuration);
const WorldsApi = new vrchat.WorldsApi(configuration)

// SystemApi.getCurrentOnlineUsers().then(resp => {
//     console.log(`Current Online Users: ${resp.data}`);

    // Calling getCurrentUser on Authentication API logs you in if the user isn't already logged in.
    AuthenticationApi.getCurrentUser().then(resp => {
        console.log(`Logged in as: ${resp.data.displayName}`);

        // UsersApi.getUser("usr_c1644b5b-3ca4-45b4-97c6-a2a0de70d469").then(resp => {
        //     console.log(resp.data.displayName); // Should print out "tupper"
        // });
    });
// });

module.exports = {
    SystemApi,
    UsersApi,
    SystemApi,
    WorldsApi
}