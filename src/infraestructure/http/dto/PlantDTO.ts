export type State = 'new' | 'comming_soon' | 'out_of_stock' | 'default';

export interface PlantDTO {
  id: string;
  name: string;
  binomial_name: string;
  image_url: string;
  price: number;
  height_cm: number;
  week_waterings: number;
  fertilizer_type: string;
  status: State;
}
