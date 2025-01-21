//get time information
function getTime(){
    var currentdate = new Date(); 
    return [
        [currentdate.getDate(),(currentdate.getMonth()+1),currentdate.getFullYear()].map(String).map(a=>a.padStart(2, "0")), 
        [currentdate.getHours(),currentdate.getMinutes(),currentdate.getSeconds()].map(String).map(a=>a.padStart(2, "0"))
    ] //format [[day,month,year],[hour,minute,second]]
}

// generate bubble chat for text
function insertBubbleText(str, user=false){
    return`
    <div class="chat-message" dir="${user?'rtl':'ltr'}">
         <div class="flex items-start gap-2.5 w-full">
            <img
              class="w-8 h-8 rounded-full"
              src=${user?
                "https://pbs.twimg.com/media/GYmVGEuasAElEpT?format=jpg&name=small"
                :"https://pbs.twimg.com/media/GYk9NjpasAAvneE?format=png&name=large"}
              alt=${user?'User image':'Bot image'}
            />
            <div
              class="flex flex-col max-w-[50%] w-max leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
            >
              <div
                class="flex w-max items-center space-x-2 rtl:space-x-reverse text-wrap max-w-1/2 w-full text-ellipsis overflow-hidden"
              >
                <span
                  class="text-xl font-bold text-gray-900 dark:text-white"
                  >${user?"You":"Yamakaze's Bot"}</span
                >
                <span
                  class="text-lg font-normal text-gray-500 dark:text-gray-400"
                  >${getTime()[1][0]}:${getTime()[1][1]}</span
                >
              </div>
              <p
                  dir="ltr"
                class="text-xl w-full font-normal py-2.5 text-gray-900 dark:text-white whitespace-pre-wrap text-left"
              >${str}</p>
            </div>
          </div>
        </div>
    `
}