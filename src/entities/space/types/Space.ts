// Модель домена (используется в приложении)
export interface Space {
  id: string;
  name: string;
  rocketName: string | null;
  image: string | null;
  description: string | null;
  launchYear: string;
}

// Тип ответа от SpaceX API (DTO)
export interface SpaceApiResponse {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  links: {
    mission_patch_small: string | null;
    mission_patch: string | null;
  };
  details: string | null;
}