//Auto scroll to bottom of chat
const scrollToBottomChat = () =>{
    const el = document.getElementById("messages");
    el.scrollTop = el.scrollHeight;
}

function getJSONFile(path){
    var json_data_str = fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error
                        (`HTTP error! Status: ${res.status}`);
                }
                // console.log(res)
                return res.json()
            })
            .then((data) =>{
                return JSON.stringify(data)})
            .catch((error) =>
                console.error("Unable to fetch data:", error));
    return json_data_str
}

async function translate(sourceText){
    var sourceLang = 'en';
    var targetLang = 'vi';
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    var get_translated_text = await fetch(url)
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {return data[0][0][0]});
      return get_translated_text
  }

function get_chatbot_answer() {
if (chatbot_data) {
        $("#messages").append(insertBubbleText($("#user_input").val(), 1));
        // var [tag,response] = get_bot_answer($("#user_input").val(), JSON.parse(chatbot_data))
        let answer = getAnswer($("#user_input").val(), JSON.parse(chatbot_data))
        if(answer.length === 3) {
            eval(answer[1])().then(data => {$("#messages").append(insertBubbleText(data,0))})
        }
        else {
            console.log(answer[1])
            $("#messages").append(insertBubbleText(answer[1],0));
        }
        scrollToBottomChat();
        // $("#user_input").val("")
    }
}

async function meowFact() {
    let api_data = await fetch('https://meowfacts.herokuapp.com')
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(async(data) => {
                    // console.log(data)
                    return await translate(data["data"]).then((fact)=>{
                        // $("#messages").append(insertBubbleText(fact,0))
                        return fact
                        // $("#messages").append(insertBubbleText(t_text,0))
                        }
                    )
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
    return api_data
}