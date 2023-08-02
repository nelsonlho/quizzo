import { strict_output } from '@/lib/gpt';
import { getAuthSession } from '@/lib/nextauth';
import { getQuestionsSchema } from '@/schemas/questions';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    if (type === 'open_ended') {
      questions = await strict_output(
        'You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON format',
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 15 words',
        }
      );
    } else if (type === 'mcq') {
      questions = await strict_output(
        'You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array with correct JSON format. You are talking to a machine that can help you but it only understands JSON so make sure the format you return is always in correct JSON format. Do not give me a response saying Output format not in a list of json',
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 15 words',
          option1: 'option1 with max length of 15 words',
          option2: 'option2 with max length of 15 words',
          option3: 'option3 with max length of 15 words',
        }
      );
    }
    if (questions.length === 0) {
      return NextResponse.json(
        { error: 'ChatGPT wants you to try again' },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error('elle gpt error', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred.' },
        {
          status: 500,
        }
      );
    }
  }
}
