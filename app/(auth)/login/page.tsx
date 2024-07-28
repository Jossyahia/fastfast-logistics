import LoginForm  from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <LoginForm />
    </div>
  );
}
