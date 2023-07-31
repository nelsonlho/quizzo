import SignInButton from '@/components/SignInButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAuthSession } from '@/lib/nextauth';
import { Session } from '';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect('/dashboard');
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md mx-auto my-auto">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Welcome to Quizzo</CardTitle>
            <CardDescription>
              AI generated questions with topics of your choice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton text="Sign In with Google"></SignInButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
