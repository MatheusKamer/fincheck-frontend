import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

export function LaunchScreen() {
  return (
    <div className="bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center rounded-2xl border-white border-4">
      <div className="flex flex-col items-center gap-2">
        <Logo className="h-6 text-white" />
        <Spinner className="h-6 text-teal-900 fill-white"/>
      </div>
    </div>
  )
}
