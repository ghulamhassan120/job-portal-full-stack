import { cookies, headers } from "next/headers";
import crypto from "crypto";
import { getIPAddress } from "./location";
import { db } from "@/src/config/db";
import { session, usersTable } from "@/src/drizzle/schema";
import { SESSION_LIFETIME, SESSION_REFRESH_TIME } from "@/src/config/constant";
import { eq } from "drizzle-orm";
type createSessionData = {
  token: string;
  userAgent: string;
  userId: number;
  ip: string;
};
const gernateSessionToken = () => {
  return crypto.randomBytes(32).toString("hex").normalize();
};
const createUserSession = async ({
  token,
  userId,
  userAgent,
  ip,
}: createSessionData) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const [sessions] = await db.insert(session).values({
    id: hashedToken,
    userId,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
    ip,
    userAgent,
  });
  return sessions;
};
export const createSessionAndSetCookie = async (userId: number) => {
  const token = gernateSessionToken();
  const ip = await getIPAddress();
  const headersList = await headers();

  await createUserSession({
    token,
    userId: userId,
    userAgent: headersList.get("user_agent") || "",
    ip: ip,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    secure: true,
    httpOnly: true,
    maxAge: SESSION_LIFETIME,
  });
};


export const validateSessionAndGetUser = async (sessions: string) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(sessions)
    .digest("hex");

  const [user] = await db
    .select({
      id: usersTable.id,
      sessions: {
        id: session.id,
        expiresAt: session.expiresAt,
        userAgent: session.userAgent,
        ip: session.ip,
      },
      name: usersTable.name,
      userName: usersTable.userName,
      role: usersTable.role,
      phoneNumber: usersTable.phoneNumber,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(session)
    .innerJoin(usersTable, eq(usersTable.id, session.userId))
    .where(eq(session.id, hashedToken))
    .limit(1);

  if (!user) return null;

  if (Date.now() >= user.sessions.expiresAt.getTime()) {
    await invalidDataSession(user.sessions.id);
    return null;
  }

  if (
    Date.now() >=
    user.sessions.expiresAt.getTime() - SESSION_REFRESH_TIME * 1000
  ) {
    const newExpiresAt = new Date(
      Date.now() + SESSION_LIFETIME * 1000
    );

    await db
      .update(session)
      .set({ expiresAt: newExpiresAt })
      .where(eq(session.id, user.sessions.id));

    user.sessions.expiresAt = newExpiresAt;
  }

  return user;
};

const invalidDataSession = async (id: string) => {
  await db.delete(session).where(eq(session.id, id));
};