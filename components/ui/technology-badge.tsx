import { Badge } from '@/components/ui/badge';
import { getLanguageIcon } from '@/lib/language-icons';
import { cn } from '@/lib/utils';

interface TechnologyBadgeProps {
  technology: string;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
  showIcon?: boolean;
  iconSize?: string;
}

export function TechnologyBadge({
  technology,
  variant = 'secondary',
  className,
  showIcon = true,
  iconSize = 'text-sm',
}: TechnologyBadgeProps) {
  const iconClass = getLanguageIcon(technology);

  return (
    <Badge
      variant={variant}
      className={cn('flex items-center gap-1.5 px-2 py-1 text-xs', className)}
    >
      {showIcon && <i className={cn(iconClass, iconSize, 'shrink-0')} />}
      <span>{technology}</span>
    </Badge>
  );
}
