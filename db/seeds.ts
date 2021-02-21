import db from "./index"
import faker from "faker"
import { SecurePassword } from "blitz"

/*
 * This seed function is executed when you run `blitz db seed`.
 */
const seed = async () => {
  const hashedPassword = await SecurePassword.hash("my-secret-password")

  const user = await db.user.create({
    data: {
      email: faker.internet.email(),
      hashedPassword,
      role: "USER",
    },
  })

  const list = await db.list.create({
    data: {
      name: faker.lorem.word(10),
      userId: user.id,
    },
  })

  for (let i = 0; i < 5; i++) {
    await db.item.create({
      data: {
        name: faker.lorem.word(8),
        listId: list.id,
      },
    })
  }
}

export default seed
