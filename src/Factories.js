const { v4: uuidv4 } = require('uuid');

const createUser = ({name = ""} = {}) => {
    return
    {
        id: uuidv4(),
        name
    }
}

const createMessage = ({message =  "" , sender =  ""} = {}) => {
  return  {
        id: uuidv4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
}

const createChat = ({message = [], name = "Community", users = []} = {}) => (
    {
        id: uuidv4(),
        name,
        message, 
        users, 
        typingUsers: []
    }
)

const getTime = (date) => {
    return `${date.getHours()}:${("0"+ date.getMinutes()).slice(-2)}` ;
}

module.exports = {
    createUser, 
    createMessage,
    createChat
}