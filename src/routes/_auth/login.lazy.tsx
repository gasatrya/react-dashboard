import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  return (
    <div className="flex h-screen items-center justify-center relative z-10">
      <div className="text-center w-full md:w-96 px-5">
        <h1 className="text-3xl font-extrabold mb-2 uppercase">Welcome</h1>
        <p className="mb-8">
          For your protection, please verify your identity.
        </p>
        {/* <LoginForm /> */}
      </div>
    </div>
  );
}
