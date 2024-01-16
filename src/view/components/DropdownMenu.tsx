import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../app/utils/cn';

export function DropdownMenuRoot({children}: { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  )
}

export function DropdownMenuTrigger({children}: { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none">
      {children}
    </RdxDropdownMenu.Trigger>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuContent({children, className}: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          className
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  )
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string
}

export function DropdownMenuItem({children, className}: DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      className={cn(
        "min-h-[48px] outline-none flex items-center py-2 p-4 text-sm text-gray-800 hover:bg-gray-50 rounded-2xl transition-colors",
        className
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
}
