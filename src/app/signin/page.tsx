import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "../../../auth";
import { AuthError } from "next-auth";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Sign in</h1>
      {Object.values(providerMap).map((provider) => (
        <form
          action={async () => {
            try {
              ("use server");
              await signIn(provider.id);
            } catch (error) {
              throw error;
            }
          }}
          key={provider.id}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
