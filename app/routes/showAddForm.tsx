import { Link } from "react-router";
import AddPerso from "~/components/AddPerso/AddPerso";

export default function ShowAddForm() {
  return (
    <>
      <Link to="/">Retour à l'accueil</Link>
      <AddPerso />
    </>
  );
}