import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type Props = {};

const QuizCreation = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto my-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-2x">Create Quiz</CardTitle>
            <CardDescription>Choose a topic</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizCreation;
