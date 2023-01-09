import React from 'react';
import Search from './components/Search';
import "./styles/App.css"
import Logo from './img1.jpeg';

export default function App() {
  return (
    <div className="App">
      <header className="Header">
        <img src={Logo} className="Logo" />
        <div className="Title-Description">
          <h1 className="Title">Shakesearch</h1>
          <p className="Description">
            Welcome to Shakesearch! An online search tool for words or phrases
            in some of Shakespeare's works. Try searching for words like
            "merchandise". You can also use multiple words ex. "infectious
            pestilence". Unselect Exact Match if you would like to search for
            the terms separately.
          </p>
        </div>
      </header>

      <Search />
    </div>
  );
}
