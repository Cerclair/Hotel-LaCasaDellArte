import { restaurants } from '@/lib/data';
import RestaurantPage from '@/components/RestaurantPage';

export default function LumierePage() {
  const restaurant = restaurants.find(r => r.slug === 'lumiere')!;
  return <RestaurantPage restaurant={restaurant} />;
}
