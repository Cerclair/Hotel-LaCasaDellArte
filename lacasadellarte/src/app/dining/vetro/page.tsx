import { restaurants } from '@/lib/data';
import RestaurantPage from '@/components/RestaurantPage';

export default function VetroPage() {
  const restaurant = restaurants.find(r => r.slug === 'vetro')!;
  return <RestaurantPage restaurant={restaurant} />;
}
