import React from 'react';
import ReactDOM from 'react-dom';
import Song from './../Song';
import {render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Song/>, div);
});
