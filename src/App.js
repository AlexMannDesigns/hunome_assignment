import React, {useEffect, useState} from "react";

function App() {

	const [songs, setSongs] = useState(0);
	//const [query, setQuery] = useState("default");

	//populate app with top 10 songs by default
	useEffect(() => {
		getSongs();
	});

	async function getSongs() {
		const response = await fetch(`https://itunes.apple.com/us/rss/topsongs/limit=100/json`);
		const data = await response.json();
		console.log(data);
		for (let i = 0 ; i < 30 ; i++) {
			console.log("artist: " + data.feed.entry[i]['im:artist'].label);
			console.log("title: " + data.feed.entry[i].title.label);
			console.log("price: " + data.feed.entry[i]['im:price'].label);
			console.log("img url: " + data.feed.entry[i]['im:image'][2].label);
		}
	}

	return (
		<div>
			<header>
				<p>you clicked {songs} times! Isn't react fun?</p>
				<button onClick={() => setSongs(songs + 1)}>click moi</button>
			</header>
		</div>
	);
}

export default App;
