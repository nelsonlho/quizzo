import QuizCreation from '@/components/QuizCreation';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

type Props = {};

export const metadata = {
  title: 'Quiz | Quizzo',
};
const QuizPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <div>
      <QuizCreation />
    </div>
  );
};

export default QuizPage;
