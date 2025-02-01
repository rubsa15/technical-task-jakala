export type State = 'new' | 'comming_soon' | 'out_of_stock' | 'default';

export interface Plant {
  id: string;
  name: string;
  binomialName: string;
  imgUrl: string;
  price: number;
  heightInCm: number;
  wateringsPerWeek: number;
  fertilizerType: string;
  status: State;
}
