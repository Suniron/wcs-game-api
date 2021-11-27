import React, { useState, useEffect } from "react";

const Game = ({ infos }) => (
  <div className="rounded shadow-lg w-72 p-2 m-3 border-2 place-self-center">
    <h2 className="text-xl">{infos.name}</h2>
    <img className="rounded" src={infos.background_image} alt={infos.name} />
    <button className="w-full rounded px-2 py-1 mt-1 font-bold bg-gray-500 text-white hover:bg-gray-600">
      <a href={`/game/${infos.id}`}>Plus d'informations</a>
    </button>
  </div>
);

const GameList = () => {
  const [games, setGames] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    fetch("https://apis.wilders.dev/wild-games/games")
      .then((response) => response.json())
      .then((json) => setGames(json));
  }, []);

  return (
    <div className="py-2">
      <button
        className="rounded px-2 py-1 bg-gray-500 text-white hover:bg-gray-600"
        type="button"
        onClick={() => setIsFiltered(!isFiltered)}
      >
        {!isFiltered
          ? "Filtrer les meilleurs jeux"
          : "Ne pas filtrer les meilleurs jeux"}
      </button>
      <h1 className="text-4xl py-2">Liste des jeux :</h1>
      <div className="flex flex-wrap place-content-center">
        {isFiltered
          ? games
              .filter((game) => game.rating >= 4.5)
              .map((game) => <Game key={game.id} infos={game} />)
          : games.map((game) => <Game key={game.id} infos={game} />)}
      </div>
    </div>
  );
};

export default GameList;
