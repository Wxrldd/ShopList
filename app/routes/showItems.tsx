import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import type { ItemI } from "~/shared/interfaces/Item.interface";
import DeleteItem from "~/components/deleteItem/DeleteItem";
import { ItemContext } from "~/shared/contexts/ItemContext";

export default function ShowItems() {
  let { setItem } = useContext(ItemContext);

  let [items, setItems] = useState<ItemI[]>([]);

  useEffect(() => {
    if (items.length <= 0) {
      fetchItems();
    }
  }, [items]);

  const fetchItems = async () => {
    await fetch("http://127.0.0.1:5500/item/get/list", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error("Le statut de la requête n'est pas valide.");
        }

        if (!datas.items) {
          throw new Error("Aucun item n'a été retourné.");
        }

        let itemsList = datas.items.map((item: ItemI) => {
          item = {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            created_at: item.created_at,
          };
          return item;
        });

        setItems(itemsList);
      })
      .catch((err) => console.error(err));
  };

  const updateItemContext = (item: ItemI) => {
    setItem(item);
  };

  return (
    <>
    <section className="main-sections">
      {items.length > 0 &&
        items.map((item: ItemI) => (
          <article className="main-articles" key={item.id}>
            <h2 className="main-articles-title">{item.name}</h2>
            <p>Quantité : {item.quantity}</p>
            <p>Date de création : {item.created_at}</p>
            <Link to={`/item/update/${item.id}`} onClick={() => updateItemContext(item)}>
              Modifier
            </Link>
            <DeleteItem itemId={item.id} />
          </article>
        ))}
    </section>
      <Link to="/" className="btn-back">Retour à l'accueil</Link>
</>
    
  );
}
