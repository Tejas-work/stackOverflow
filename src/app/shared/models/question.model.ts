export interface Question{
  user_id: number,
  user_name:string
  question: string,
  details: string,
  expecting: string,
  tag: string,
  created: Date,
  view: number,
  votes: number,
  answer:number
}
export interface QuestionRes{
  id: number,
  user_id: number,
  user_name:string
  question: string,
  details: string,
  expecting: string,
  tag: string,
  created: Date,
  view: number,
  votes: number,
  answer:number
}
