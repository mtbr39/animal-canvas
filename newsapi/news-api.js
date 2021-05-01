
const country = "jp";
const url = "https://newsapi.org/v2/top-headlines" + "?country=" + country + "&apiKey=77d742fa02a64efab928eca4132e20cb";
console.log(APIKEY);
//https://newsapi.org/v2/top-headlines?country=jp&apiKey=77d742fa02a64efab928eca4132e20cb
// fetch( url, {
// 	method: "GET",
// 	headers: {
		
// 	},
// 	mode: 'cors'
// })
// 	.then(response => {
// 		return response.json();
// 	})
// .then(result => {
//   console.log('Success:', result);
// })
// .catch(err => {
// 	console.error(err);
// });

console.log("testjson: ", testjson);
console.log("testjson: ", testjson["articles"][1]["title"]);


const infoArray = [];

infoArray.ホスト=location.host;
infoArray.ホスト名=location.hostname;
infoArray.ポート番号=location.port;
infoArray.URL=location.href;
infoArray.プロトコル情報=location.protocol;
infoArray.サーチ情報=location.search;
infoArray.ハッシュ=location.hash;
infoArray.ページURLのパス=location.pathname;
infoArray.ブラウザのコードネーム=location.appCodeName;
infoArray.ブラウザ名=navigator.appName;
infoArray.ブラウザのバージョン=navigator.appVersion;
infoArray.ブラウザの使用言語=navigator.language;
infoArray.ブラウザのプラットフォーム=navigator.platform;
infoArray.ブラウザのユーザーエージェント=navigator.userAgent;
infoArray.リファラー=document.referrer;
infoArray.ドメイン=document.domain;
infoArray.スクリーンの幅=screen.width;
infoArray.スクリーンの高さ=screen.height;
infoArray.スクリーンの色深度=screen.colorDepth+"bit";
infoArray.ブラウザのビューポートの幅 = window.innerWidth;
infoArray.ブラウザのビューポートの高さ = window.innerHeight;
infoArray.デバイスピクセル比 = window.devicePixelRatio;
infoArray.タッチ操作可能 = navigator.pointerEnabled;
infoArray.最大同時タッチ数 = navigator.maxTouchPoints;

console.log(infoArray);

// // const information=document.getElementById("information");
// for(key in infoArray){
//   information.innerHTML+=(key+":"+infoArray[key]+"<br>");
// }


