let testChatbot = new Chatbot();

function initChatbotData(data) {
    // console.log(data)
    data.forEach(element => {
        // console.log(element)
        testChatbot.setTag(element.tag)
        if(element.func) 
            testChatbot.setData(element.tag, element.patterns, element.responses, element.func);
        else 
        testChatbot.setData(element.tag, element.patterns, element.responses);
    });
    console.log(testChatbot.data)
}

function getAnswer(user_str) {
    return testChatbot.getBotAnswer(user_str);
    // if(answer.length === 3) {
    //     const doSth = answer[1](); //or you can get tag (answer[0] and set action for it)
    //     return answer[2];
    // }
    // else {
    //     return answer[2];
    // }
}