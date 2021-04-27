fetch("https://newsapi.org/v2/top-headlines?country=jp&apiKey=NEWSAPI_KEY", {
	method: "GET",
	headers: {
		
	},
	mode: 'cors'
})
	.then(response => {
		return response.json();
	})
.then(result => {
  console.log('Success:', result);
})
.catch(err => {
	console.error(err);
});

console.log("testjson: ", testjson);
