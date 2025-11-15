
import AuthLayout from "@/layouts/AuthLayout";
import SignInForm from "../../components/auth/SignInForm";
import { useToastMessage } from "@/hooks/useToastMessage";

export default function SignIn() {

  useToastMessage();

  return (
    <>
      {/* <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      /> */}
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
