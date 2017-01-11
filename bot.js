
/////////////////////////////////////////
//English - Turkish Twitter Bot
//@author : Ismet Said Calik
//@contact : ismetsaid.calik@gmail.com
//@website : http://calik.me
/////////////////////////////////////////

console.log('English - Turkish Twiiter Bot');
console.log('The bot is starting..');
const loadJsonFile = require('load-json-file');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
var stream = T.stream('user');

stream.on('follow',followed);

tweetWord();

setInterval(tweetWord,1000*60*5);

function tweetWord() {
	
	loadJsonFile('./en-tr.json').then(json => {
    select_id = Math.floor(Math.random() * (61196 - 1 + 1)) + 1;
    select_id2 = Math.floor(Math.random() * (61196 - 1 + 1)) + 1;
    function selectWord(id,id2) {
      return (json[id-1].English + " : " + json[id-1].Turkish + "\n" + json[id2-1].English + " : " + json[id2-1].Turkish);
    }
    k = selectWord(select_id,select_id2);
    //console.log(k);
    tweetIt(k);
    
});
}

function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	var user_id = eventMsg.source.id;

	//tweetIt('@' + screenName + ' Takip ettiğin için teşekkürler, mobil bildirimleri açmayı unutma!');

	follow_user(user_id);
}

function follow_user(user_id) {
	T.post('friendships/create',{ user_id });
	console.log("New Followers!");
}

function tweetIt(txt) {
	var tweet = {
	status : txt
	
	}
	T.post('statuses/update',tweet,tweeted);
	function tweeted(err,data,response) {
		if (err) {
			console.log("Something went wrong on tweet!" + err);
		}
		else{
			console.log("It Works!");
		}
	}
}
