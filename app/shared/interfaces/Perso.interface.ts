export interface PersoI {
  id?: number,
  pseudo?: string;
  title?: string;
  job?: string;
  stats: {
    strength: number;
    dexterity: number;
    luck: number;
    intelligence: number;
    wisdom: number;
  };
  stat_strength?: number,
  stat_dexterity?: number,
  stat_luck?: number,
  stat_intelligence?: number,
  stat_wisdom?: number,
  creation_date?: string,
}