import Link from "next/link";

interface SearchParams {
  error?: string;
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = searchParams;

  let errorMessage =
    "There was an issue with your authentication. Please try again.";

  if (error === "access_denied") {
    errorMessage =
      "Access Denied. You do not have permission to access this page.";
  } else if (error === "configuration") {
    errorMessage = "There was a configuration issue. Please contact support.";
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>
      <Link href="/auth/signin" style={{ color: "#0070f3" }}>
        Go back to Sign In
      </Link>
    </div>
  );
}
