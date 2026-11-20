import type { PromptSnapshot, PromptSubmit } from "./prompt/types"
import type { AgentTimelineItem } from "./timeline"

export type TemporarySession = {
  input: PromptSubmit
  snapshot: PromptSnapshot
  messageId: string
  navigation: number
  submittedAt?: number
  worktree?: boolean
  agentId?: string
  status: "creating" | "failed" | "opening" | "open-failed"
  error?: string
}

export function temporaryVisible(session: TemporarySession | undefined, agentId: string | undefined, navigation: number) {
  return !!session && (session.agentId ? session.agentId === agentId : agentId === undefined && session.navigation === navigation)
}

export function visibleSession<T extends TemporarySession>(sessions: T[], agentId: string | undefined, navigation: number): T | undefined {
  return sessions.findLast((session) => temporaryVisible(session, agentId, navigation))
}

export function putSession<T extends TemporarySession>(sessions: T[], session: T): T[] {
  const index = sessions.findIndex((item) => item.messageId === session.messageId)
  if (index < 0) return [...sessions, session]
  return sessions.map((item, i) => i === index ? session : item)
}

export function removeSession<T extends TemporarySession>(sessions: T[], messageId: string): T[] {
  return sessions.filter((session) => session.messageId !== messageId)
}

export function hasInitialMessage(session: TemporarySession, rows: AgentTimelineItem[], timelineAgentId: string | undefined): boolean {
  if (!session.agentId || timelineAgentId !== session.agentId) return false
  const firstUser = rows.find((row) => row.type === "user_message")
  return rows.some((row) => row.type === "user_message" && (row.clientMessageId === session.messageId || row.messageId === session.messageId)) ||
    (!!session.worktree && !!firstUser && firstUser.type === "user_message" && firstUser.text === session.input.text)
}

export function temporaryRows(session: TemporarySession | undefined, rows: AgentTimelineItem[], timelineAgentId: string | undefined): AgentTimelineItem[] {
  if (!session) return rows
  const actual = session.agentId && timelineAgentId === session.agentId ? rows : []
  return hasInitialMessage(session, rows, timelineAgentId) ? actual : [{ type: "user_message", text: session.input.text, clientMessageId: session.messageId }, ...actual]
}

export function temporaryTimes(session: TemporarySession | undefined, rows: AgentTimelineItem[], times: number[], timelineAgentId: string | undefined): number[] {
  if (!session || hasInitialMessage(session, rows, timelineAgentId)) return times
  const actual = session.agentId && timelineAgentId === session.agentId ? times : []
  return [session.submittedAt ?? 0, ...actual]
}
