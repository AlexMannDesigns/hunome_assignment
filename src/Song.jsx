import React from "react";

const Song = (props) => {
	return (
		<div>
		<h2>{props.title}</h2>
		<p><em>by {props.artist}</em></p>
		<p><strong>{props.price}</strong></p>
		<img src={props.imageURL} alt="cover art"></img>
		</div>
	)
}

export default Song;