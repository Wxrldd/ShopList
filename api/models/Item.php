<?php
class Item {
  private int $id;
  private string $name;
  private int $quantity;
  private string $created_at;

  private $bdd;

  public function __construct($bdd = null) {
    if (!is_null($bdd)) {
      $this->setBdd($bdd);
    }
  }

  public function getId(): int {
    return $this->id;
  }

  public function setId(int $id) {
    $this->id = $id;
  }

  public function getName(): string {
    return $this->name;
  }

  public function setName(string $name) {
    $this->name = $name;
  }

  public function getQuantity(): int {
    return $this->quantity;
  }

  public function setQuantity(int $quantity) {
    $this->quantity = $quantity;
  }

  public function getCreatedAt(): string {
    return $this->created_at;
  }

  public function setCreatedAt(string $created_at) {
    $this->created_at = $created_at;
  }

  public function initItem(array $item) {
    $name = $item["name"];
    $quantity = $item["quantity"];
    $this->setName($name);
    $this->setQuantity($quantity);
  }

  public function getAllProperties(): array {
    return [
      "name" => $this->getName(),
      "quantity" => $this->getQuantity(),
    ];
  }

  public function add(string $name, int $quantity): bool {
    $req = $this->bdd->prepare("INSERT INTO items(name, quantity) VALUES(:name, :quantity)");
    $req->bindValue(":name", $name, PDO::PARAM_STR);
    $req->bindValue(":quantity", $quantity, PDO::PARAM_INT);
    if (!$req->execute()) {
      return false;
    }
    $req->closeCursor();
    return true;
  }

  public function getList() {
    $req = $this->bdd->prepare("SELECT * FROM items ORDER BY created_at DESC");
    $req->execute();
    $items = $req->fetchAll(PDO::FETCH_OBJ);
    if (!$items) {
      return null;
    }
    $req->closeCursor();
    return $items;
  }

  public function getById(int $id) {
    $req = $this->bdd->prepare("SELECT * FROM items WHERE id=:id");
    $req->bindValue(":id", $id, PDO::PARAM_INT);
    $req->execute();
    $item = $req->fetch(PDO::FETCH_OBJ);
    if (!$item) {
      return null;
    }
    return $item;
  }

  public function update(array $item): bool {
    $req = $this->bdd->prepare("UPDATE items SET
      name=:name,
      quantity=:quantity
      WHERE id=:id
    ");
    $req->bindValue(":id", $item["id"], PDO::PARAM_INT);
    $req->bindValue(":name", $item["name"], PDO::PARAM_STR);
    $req->bindValue(":quantity", $item["quantity"], PDO::PARAM_INT);
    if (!$req->execute()) {
      return false;
    }
    return true;
  }

  public function deleteById(int $id): bool {
    $req = $this->bdd->prepare("DELETE FROM items WHERE id=:id");
    $req->bindValue(":id", $id, PDO::PARAM_INT);
    return $req->execute();
  }

  private function setBdd($bdd) {
    $this->bdd = $bdd;
  }
}
