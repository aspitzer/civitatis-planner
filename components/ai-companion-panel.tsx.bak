'use client'

import { useChat } from '@ai-sdk/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTripStore } from '@/lib/store/useTripStore'
import { Send } from 'lucide-react'
import { useEffect } from 'react'

export function AICompanionPanel() {
  const currentTrip = useTripStore((state) => state.currentTrip)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: currentTrip?.description
      ? [
          {
            id: 'user-0',
            role: 'user',
            content: currentTrip.description,
          },
        ]
      : [],
  })

  useEffect(() => {
    if (currentTrip?.description && messages.length === 0) {
      // Initial message will be sent automatically by useChat with initialMessages
    }
  }, [currentTrip, messages.length])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI Companion</h2>
        <p className="text-sm text-muted-foreground">Your trip planning assistant</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={
                message.role === 'user'
                  ? 'bg-primary/10 border-primary/20'
                  : 'bg-muted/50'
              }
            >
              <CardContent className="p-4">
                <div className="text-sm font-medium mb-1">
                  {message.role === 'user' ? 'You' : 'AI Companion'}
                </div>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              </CardContent>
            </Card>
          ))}
          {isLoading && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Thinking...</div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your trip..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
