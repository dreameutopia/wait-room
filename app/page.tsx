import WaitingRoom from "../waiting-room"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WaitingRoom />
    </Suspense>
  )
}
