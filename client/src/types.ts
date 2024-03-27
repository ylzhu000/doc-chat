export type TLogin = {
  email: string;
  password: string;
};

export type TMessage = {
  content: string;
  role: string;
  conversation_id?: string;
  created_at?: string;
  id?: string;
};

export enum Role {
  Human = 'human',
  AI = 'ai',
}
