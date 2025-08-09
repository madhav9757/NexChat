import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageCircleIcon } from 'lucide-react';

const ConversationFallback = () => {
  return (
    <Card className="hidden lg:flex flex-col items-center justify-center gap-3 w-full h-[calc(100vh-32px)] text-muted-foreground">
      <MessageCircleIcon className="w-8 h-8 opacity-60" />
      <p className="text-lg font-medium">Start a conversation to get going</p>
    </Card>
  );
};

export default ConversationFallback;
