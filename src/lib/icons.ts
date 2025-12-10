import {
  Code,
  ShoppingCart,
  Briefcase,
  TrendingUp,
  Server,
  Video,
  LucideIcon
} from 'lucide-react';

export function getIconComponent(iconName: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    code: Code,
    'shopping-cart': ShoppingCart,
    briefcase: Briefcase,
    'trending-up': TrendingUp,
    server: Server,
    video: Video,
  };

  return icons[iconName] || Code;
}
