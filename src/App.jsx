import React, {useEffect, useState} from "react";
import Song from "./Song.jsx";

const App = () => {
	const [songs, setSongs] = useState([]);
	const [type, setType] = useState(false);

	//populate app with top 30 songs by default. Re-render results if 'type' changes
	useEffect(() => {
		getSongs();
	}, [type]);

	async function getSongs() {
		const loadingMessage = document.querySelector(".loading");
		const errorMessage = document.querySelector(".error");
		const songsOrAlbums = type ? "albums" : "songs";
		console.log("test to see if this only runs once"); //useEffect's second parameter should stop repetitive calls
		fetch(`https://itunes.apple.com/us/rss/top${songsOrAlbums}/limit=100/json`)
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

	function changeResults(e) {
		setType(e.target.checked);
		//useEffect will re-render our results due to its second parameter changing
	}

	return (
		<div>
			<header>
				<input type="checkbox" id="selector" className="toggle" onChange={changeResults}></input>
    			<label for="selector" className="label">
					<div className="ball"></div>
				</label>
      			<span>Albums</span>
			</header>
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
