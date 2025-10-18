import { restaurants } from '@/lib/data';
import RestaurantPage from '@/components/RestaurantPage';

export default function DipintaPage() {
  const restaurant = restaurants.find(r => r.slug === 'dipinta')!;
  return <RestaurantPage restaurant={restaurant} />;
}
