import { Queue } from "quirrel/blitz"
import { followUpMailer } from "mailers/followUpMailer"

export default Queue(
  "api/follow-up-email", // 👈 the route that it's reachable on
  async (to: string) => {
    await followUpMailer({ to }).send()
  }
)
