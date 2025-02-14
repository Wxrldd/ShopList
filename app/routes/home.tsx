import { Link } from "react-router";
import '../app.css';

export default function Home() {
  return (
    <>

      <h1 className="title-accueil">Accueil</h1>
      <Link to="/manage">
          aller sur la page manage
        </Link>
    </>
  );
}
