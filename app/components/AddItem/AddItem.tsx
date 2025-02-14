import { useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { ItemContext } from "~/shared/contexts/ItemContext";
import type { ItemI } from "~/shared/interfaces/Item.interface";
import '../../app.css';

export default function AddItem() {
  /**
   * - Afficher une confirmation de création d'item
   * - Afficher les détails de l'item
   * - Moduler les catégories pour les rendre dynamiques
   * - Idée : Génération du nom/quantité auto
   */

  let { MIN, MAX, item, setItem, categories, randomQuantity } = useContext(ItemContext);

  let navigate = useNavigate();

  let [category, setCategory] = useState("");

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!item.name || item.quantity <= 0) {
      throw new Error("Le nom ou la quantité de l'item est invalide.");
    }

    await fetch("http://127.0.0.1:5500/item/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        return response.json();
      })
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error("Le statut de la requête est invalide.");
        }
        navigate("/");
      })
      .catch((err) => console.error(`Erreur : ${err}`));
  };

  return (
    <form action="#" method="POST" onSubmit={submitForm}>
      <label htmlFor="name">Nom de l'item</label>
      <input
        type="text"
        name="name"
        onChange={(e) => {
          let newName = e.target.value ?? null;
          setItem((item: ItemI) => {
            item.name = newName;
            return item;
          });
        }}
        required
      />
      <label htmlFor="category">Catégorie</label>
      <select
        name="category"
        value={category}
        onChange={(e) => {
          setItem((item: ItemI) => {
            setCategory(e.target.value);
            item.category = e.target.value;
            randomQuantity(category);
            return item;
          });
        }}
        required
      >
        <option value="" selected disabled>
          -- Choisir une catégorie --
        </option>
        {categories.map((cat: any) => (
          <option value={cat.value} key={`${cat.name}-${cat.value}`}>
            {cat.name}
          </option>
        ))}
      </select>
      <label htmlFor="quantity">Quantité</label>
      <input
        type="number"
        name="quantity"
        value={item.quantity}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setItem((item: ItemI) => {
            item.quantity = Number(e.target.value);
            return item;
          });
        }}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
