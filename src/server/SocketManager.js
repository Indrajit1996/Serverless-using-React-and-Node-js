const io = require('./index.js').io;
const {USER_CONNECTED, VERIFY_USER, LOGOUT} = require("../Event.js")
const { createUser, createMessage, createChat } = require("../Factories.js")

let connectedUsers = { }



module.exports = function(socket) {
    console.log("socket ID" + socket.id)

    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname))
        {
            callback({isUser: true, user: null})
        }
        else
        {
            callback({isUser: false, user: createUser({name: nickname}) })
        }
    });

    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        console.log(connectedUsers);
    });

    function addUser(userList, user){
        let newlist = Object.assign({}, userList);
        newlist[user.name] = user;
        return newlist
    }

}



function removeUser(userList, username){
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

function isUser(userList, username) {
    return username in userList;
}