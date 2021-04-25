fetch("https://newsapi.org/v2/top-headlines?country=jp&apiKey=77d742fa02a64efab928eca4132e20cb", {
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

// 77d742fa02a64efab928eca4132e20cb