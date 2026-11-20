import { expect, test } from "bun:test"
import { attachmentsOf, rememberImages } from "./attachments"

const row = (messageId: string) => ({ type: "user_message", text: "x", messageId }) as Parameters<typeof attachmentsOf>[0]

test("identical text does not attach another message's image", () => {
  rememberImages("image-owner", [{ mimeType: "image/png", data: "owner-bytes" }])
  expect(attachmentsOf({ type: "user_message", text: "same", clientMessageId: "image-owner" })).toEqual([{ mimeType: "image/png", data: "owner-bytes" }])
  expect(attachmentsOf({ type: "user_message", text: "same", messageId: "someone-else" })).toEqual([])
})

test("only the newest messages' image bytes are kept; older ones fall back to their mime type", () => {
  for (let i = 0; i < 12; i++) rememberImages(`m${i}`, [{ data: `bytes${i}`, mimeType: "image/png" }])
  expect(attachmentsOf(row("m11"))).toEqual([{ mimeType: "image/png", data: "bytes11" }])
  expect(attachmentsOf(row("m2"))).toEqual([{ mimeType: "image/png", data: "bytes2" }])
  expect(attachmentsOf(row("m1"))).toEqual([{ mimeType: "image/png" }])
  expect(attachmentsOf(row("m0"))).toEqual([{ mimeType: "image/png" }])
})
