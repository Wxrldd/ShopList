import { useEffect, useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { PersoContext } from "~/shared/contexts/PersoContext";
import type { PersoI } from "~/shared/interfaces/Perso.interface";

export default function AddPerso() {
  /**
   * - Afficher une confirmation de création de personnage
   * - Afficher la fiche du personnage
   * - Moduler les classes pour les rendre dynamiques
   * - Idée : Génération du pseudo/titre auto
   */

  let {MIN, MAX, perso, setPerso, jobs, randomStats} = useContext(PersoContext);

  let navigate = useNavigate();

  let [classPerso, setClassPerso] = useState("");

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !perso.pseudo ||
      !perso.title ||
      !perso.job ||
      perso.stats.strength <= 0 ||
      perso.stats.dexterity <= 0 ||
      perso.stats.luck <= 0 ||
      perso.stats.intelligence <= 0 ||
      perso.stats.wisdom <= 0
    ) {
      throw new Error(
        "Une (ou plusieurs) statistique est invalide."
      );
    }

    await fetch("http://127.0.0.1:5500/perso/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perso),
    })
      .then((response) => {
        return response.json();
      })
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error(
            "Le statut de la requête est invalide."
          );
        }
        navigate("/");
      })
      .catch((err) => console.error(`Erreur : ${err}`));
  };

  return (
    <form
      action="#"
      method="POST"
      onSubmit={submitForm}
    >
      <label htmlFor="pseudo">Pseudo</label>
      <input
        type="text"
        name="pseudo"
        onChange={(e) => {
          let newPseudo = e.target.value ?? null;
          setPerso((perso: PersoI) => {
            perso.pseudo = newPseudo;
            return perso;
          });
        }}
        required
      />
      <label htmlFor="title">Titre</label>
      <input
        type="text"
        name="title"
        onChange={(e) => {
          let newTitle = e.target.value ?? null;
          setPerso((perso: PersoI) => {
            perso.title = newTitle;
            return perso;
          });
        }}
        required
      />
      <label htmlFor="class">Choix de la classe</label>
      <select
        name="class"
        value={classPerso}
        onChange={(e) => {
          setPerso((perso: PersoI) => {
            setClassPerso(e.target.value);
            perso.job = e.target.value;
            randomStats(classPerso);
            return perso;
          });
        }}
        required
      >
        <option
          value=""
          selected
          disabled
        >
          -- Choisir une classe --
        </option>
        {jobs.map((item: any) => (
          <option
            value={item.value}
            key={`${item.name}-${item.value}`}
          >
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor="stat_force">Force</label>
      <input
        type="number"
        name="stat_force"
        value={perso.stats.strength}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setPerso((perso: PersoI) => {
            perso.stats.strength = Number(e.target.value);

            return perso;
          });
        }}
        required
      />
      <label htmlFor="stat_dexterity">Agilité</label>
      <input
        type="number"
        name="stat_dexterity"
        value={perso.stats.dexterity}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setPerso((perso: PersoI) => {
            perso.stats.dexterity = Number(e.target.value);

            return perso;
          });
        }}
        required
      />
      <label htmlFor="stat_luck">Chance</label>
      <input
        type="number"
        name="stat_luck"
        value={perso.stats.luck}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setPerso((perso: PersoI) => {
            perso.stats.luck = Number(e.target.value);

            return perso;
          });
        }}
        required
      />
      <label htmlFor="stat_intelligence">
        Intelligence
      </label>
      <input
        type="number"
        name="stat_intelligence"
        value={perso.stats.intelligence}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setPerso((perso: PersoI) => {
            perso.stats.intelligence = Number(e.target.value);

            return perso;
          });
        }}
        required
      />
      <label htmlFor="stat_wisdom">Sagesse</label>
      <input
        type="number"
        name="stat_wisdom"
        value={perso.stats.wisdom}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setPerso((perso: PersoI) => {
            perso.stats.wisdom = Number(e.target.value);

            return perso;
          });
        }}
        required
      />
      <button type="submit">Créer</button>
    </form>
  );
}
