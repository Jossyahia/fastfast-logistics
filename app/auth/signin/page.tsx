import SignInForm from "@/components/signin-form";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 lg:py-16 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">Sign in</h1>
        <SignInForm />
      </div>
    </div>
  );
}