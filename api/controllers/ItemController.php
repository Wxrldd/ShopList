<?php
class ItemController
{
  public function Add(...$item)
  {
    $name = $item["name"] ?? null;
    $quantity = $item["quantity"] ?? null;

    if (!$name || !$quantity) {
      http_response_code(400);
      echo json_encode([
        "message" => "Une ou plusieurs valeurs ne sont pas définies.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $itemManager = new Item(BDD::getInstance($config->getConfig()));

    if ($itemManager->add($name, $quantity)) {
      http_response_code(200);
      $response = json_encode([
        "message" => "Ajout de l'item en base de données.",
        "status" => 200
      ]);
      echo $response;
      exit;
    }

    http_response_code(400);
    $response = json_encode([
      "message" => "Erreur lors de l'ajout de l'item en BDD.",
      "status" => 400
    ]);
    echo $response;
    exit;
  }

  public function ShowList()
  {
    $configManager = new Config();
    $itemManager = new Item(BDD::getInstance($configManager->getConfig()));
    $items = $itemManager->getList();
    if (!$items) {
      http_response_code(400);
      echo json_encode([
        "message" => "Aucun item trouvé.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Liste des items.",
      "status" => 200,
      "items" => $items
    ]);
    exit;
  }

  public function Show(...$params)
  {
    $id = $params["id"];

    if (!$id) {
      http_response_code(400);
      echo json_encode([
        "message" => "Le paramètre ID est invalide.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $itemManager = new Item(BDD::getInstance($config->getConfig()));

    $item = $itemManager->getById($id);
    if (!$item) {
      http_response_code(400);
      echo json_encode([
        "message" => "Une erreur s'est produite lors de la récupération de l'item.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Item récupéré.",
      "status" => 200,
      "item" => $item
    ]);
    exit;
  }

  public function Update(...$item)
  {
    $id = $item["id"] ?? null;
    $name = $item["name"] ?? null;
    $quantity = $item["quantity"] ?? null;

    if (!$id || !$name || !$quantity) {
      http_response_code(400);
      echo json_encode([
        "message" => "Les paramètres sont invalides.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $itemManager = new Item(BDD::getInstance($config->getConfig()));

    if (!$itemManager->update([
      "id" => $id,
      "name" => $name,
      "quantity" => $quantity,
    ])) {
      http_response_code(400);
      echo json_encode([
        "message" => "Une erreur s'est produite lors de la modification de l'item.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Mise à jour de l'item effectuée.",
      "status" => 200
    ]);
    exit;
  }

  public function Delete(...$params)
  {
    $id = $params["id"];

    $config = new Config();
    $itemManager = new Item(BDD::getInstance($config->getConfig()));

    if (!$itemManager->deleteById($id)) {
      http_response_code(400);
      echo json_encode([
        "message" => "La suppression de l'item a échouée.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "L'item n°{$id} a été supprimé.",
      "status" => 200
    ]);
    exit;
  }
}
