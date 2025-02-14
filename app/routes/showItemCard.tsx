import { useState, useContext } from "react";
import { Link } from "react-router";
import type { Route } from "../+types/root";
import type { ItemI } from "~/shared/interfaces/Item.interface";
import { ItemContext } from "~/shared/contexts/ItemContext";
import { useNavigate } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {

}

export default function ShowItemCard({ params }: Route.ComponentProps) {
  const { id } = params;

  let navigate = useNavigate();

  let { MIN, MAX, item, setItem, categories } = useContext(ItemContext);

  const submitUpdateForm = async (e: any) => {
    e.preventDefault();

    if (!item.name || item.quantity <= 0) {
      throw new Error("Le nom ou la quantité de l'item est invalide.");
    }

    await fetch("http://localhost:5500/item/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error("Le statut de la requête est invalide.");
        }

        navigate("/item/list");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
    <form action="#" method="POST" onSubmit={submitUpdateForm}>
      <label htmlFor="name">Nom de l'item</label>
      <input
        type="text"
        name="name"
        defaultValue={item.name}
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
        defaultValue={item.category}
        onChange={(e) => {
          setItem((item: ItemI) => {
            item.category = e.target.value;
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
        defaultValue={item.quantity}
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
      <input type="hidden" value={id} name="id" />
      <button type="submit">Mettre à jour</button>
    </form>
    <Link to="/" className="btn-back">Retour à l'accueil</Link>
    </>

  );
}
