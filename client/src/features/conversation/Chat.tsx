import { useConversation } from './useConversations';

export default function Chat() {
  const { conversations } = useConversation();
  return <div>Chat</div>;
}
