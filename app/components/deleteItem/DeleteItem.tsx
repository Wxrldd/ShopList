import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import '../../app.css';

export default function DeleteItem({ ...props }: any) {
  let navigate = useNavigate();

  let [id, setId] = useState("");

  useEffect(() => {
    if (!id) {
      const { itemId } = props;
      setId(itemId);
    }
  }, [id, props]);

  const submitDeleteForm = async (e: any) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:5500/item/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error("Le statut de la requête n'est pas valide.");
        }
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form method="POST" onSubmit={submitDeleteForm}>
      <input type="hidden" value={id} name="id" />
      <button type="submit" className="delete-item">Supprimer</button>
    </form>
  );
}
