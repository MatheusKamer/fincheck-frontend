import * as Dialog from '@radix-ui/react-dialog';

export function Modal() {
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50"/>
        <Dialog.Content>
          <h1>Modal está aqui</h1>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
