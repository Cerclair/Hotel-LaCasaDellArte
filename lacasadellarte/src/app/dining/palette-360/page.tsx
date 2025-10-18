import { restaurants } from '@/lib/data';
import RestaurantPage from '@/components/RestaurantPage';

export default function Palette360Page() {
  const restaurant = restaurants.find(r => r.slug === 'palette-360')!;
  return <RestaurantPage restaurant={restaurant} />;
}
