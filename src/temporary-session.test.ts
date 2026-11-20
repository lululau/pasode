import { expect, test } from "bun:test"
import { hasInitialMessage, putSession, removeSession, temporaryRows, temporaryTimes, temporaryVisible, visibleSession, type TemporarySession } from "./temporary-session"
import type { AgentTimelineItem } from "./timeline"

const image = { data: "bytes", mimeType: "image/png" }
const session: TemporarySession = {
  input: { text: "hello", images: [image] },
  snapshot: { text: "hello", images: [image], pasted: [] },
  messageId: "client-1", navigation: 3, status: "creating",
}

test("pending creation belongs only to the navigation that submitted it", () => {
  expect(temporaryVisible(session, undefined, 3)).toBe(true)
  expect(temporaryVisible(session, undefined, 4)).toBe(false)
  expect(temporaryVisible(session, "other", 3)).toBe(false)
  const created = { ...session, agentId: "created", status: "opening" as const }
  expect(temporaryVisible(created, "created", 4)).toBe(true)
  expect(temporaryVisible(created, "other", 4)).toBe(false)
})

test("temporary row bridges loading and yields to the real initial message", () => {
  const created = { ...session, agentId: "created", status: "opening" as const }
  const stale: AgentTimelineItem[] = [{ type: "user_message", text: "old session" }]
  expect(temporaryRows(created, stale, "old")).toEqual([{ type: "user_message", text: "hello", clientMessageId: "client-1" }])
  const response: AgentTimelineItem = { type: "assistant_message", text: "working" }
  expect(temporaryRows(created, [response], "created")).toEqual([{ type: "user_message", text: "hello", clientMessageId: "client-1" }, response])
  const initial: AgentTimelineItem = { type: "user_message", text: "hello", clientMessageId: "client-1" }
  expect(temporaryRows(created, [initial, response], "created")).toEqual([initial, response])
  // Worktree creation cannot transmit the client ID.
  const worktreeInitial: AgentTimelineItem = { type: "user_message", text: "hello" }
  expect(temporaryRows({ ...created, worktree: true }, [worktreeInitial, response], "created")).toEqual([worktreeInitial, response])
  expect(hasInitialMessage(created, [worktreeInitial], "created")).toBe(false)
})

test("concurrent creations retain independent results and navigation ownership", () => {
  const second = { ...session, messageId: "client-2", input: { text: "second", images: [] } }
  let sessions = putSession(putSession([], session), second)
  expect(visibleSession(sessions, undefined, 3)).toBe(second)
  const firstFailed = { ...session, status: "failed" as const, error: "offline" }
  sessions = putSession(sessions, firstFailed)
  expect(visibleSession(sessions, undefined, 3)).toBe(second)
  const secondCreated = { ...second, agentId: "agent-2", status: "opening" as const }
  sessions = putSession(sessions, secondCreated)
  expect(sessions).toEqual([firstFailed, secondCreated])
  expect(visibleSession(sessions, "agent-2", 4)).toBe(secondCreated)
  const recovered = { ...firstFailed, navigation: 5 }
  sessions = putSession(sessions, recovered)
  expect(visibleSession(sessions, undefined, 5)).toBe(recovered)
  sessions = removeSession(sessions, recovered.messageId)
  expect(sessions).toEqual([secondCreated])
})

test("temporary timestamps stay aligned and the real message can retire the placeholder", () => {
  const created = { ...session, agentId: "created", status: "opening" as const, submittedAt: 100 }
  const response: AgentTimelineItem = { type: "assistant_message", text: "working" }
  expect(temporaryTimes(created, [response], [200], "created")).toEqual([100, 200])
  expect(temporaryTimes(created, [response], [200], "other")).toEqual([100])
  const initial: AgentTimelineItem = { type: "user_message", text: "hello", clientMessageId: "client-1" }
  expect(hasInitialMessage(created, [initial, response], "created")).toBe(true)
  const remaining = removeSession([created], created.messageId)
  expect(temporaryRows(visibleSession(remaining, "created", 4), [response], "created")).toEqual([response])
})
