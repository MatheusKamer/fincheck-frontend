import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../app/utils/cn';

export function Modal() {
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
            "data-[state=open]:animate-overlay-show",
          )}
        />
        <Dialog.Content
          className={cn(
            "w-full max-w-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
            "data-[state=open]:animate-content-show"
          )}
        >
          <h1>Modal está aqui</h1>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
