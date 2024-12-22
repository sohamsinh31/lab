"use server";

import { NextRequest, NextResponse } from "next/server";

export const getSession = async (req: NextRequest) => {
  const userSession = await req.cookies.get("userSession");
  return userSession;
};
