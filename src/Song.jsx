import React from "react";
import "./song.css";

const Song = (props) => {

	function truncateString(str) {
		if (str.length > 30)
			return str.slice(0, 30) + "...";
		return str;
	}

	let title = truncateString(props.title.substring(0, props.title.indexOf('-') - 1));
	let artist = truncateString(props.artist);

	return (
		<div data-testid="song" className="music-container">
		<h2>{title}</h2>
		<p><em>by {artist}</em></p>
		<p><strong>{props.price}</strong></p>
		<img src={props.imageURL} alt="cover art"></img>
		</div>
	)
}

export default Song;