import React, {useEffect, useState} from "react";
import Song from "./Song.jsx";

const App = () => {
	const [songs, setSongs] = useState([]);
	//const [query, setQuery] = useState("default");

	//populate app with top 100 songs by default
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
					//pus JSON data into an array so it can be mapped as a component
					let songArr = [];
					for (let i = 0 ; i < 30 ; i++)
						songArr.push(data.feed.entry[i]);
					setSongs(songArr);
					return ;
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
			<header></header>
			<p className="loading">LOADING...</p>
			<div className="error">
				<p>ERROR</p>
				<button onClick={() => getSongs}>RETRY</button>
			</div>
			<div>
				{songs.map((song, idx) => (
					<Song
					key={idx}
					artist={song['im:artist'].label}
					title={song.title.label}
					price={song['im:price'].label}
					imageURL={song['im:image'][2].label}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
