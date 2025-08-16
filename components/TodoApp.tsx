"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const { toast } = useToast()

  // Load todos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load todos:', error)
      }
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text) return

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTodos(prev => [newTodo, ...prev])
    setInputValue('')
    
    toast({
      title: "Task added!",
      description: "Your new todo has been created successfully.",
    })
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    toast({
      title: "Task deleted!",
      description: "The todo item has been removed.",
    })
  }

  const clearCompleted = () => {
    const completedCount = todos.filter(t => t.completed).length
    setTodos(prev => prev.filter(todo => !todo.completed))
    toast({
      title: `${completedCount} tasks cleared!`,
      description: "All completed tasks have been removed.",
    })
  }

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen app-gradient-bg py-8">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            ✨ Todo App
          </h1>
          <p className="text-white/90 text-lg">
            Stay organized, one task at a time
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="pb-4">
            {/* Add Todo Form */}
            <form onSubmit={addTodo} className="space-y-4">
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 text-base"
                  maxLength={100}
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} completed
              </span>
              {completedCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-xs"
                >
                  Clear completed
                </Button>
              )}
            </div>

            {/* Todo List */}
            {todos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-4xl mb-3 opacity-50">📝</div>
                <p className="text-lg">No tasks yet. Add your first todo above!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`group flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      todo.completed 
                        ? 'bg-muted/50 border-muted' 
                        : 'bg-background hover:bg-muted/30'
                    }`}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="shrink-0"
                    />
                    <span 
                      className={`flex-1 text-sm transition-all ${
                        todo.completed 
                          ? 'line-through text-muted-foreground' 
                          : 'text-foreground'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
