import React, { useEffect } from "react";
import { useParams } from "react-router";

const GameDetail = () => {
  const [infos, setInfos] = React.useState();
  const [isError, setIsError] = React.useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      // Effectuer la requête:
      const request = await fetch(
        `https://apis.wilders.dev/wild-games/games/${id}`
      );

      // Si le résultat de la requête est une erreur, on affiche un message d'erreur:
      if (request.status !== 200) {
        setIsError(true);
      }

      // Récupérer les données et les sauvegarder dans le state:
      setInfos(await request.json());
    })();
  }, [id]);

  // Si erreur de requête:
  if (isError) {
    return (
      <div>
        Une erreur est survenue avec la récupération des infos pour ce jeu...
      </div>
    );
  }

  // Si pas d'erreur de requête mais pas encore de données récup:
  if (!infos) {
    return <div>Chargement des infos...</div>;
  }

  // Sinon, si tout est OK:
  return (
    <div>
      <h1 className="text-4xl">{infos.name}</h1>
      <img className="rounded" src={infos.background_image} alt={infos.name} />
      <h2 className="text-3xl">Infos sur le jeu</h2>
      <ul>
        <li>
          Note: <b>{infos.rating}/5</b>
        </li>
        <li>
          Date de sortie: <b>{infos.released}</b>
        </li>
        <li>
          Catégories: <b>{infos.genres.map((g) => g.name).join(", ")}</b>
        </li>
      </ul>
    </div>
  );
};

export default GameDetail;
