//Init data
let animations_list = {}
let css_list = {}

//Get animation list
$.getJSON( "../js/AnimatedME/animations_list.json", function(data) {
    animations_list = data
})

//Init data
$(document).ready(function(){
    loadCss();
})

//Preview input
$("#element").change(function(){
    $("#preview_animation_object").html($("#element").val());
})

//Add animation li
function add_animations() {
    let temp_selected_id = Date.now();
    $('#ul_animations').append(`
        <li id=${temp_selected_id} class="ANIMATION_NO relative border-b border-gray-200">
            <button type="button" class="w-full px-6 py-6 text-left" @click="selected !== ${temp_selected_id} ? selected = ${temp_selected_id} : selected = null">
            <div class="flex items-center justify-between">
            <a class="z-10" onclick="remove_animations(this)" @click="selected = null"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></a>
            <input class="NAME" class="ANIMATION_NAME border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-8" placeholder="Name of animation" value="Animation No.${$('#ul_animations li.ANIMATION_NO').length+1}">
            <svg :class="{'transform rotate-180' : selected == ${temp_selected_id}}" class="w-5 h-5 text-gray-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7"></path></svg>
            </div>
            </button>
            <div class="relative overflow-hidden transition-all max-h-0 duration-700" x-ref="container${temp_selected_id}" x-bind:style="selected == ${temp_selected_id} ? 'max-height: ' + $refs.container${temp_selected_id}.scrollHeight + 'px' : ''">
            <div class="px-6 pb-6">
            <form class="max-w-sm mx-auto">
                <label for="ANIMATION" class="block mb-2 text-sm font-medium text-gray-900">Animation:</label>

            <div class="flex items-center justify-center">
            <div
                x-data="{ open: false, selected: ''}"
                @click.away="open = false"
                class="ANIMATION w-full relative"
            >
                <!-- Button -->
                <button
                type="button"
                @click="open = !open; close_animations_list()"
                class="w-full px-4 py-2 border border-gray-300 rounded flex items-center justify-between"
                :class="{'text-black': selected !== '', 'text-gray-500': selected === ''}"
                >
                <span
                    class="ANIMATION_VALUE overflow-hidden"
                    x-text="selected === '' ? 'Select an option' : selected"
                ></span>
                <svg
                    class="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                    />
                </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                x-show="open"
                class="absolute mt-2 bg-white border rounded w-full max-h-96 overflow-y-scroll no-scrollbar z-10"
                x-cloak
                >
                <ul
                    class="h-full overflow-auto [&>li]:text-gray-500 [&>li]:px-4 [&>li]:py-2 [&>li]:cursor-pointer"
                >

                </ul>
    </div>
  </div>
</div>

                <label for="DURATION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Duration (second):</label>
                <input type="number" name="DURATION" class="DURATION [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" value=1>
                <label for="TIMING_FUNCTION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Timing Function:</label>
                <select class="TIMING_FUNCTION bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onchange="setValueofTIMING_FUNCTION(this)">
                <optgroup label="Native">
                    <option value="linear">Linear</option>
                    <option>Ease</option>
                    <option>Ease-In</option>
                    <option>Ease-Out</option>
                    <option>Ease-In-Out</option>
                </optgroup>
                <optgroup label="Make your own">
                    <option value="cubic-bezier">Cubic-Bezier</option>
                    <option>Steps</option>
                </optgroup>
                <optgroup label="Penner Equations">
                    <option>Cubic-Bezier</option>
                </optgroup>
                </select>
                <label class="pt-3 block mb-2 text-sm font-medium text-gray-900">Timing Function Values:</label>
                <input type="text" class="TIMING_FUNCTION_VALUES [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 mt-2.5" disabled onchange="validateTIMING_FUNCTION_VALUES(this)">
                <div>

                </div>
                <label for="DELAY" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Delay (second):</label>
                <input type="number" name="DELAY" class="DELAY [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" value=0>
                <label for="ITERATION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Iteration:</label>
                <div class="w-full flex justify-center relative" name="ITERATION">
                <input type="number" class="NOT_INF_ITERATION [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" value=1>
                <label class=" inline-flex items-center ml-3 cursor-pointer">
                    <input type="checkbox" value="" class="INF_ITERATION sr-only peer" onchange="get_iteration(this)">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900">Infinity</span>
                </label>
                </div>
                <label for="DIRECTION" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Direction:</label>
                <select class="DIRECTION bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option>Normal</option>
                <option>Reverse</option>
                <option>Alternate</option>
                <option>Alternate-reverse</option>
                </select>
                <label for="FILL_MODE" class="pt-3 block mb-2 text-sm font-medium text-gray-900">Fill Mode:</label>
                <select class="FILL_MODE bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option>None</option>
                <option>Forwards</option>
                <option>Backwards</option>
                <option>Both</option>
                </select>
            </form>
            </div>
            </div>
        </li>
        `);
        add_animations_to_option(temp_selected_id);
}

//Toggle list of animations
function toggle_animations_list(a) {
    $(".sub-menu > ul").not($(a).parent(".sub-menu").children("ul")).slideUp("100");
    $(".right").not($(a).find(".right")).removeClass('fa-caret-up').addClass('fa-caret-down');
	$(a).parent(".sub-menu").children("ul").slideToggle("100");
	$(a).find(".right").toggleClass("fa-caret-up fa-caret-down");
}

function close_animations_list(){
    $(".sub-menu > ul").slideUp("100");
    $(".right").removeClass('fa-caret-up').addClass('fa-caret-down');
}

//Remove animation
function remove_animations(a){
    $(a).parent().parent().parent().remove();
}

//change infinity iteration and back
function get_iteration(a){
    $(a).parent().parent().find('.NOT_INF_ITERATION').attr('disabled', function (_, attr) { return !attr });
}

//Load css to object from CSS file
async function loadCss() {
    try {
      const entrances_keyframe_animations = await fetch("../css/AnimatedME/entrances_keyframe_animations.css");
      const basic_keyframe_animations = await fetch("../css/AnimatedME/basic_keyframe_animations.css");
      const exits_keyframe_animations = await fetch("../css/AnimatedME/exits_keyframe_animations.css")
      let css = ((await entrances_keyframe_animations.text())+(await basic_keyframe_animations.text())+(await exits_keyframe_animations.text())).replaceAll('\r','')
      while(css.indexOf('/*')!=-1){
        css = css.slice(0, css.indexOf('/*')) + css.slice(css.indexOf('*/')+2);
      }
      css.split('\n').map(n=>n.trim()).filter(n => n != '').forEach(element => {
        css_list[element.slice(element.indexOf('@-webkit-keyframes ')+19, element.indexOf('{'))] = element
      });
    } catch (error) {
      console.error(error);
    }
}

//Get list of animations
function get_animations_lst(){
    list_of_animations = [];
    $("#ul_animations > li").each(function(_, li){
            let animation_name = $(li).find('.ANIMATION_NAME').val()
            let animation = $(li).find('.ANIMATION').find('button').find('.ANIMATION_VALUE').text().replaceAll(" ","-")
            // console.log($(li).find('.ANIMATION').find('button').find('.ANIMATION_VALUE').text())
            let duration = $(li).find('.DURATION').val()
            let timing_function = $(li).find('.TIMING_FUNCTION').find(":selected").val()
            let timing_function_values = $(li).find('.TIMING_FUNCTION_VALUES').val()
            let delay = $(li).find('.DELAY').val()
            let iteration = $(li).find('.peer').is(":checked") ? "infinite" : $(li).find('.NOT_INF_ITERATION').val()
            let direction = $(li).find('.DIRECTION').val()
            let fill_mode = $(li).find('.FILL_MODE').val()
            list_of_animations.push((duration + "s " + timing_function + timing_function_values + " " + delay + "s " + iteration + " " + direction + " " + fill_mode + " running " + animation).toLowerCase())
        })
    console.log(list_of_animations)
    return list_of_animations
}

//Update all animations
function update_animations(){
    let ani_str = get_animations_lst().join(", ")
    document.getElementById("preview_animation_object").style.animation = 'none';
    document.getElementById("preview_animation_object").offsetHeight; /* trigger reflow */
    document.getElementById("preview_animation_object").style.animation = ani_str;
}

//Get all animations
function get_animations(){
    $('#keyframes_list').html("")
    get_animations_lst().forEach(animation_data => {
        let animation_name = animation_data.split(' ').at(-1)
        
        $('#keyframes_list').append(`<div class="whitespace-nowrap">`+css_list[animation_name]+`   <div>`);
    })
    $('#animations_array').val(get_animations_lst().join(','))
}

//Get all available animations
function getAnimationList(css_id){
    // Return a list of all of the animation keyframes in all style sheets.
        var ss = $(css_id)[0].sheet;
        var anims = [];
            if (ss.cssRules) {
                // loop through all the rules
                for (var r = 0; r <ss.cssRules.length; r++) {
                    var rule = ss.cssRules[r];
                    if ((rule.type === window.CSSRule.KEYFRAMES_RULE || rule.type === window.CSSRule.WEBKIT_KEYFRAMES_RULE)) {
                        anims.push(rule);
                    }
                }
            }
        return anims;
    };
    
// Get animations's name
function getAnimationName(css_id){
    animList = getAnimationList(css_id);
    animList_name = [];
    for (var a = 0; a < animList.length; a++) {
        animList_name.push(animList[a].name)
    };
    return [...new Set(animList_name)];
}

//add animations to option groups
function add_animations_to_option(id){
    var animation_ul = $('#'+id).find('.ANIMATION').find('div').find('ul');
    for (let animation_type in animations_list) {
        animation_ul.append(`<li><ul>
            <li id="${animation_type}" class='sub-menu'>
            <a onclick="toggle_animations_list(this)">${animation_type.toUpperCase()}
                <div class='fa fa-caret-down right'></div>
            </a>
			<ul style="display: none">
            </ul>
            </li>
            </ul></li>`); 
        for (let animation in animations_list[animation_type]){
            animation_li_str = "";
            // console.log(animations_list[animation_type][animation])
            for (let animation_name in animations_list[animation_type][animation]){
            animation_li_str +=`
            <li @click="selected = '`+animations_list[animation_type][animation][animation_name].replaceAll("-"," ")+`'; open = false; open_`+animation.replaceAll("-","_")+` = false">
            `+animations_list[animation_type][animation][animation_name].replaceAll("-"," ")+`
            </li>
            `
        }
        $("#" + animation_type + " > ul").append(`
            <li>
                        <div class="py-2 flex items-center justify-center">
                        <div
                            x-data="{ open_${animation.replaceAll("-","_")}: false}"
                            @click.away="open_${animation.replaceAll("-","_")} = false ;"
                            class="w-full relative"
                        >

                            <!-- Button -->
                            <button
                            type="button"
                            @click="open_${animation.replaceAll("-","_")} = !open_${animation.replaceAll("-","_")}"
                            class="w-full px-4 py-2 border border-gray-300 rounded flex items-center justify-between"
                            >
                            <span
                                class="overflow-hidden"
                            >${animation}</span>
                            <svg
                                class="ml-2 w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                                />
                            </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <div
                            x-show="open_${animation.replaceAll("-","_")}"
                            class="absolute mt-2 bg-white border rounded w-full z-10"
                            x-cloak
                            >
                            <ul
                                class="max-h-[140px] overflow-auto [&>li]:text-gray-500 [&>li]:px-4 [&>li]:py-2 hover:[&>li]:bg-gray-100 [&>li]:cursor-pointer"
                            >
                                `+animation_li_str+`
                            </ul>
                            </div>
                        </div>
                        </div>
                    </li>
            `)
        }
    }
}

//On change event of TIMING_FUNCTION
function setValueofTIMING_FUNCTION(a){
    // console.log($(a).find(":selected").val())
    if($(a).find(":selected").val().toLowerCase() == "cubic-bezier"){
        $(a).parent().find('.TIMING_FUNCTION_VALUES').prop("disabled", false)
        if($(a).parent().find('.TIMING_FUNCTION_VALUES').val() == ""){$(a).parent().find('.TIMING_FUNCTION_VALUES').val("\(0.1, 0.7, 1.0, 0.1\)")}
    }
    else if($(a).find(":selected").val().toLowerCase() == "steps"){
        $(a).parent().find('.TIMING_FUNCTION_VALUES').prop("disabled", false)
        if($(a).parent().find('.TIMING_FUNCTION_VALUES').val() == ""){$(a).parent().find('.TIMING_FUNCTION_VALUES').val("\(10, end\)")}
    }
    else{
        $(a).find('.TIMING_FUNCTION_VALUES').prop('disabled', true)
        $(a).parent().find('.TIMING_FUNCTION_VALUES').val("")
    }
    validateTIMING_FUNCTION_VALUES(a);
}

//validate value of TIMING_FUNCTION_VALUES
function validateTIMING_FUNCTION_VALUES(a){
    let value = $(a).parent().find('.TIMING_FUNCTION_VALUES').val().toLowerCase().replace(/^\D+|\D+$/g, "").replace(' ','').split(',')
    if (((value.length!=4) && $(a).parent().find('.TIMING_FUNCTION').find(":selected").val().toLowerCase()=="cubic-bezier") || ((value.length!=1 && value.length != 2) && $(a).parent().find('.TIMING_FUNCTION').find(":selected").val().toLowerCase()=="steps")){
        console.log(value)
        $(a).parent().find('.TIMING_FUNCTION_VALUES').removeClass("border-gray-300").addClass("border-red-300")
    }
    else{
        $(a).parent().find('.TIMING_FUNCTION_VALUES').removeClass("border-red-300").addClass("border-gray-300")
    }
}

//check if user is using phone or laptop (true if phone and vice versa)
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

//Copy to clipboard
function copyToClipBoard(type_str){
    try {
        navigator.clipboard.writeText(
            type_str==="animation" ?
            get_animations_lst().join(", "): //get animation styles
            get_animations_lst().map(animation_data => css_list[animation_data.split(' ').at(-1)]).join("\n") //get animation keyframe
        )
      } catch (err) {
        console.log(err);
      }
}