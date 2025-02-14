import { Link } from "react-router";
import AddItem from "~/components/AddItem/AddItem";
import '../app.css';

export default function ShowAddForm() {
  return (
    <>
      <Link to="/" className="btn-back">Retour à l'accueil</Link>
      <AddItem />
    </>
  );
}