import { Link } from "react-router";
import '../app.css';

export default function Home() {
  return (
    <>
      <h1 className="title-accueil">Accueil</h1>
        <Link to="/item/add">
          Ajouter un item
        </Link>
        <Link to="/item/list">
          Voir la liste des items
        </Link>

    </>
  );
}
