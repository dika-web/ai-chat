export interface ChatInterface {
  id: string;
  userId: string;
  projectId?: string;
  prompt: string;
  response: string;
}