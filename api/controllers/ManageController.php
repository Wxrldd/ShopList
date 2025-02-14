<?php
class ManageController{

  public function Index(){
    http_response_code(200);
    echo json_encode([
      "message" => "Hello World !",
      "status" => 200
    ]);
    exit;
  }

}