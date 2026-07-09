import { NextResponse } from "next/server";

/**
 * Returns a safe error response for API routes.
 * In production, hides internal error details from the client.
 * In development, returns the full error message for debugging.
 * 
 * OWASP A05: Security Misconfiguration — prevent leaking stack traces.
 */
export function safeErrorResponse(
  error: unknown,
  options: {
    /** User-facing message shown in production */
    publicMessage?: string;
    /** HTTP status code */
    status?: number;
    /** Label for server-side log */
    logLabel?: string;
  } = {}
): NextResponse {
  const {
    publicMessage = "An internal error occurred. Please try again later.",
    status = 500,
    logLabel = "API Error",
  } = options;

  const message =
    error instanceof Error ? error.message : String(error);

  console.error(`${logLabel}:`, message);

  const isProduction = process.env.NODE_ENV === "production";

  return NextResponse.json(
    {
      success: false,
      error: isProduction ? publicMessage : message,
    },
    { status }
  );
}
