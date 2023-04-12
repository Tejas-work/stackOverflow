export interface Answers{
  answer_user_id: number,
  answer_user_name:string,
  question_id?: number,
  question_user_id:number
  answer: string,
  accepted?: boolean,
  vote:number,
  created:Date
}
