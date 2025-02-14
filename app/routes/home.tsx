import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Accueil" },
    { name: "description", content: "Bienvenue sur l'application React PHP Coda." },
  ];
}

export default function Home() {
  return <>
    <Link to="/perso/add">
      Ajouter un personnage
    </Link>
    <Link to="/perso/list">
      Voir la liste des personnages
    </Link>
  </>;
}
