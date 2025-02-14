import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import type { PersoI } from "~/shared/interfaces/Perso.interface";
import DeletePerso from "~/components/deletePerso/DeletePerso";
import { PersoContext } from "~/shared/contexts/PersoContext";

export default function ShowPersos() {
  let { setPerso } = useContext(PersoContext);

  let [persos, setPersos] = useState([]);

  useEffect(() => {
    if (persos.length <= 0) {
      fetchPersos();
    }
  }, [persos]);

  const fetchPersos = async () => {
    await fetch("http://127.0.0.1:5500/perso/get/list", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error(
            "Le statut de la requête n'est pas valide."
          );
        }

        if (!datas.persos) {
          throw new Error(
            "Aucun personnage n'a été retourné."
          );
        }

        let persosList = datas.persos.map(
          (perso: PersoI) => {
            perso = {
              id: perso.id,
              pseudo: perso.pseudo,
              title: perso.title,
              job: perso.job,
              stats: {
                strength: perso.stat_strength ?? 0,
                dexterity: perso.stat_dexterity ?? 0,
                luck: perso.stat_luck ?? 0,
                intelligence: perso.stat_intelligence ?? 0,
                wisdom: perso.stat_wisdom ?? 0,
              },
              creation_date: perso.creation_date,
            };
            return perso;
          }
        );

        setPersos(persosList);
      })
      .catch((err) => console.error(err));
  };

  const updatePersoContext = (perso: PersoI) => {
    setPerso(perso);
  }

  return (
    <section className="main-sections">
      {persos.length > 0 &&
        persos.map((perso: PersoI) => (
          <article
            className="main-articles"
            key={perso.id}
          >
            <h2 className="main-articles-title">
              {perso.pseudo}, {perso.title}
            </h2>
            <p>{perso.job}</p>
            <ul className="stats-list">
              <li>Force : {perso.stats.strength}</li>
              <li>Agilité : {perso.stats.dexterity}</li>
              <li>Chance : {perso.stats.luck}</li>
              <li>
                Intelligence : {perso.stats.intelligence}
              </li>
              <li>Sagesse : {perso.stats.wisdom}</li>
            </ul>
            <Link
              to={`/perso/update/${perso.id}`}
              onClick={() => updatePersoContext(perso)}
            >
              Modifier
            </Link>

            <DeletePerso persoId={perso.id} />
          </article>
        ))}
    </section>
  );
}
