import { sendVerificationEmail } from "@/utils/sendEmail"
import { NextRequest } from "next/server"

export async function POST(request : NextRequest) {
  const { email, challenge, goal } = await request.json()
  const res = await sendVerificationEmail(email, challenge, goal)
  return Response.json(res)
}