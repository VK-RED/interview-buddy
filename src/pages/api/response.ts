

import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '@/chatgpt/config';



const defPrompt = `Consider yourself an interviewer, you can ask me questions from the list one by one, once I have answered the current question. Your intro should be let's get started with interview. Once all the questions have been asked you can say thanks and let's end the interview. Meanwhile you can also comment on my responses. Always give your reply within 25 word limit. list = [What is static keyword in java, What is final keyword in java]`



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    try {

      const {messages} = req.body;
      const newMessages = [{'role' :'system' ,'content' : defPrompt}, ...messages];
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: newMessages,
        max_tokens:100
      });
      
      const response = completion.choices[0]?.message?.content;

      // const response = "Message is being served by ChatGPT"

      return res.status(202).json({response});
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Something went wrong"});
    }
  
}
