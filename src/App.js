import React, {useEffect, useState} from "react";

const App = () => {
	const [songs, setSongs] = useState(0);
	//const [query, setQuery] = useState("default");

	//populate app with top 10 songs by default
	useEffect(() => {
		getSongs();
	});

	async function getSongs() {
		const loadingMessage = document.querySelector(".loading");
		const errorMessage = document.querySelector(".error");

		fetch(`https://itunes.apple.com/us/rss/topsongs/limit=100/json`)
			.then(async response => {
				const data = await response.json();
				//remove loading message
				loadingMessage.style.display = "none";
				//check error response
				if (response.ok) {
					for (let i = 0 ; i < 30 ; i++) {
						console.log("artist: " + data.feed.entry[i]['im:artist'].label);
						console.log("title: " + data.feed.entry[i].title.label);
						console.log("price: " + data.feed.entry[i]['im:price'].label);
						console.log("img url: " + data.feed.entry[i]['im:image'][2].label);
					}
				}
				else {
					//get error message
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
			})
			.catch(error => {
				//display error message - remove loading message
				errorMessage.style.display = "block";
				loadingMessage.style.display = "none";
				console.log("there was an error: " + error);
			});
	}

	return (
		<div>
			<header>
				<p className="loading">LOADING...</p>
				<p className="error">ERROR</p>
				<button onClick={() => setSongs(songs + 1)}>click moi</button>
			</header>
		</div>
	);
}

export default App;
