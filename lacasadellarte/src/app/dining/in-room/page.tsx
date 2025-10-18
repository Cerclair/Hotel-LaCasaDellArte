import { restaurants } from '@/lib/data';
import RestaurantPage from '@/components/RestaurantPage';

export default function InRoomDiningPage() {
  const restaurant = restaurants.find(r => r.slug === 'in-room')!;
  return <RestaurantPage restaurant={restaurant} />;
}
