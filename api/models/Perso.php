<?php
class Perso{
  private int $id;
  private string $pseudo;
  private string $title;
  private string $job;
  private string $stat_strength;
  private string $stat_dexterity;
  private string $stat_luck;
  private string $stat_intelligence;
  private string $stat_wisdom;
  private string $creation_date;

  private $bdd;

  public function __construct($bdd = null){
    if(!is_null($bdd)){
      $this->setBdd($bdd);
    }
  }

  public function getId(): int{
    return $this->id;
  }

  public function setId(int $id){
    $this->id = $id;
  }

  public function getPseudo(): string{
    return $this->pseudo;
  }

  public function setPseudo(string $pseudo){
    $this->pseudo = $pseudo;
  }

  public function getTitle(): string{
    return $this->title;
  }

  public function setTitle(string $title){
    $this->title = $title;
  }

  public function getJob(): string{
    return $this->job;
  }

  public function setJob(string $job){
    $this->job = $job;
  }

  public function getStatStrength(): string{
    return $this->stat_strength;
  }

  public function setStatStrength(string $stat_strength){
    $this->stat_strength = $stat_strength;
  }

  public function getStatDexterity(): string{
    return $this->stat_dexterity;
  }

  public function setStatDexterity(string $stat_dexterity){
    $this->stat_dexterity = $stat_dexterity;
  }

  public function getStatLuck(): string{
    return $this->stat_luck;
  }

  public function setStatLuck(string $stat_luck){
    $this->stat_luck = $stat_luck;
  }

  public function getStatIntelligence(): string{
    return $this->stat_intelligence;
  }

  public function setStatIntelligence(string $stat_intelligence){
    $this->stat_intelligence = $stat_intelligence;
  }

  public function getStatWisdom(): string{
    return $this->stat_wisdom;
  }

  public function setStatWisdom(string $stat_wisdom){
    $this->stat_wisdom = $stat_wisdom;
  }

  public function getCreationDate(): string{
    return $this->creation_date;
  }

  public function setCreationDate(string $creation_date){
    $this->creation_date = $creation_date;
  }

  public function initPerso(array $perso){
    $pseudo = $perso["pseudo"];
    $title = $perso["title"];
    $job = $perso["job"];
    $stats = $perso["stats"];
    $this->setPseudo($pseudo);
    $this->setTitle($title);
    $this->setJob($job);
    $this->setStatStrength($stats["strength"]);
    $this->setStatDexterity($stats["dexterity"]);
    $this->setStatLuck($stats["luck"]);
    $this->setStatIntelligence($stats["intelligence"]);
    $this->setStatWisdom($stats["wisdom"]);
  }

  public function getAllProperties(){
    return [
      "pseudo" => $this->getPseudo(),
      "title" => $this->getTitle(),
      "job" => $this->getJob(),
      "stats" => [
        "strength" => $this->getStatStrength(),
        "dexterity" => $this->getStatDexterity(),
        "luck" => $this->getStatLuck(),
        "intelligence" => $this->getStatIntelligence(),
        "wisdom" => $this->getStatWisdom(),
      ],
    ];
  }

  public function add(
    string $pseudo,
    string $title,
    string $job,
    array $stats
  ){
    $req = $this->bdd->prepare("INSERT INTO persos(pseudo, title, job, stat_strength, stat_dexterity, stat_luck, stat_intelligence, stat_wisdom) VALUES(:pseudo, :title, :job, :strength, :dexterity, :luck, :intelligence, :wisdom)");
    $req->bindValue(":pseudo", $pseudo, PDO::PARAM_STR);
    $req->bindValue(":title", $title, PDO::PARAM_STR);
    $req->bindValue(":job", $job, PDO::PARAM_STR);
    $req->bindValue(":strength", $stats["strength"], PDO::PARAM_INT);
    $req->bindValue(":dexterity", $stats["dexterity"], PDO::PARAM_INT);
    $req->bindValue(":luck", $stats["luck"], PDO::PARAM_INT);
    $req->bindValue(":intelligence", $stats["intelligence"], PDO::PARAM_INT);
    $req->bindValue(":wisdom", $stats["wisdom"], PDO::PARAM_INT);
    if(!$req->execute()){
      return false;
    }
    $req->closeCursor();
    return true;
  }

  public function getList(){
    $req = $this->bdd->prepare("SELECT * FROM persos ORDER BY creation_date DESC");
    $req->execute();
    $persos = $req->fetchAll(PDO::FETCH_OBJ);
    if(!$persos){
      return null;
    }
    $req->closeCursor();
    return $persos;
  }

  public function getById(int $id){
    $req = $this->bdd->prepare("SELECT * FROM persos WHERE id=:id");
    $req->bindValue(":id", $id, PDO::PARAM_INT);
    $req->execute();
    $perso = $req->fetch(PDO::FETCH_OBJ);
    if(!$perso){
      return null;
    }
    return $perso;
  }

  public function update(array $perso){
    $req = $this->bdd->prepare("UPDATE persos SET 
    pseudo=:pseudo,
    title=:title,
    job=:job,
    stat_strength=:strength,
    stat_dexterity=:dexterity,
    stat_luck=:luck,
    stat_intelligence=:intelligence,
    stat_wisdom=:wisdom
    WHERE id=:id
    ");
    $req->bindValue(":id", $perso["id"], PDO::PARAM_INT);
    $req->bindValue(":pseudo", $perso["pseudo"], PDO::PARAM_STR);
    $req->bindValue(":title", $perso["title"], PDO::PARAM_STR);
    $req->bindValue(":job", $perso["job"], PDO::PARAM_STR);
    $req->bindValue(":strength", $perso["stats"]["strength"], PDO::PARAM_STR);
    $req->bindValue(":dexterity", $perso["stats"]["dexterity"], PDO::PARAM_STR);
    $req->bindValue(":luck", $perso["stats"]["luck"], PDO::PARAM_STR);
    $req->bindValue(":intelligence", $perso["stats"]["intelligence"], PDO::PARAM_STR);
    $req->bindValue(":wisdom", $perso["stats"]["wisdom"], PDO::PARAM_STR);
    if(!$req->execute()){
      return false;
    }
    return true;
  }

  public function deleteById(int $id){
    return $this->bdd->exec("DELETE FROM persos WHERE id={$id}");
  }

  private function setBdd($bdd){
    $this->bdd = $bdd;
  }
}