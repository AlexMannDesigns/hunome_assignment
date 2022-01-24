import React, {useEffect, useState} from "react";
import Song from "./Song.jsx";

const App = () => {
	const [songs, setSongs] = useState([]);
	const [type, setType] = useState(false);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("");

	//populate app with top 30 songs by default. Re-render results if 'type' changes
	//useEffect's 2nd parameter should stop repetitive calls to API, and monitors changes to type and search
	useEffect(() => {
		getSongs();
	}, [type, query]); // eslint-disable-line react-hooks/exhaustive-deps

	async function getSongs() {
		const loadingMessage = document.querySelector(".loading");
		const errorMessage = document.querySelector(".error");
		const songsOrAlbums = type ? "albums" : "songs";
		fetch(`https://itunes.apple.com/us/rss/top${songsOrAlbums}/limit=100/json`)
			.then(async response => {
				const data = await response.json();
				//remove loading message
				loadingMessage.style.display = "none";
				//check error response
				if (response.ok) {
					//pus JSON data into an array so it can be mapped as a component
					let songArr = [];
					for (let i = 0 ; i < 30 ; i++) {
						if (query.length) { //clicking search with an empty search bar returns default results
							if (data.feed.entry[i]['im:artist'].label.includes(query)) //check if artist name contains search term (case sensitive)
								songArr.push(data.feed.entry[i]);
						} else
							songArr.push(data.feed.entry[i]);
					}
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
		setType(e.target.checked); //useEffect will re-render our results due to its second parameter changing
	}

	function getSearch(e) {
		e.preventDefault();
		setQuery(search); //sets query to inputted text (see updateSearch function)
		setSearch(""); //resets search bar
	}

	function updateSearch(e) {
		setSearch(e.target.value); //updates search variable with text from searchbar
	}

	return (
		<div>
			<header>
				<form className="search-form" onSubmit={getSearch}>
					<div className="toggle-container">
						<span>Singles</span>
						<input type="checkbox" id="selector" className="toggle" onChange={changeResults}/>
    					<label for="selector" className="label">
							<div className="ball"></div>
						</label>
      					<span>Albums</span>
					</div>
					<div>
						<h1>iTunes Top 30</h1>
					</div>
					<div>
						<input className="search-bar" type="text" onChange={updateSearch} value={search} placeholder="Search artists (case-sensitive)..." />
						<button className="search-button" type="submit">Search</button>
					</div>
				</form>
			</header>
			<p className="loading">LOADING...</p>
			<div className="error">
				<p>ERROR</p>
				<button onClick={() => getSongs}>RETRY</button>
			</div>
			<div className="main">
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
