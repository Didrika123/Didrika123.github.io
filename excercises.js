//1

setInterval(UpdateTime, 1000);
UpdateTime();

function UpdateTime()
{
    this.set
    let time = document.getElementById("time-label");
    let now = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    time.innerHTML =  days[now.getDay()] + ", " + now.toLocaleString();
   
}


let replying;
let counterReplies = ["whats up dog?", "Soup my dude"];
let chatAsk = setInterval(ChatBotAsk, 8888);
function ChatBot()
{
    let input = document.getElementById("userinput").value;
    document.getElementById("userinput").value = "";
    document.getElementById("chat").innerHTML += "<p style='text-align: right;'>" + input + "</p>";

    //array[chatCount++] = input;

    clearInterval(chatAsk);
    clearTimeout(replying);
    replying = setTimeout(ChatBotReply, Math.random() * 1000 + 1000, input);

    CutOffHistory();
}
function ChatBotAsk()
{
    let index = Math.floor(Math.random() * counterReplies.length);
    document.getElementById("chat").innerHTML += "<p>Tim: " + counterReplies[index] + "</p>";
    CutOffHistory();
}
function ChatBotReply(input)
{
    let reply = "";
    switch (input.toLowerCase()) 
    {
        case "hey":
        case "hello":
            reply = "Hello";
            break;
        case "how are you?":
            reply = "im fine"
            break;
        default:
            if(input.includes("?")){
                reply = "hmm, maybe";
                counterReplies[counterReplies.length] = input;
            }
            else
                reply = "nice";
            break;
    }
    document.getElementById("chat").innerHTML += "<p>Tim: " + reply + "</p>";
    CutOffHistory();
}

function CutOffHistory()
{
    var myobj = document.getElementById("chat");
    if(myobj.children.length > 9){
        myobj.children[0].remove(); 
    }
}
