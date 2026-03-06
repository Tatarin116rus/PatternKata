import type { Space, SpaceApiResponse } from '../types/Space.ts';
// Базовый URL можно вынести в shared/config
const BASE_URL = 'https://api.spacexdata.com/v3/launches';


const mapApiResponseToSpace = (item: SpaceApiResponse): Space => ({
  id: String(item.flight_number),
  name: item.mission_name,
  rocketName: item.rocket?.rocket_name ?? null,
  image: item.links?.mission_patch_small ?? null,
  description: item.details ?? null,
  launchYear: item.launch_year,
});

export const fetchSpacesByYear = async (year: string = '2020'): Promise<Space[]> => {
  const response = await fetch(`${BASE_URL}?launch_year=${year}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: SpaceApiResponse[] = await response.json();
  return data.map(mapApiResponseToSpace);
};
/*
// Если нужен один запуск по ID, можно добавить отдельную функцию
export const fetchSpaceById = async (id: string): Promise<Space> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: SpaceApiResponse = await response.json();
  return mapApiResponseToSpace(data);
};*/