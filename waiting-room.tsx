"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Wifi } from "lucide-react"

export default function WaitingRoom() {
  const searchParams = useSearchParams()

  // 从URL参数读取初始值，如果没有则使用默认值
  const initialMinutes = Number.parseInt(searchParams.get("minute") || "5", 10)
  const initialCount = Number.parseInt(searchParams.get("count") || "1247", 10)

  const [waitTime, setWaitTime] = useState(initialMinutes)
  const [progress, setProgress] = useState(0)
  const [queuePosition, setQueuePosition] = useState(initialCount)
  const [message, setMessage] = useState("")

  // 将预置弹幕数量大幅增加到100条，并且每行都有足够的弹幕
  const [danmakus] = useState([
    { id: 1, text: "加油！马上就轮到了！", color: "text-blue-400" },
    { id: 2, text: "等待中...希望快点进去", color: "text-purple-400" },
    { id: 3, text: "大家一起等待吧～", color: "text-green-400" },
    { id: 4, text: "网站真的很火爆呢", color: "text-pink-400" },
    { id: 5, text: "耐心等待，值得的！", color: "text-indigo-400" },
    { id: 6, text: "来聊天打发时间吧", color: "text-orange-400" },
    { id: 7, text: "系统处理中，请稍候", color: "text-teal-400" },
    { id: 8, text: "大家都在排队呢", color: "text-red-400" },
    { id: 9, text: "终于快到我了！", color: "text-yellow-400" },
    { id: 10, text: "这个网站好受欢迎", color: "text-cyan-400" },
    { id: 11, text: "排队也是一种体验", color: "text-rose-400" },
    { id: 12, text: "希望服务器给力点", color: "text-violet-400" },
    { id: 13, text: "等待是为了更好的体验", color: "text-emerald-400" },
    { id: 14, text: "大家都很有耐心呢", color: "text-amber-400" },
    { id: 15, text: "马上就能进去了吧", color: "text-lime-400" },
    { id: 16, text: "这个等待室设计不错", color: "text-sky-400" },
    { id: 17, text: "弹幕让等待变有趣了", color: "text-fuchsia-400" },
    { id: 18, text: "一起加油等待！", color: "text-blue-500" },
    { id: 19, text: "服务器正在努力处理", color: "text-purple-500" },
    { id: 20, text: "大家一起坚持！", color: "text-green-500" },
  ])

  const [userDanmakus, setUserDanmakus] = useState<Array<{ id: number; text: string; color: string }>>([])

  // 使用 useMemo 确保随机化的弹幕配置只计算一次，避免重新渲染时重新计算
  const danmakuConfig = useMemo(() => {
    const allDanmakus = [...danmakus, ...userDanmakus]
    const shuffledDanmakus = [...allDanmakus].sort(() => Math.random() - 0.5)

    // 为每个弹幕预先计算所有随机值
    return Array.from({ length: 10 }, (_, rowIndex) => {
      const rowDanmakus = shuffledDanmakus.slice(rowIndex * 2, rowIndex * 2 + 2)

      return rowDanmakus.map((danmaku, index) => ({
        ...danmaku,
        delay: -(Math.random() * 30 + index * 8 + rowIndex * 2.5),
        duration: 25 + Math.random() * 10,
        verticalOffset: index * 50 + Math.random() * 10,
        uniqueKey: `${danmaku.id}-${rowIndex}-${index}-${Date.now()}-${Math.random()}`,
      }))
    })
  }, [danmakus, userDanmakus])

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime((prev) => {
        if (prev > 0) {
          const newTime = prev - 1
          setProgress(((initialMinutes - newTime) / initialMinutes) * 100)
          if (newTime <= 3) {
            setQueuePosition((prev) => Math.max(1, prev - Math.floor(Math.random() * 50) - 10))
          }
          return newTime
        }
        return 0
      })
    }, 60000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 2
        return Math.min(100, prev + increment)
      })
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [initialMinutes])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const colors = [
        "text-blue-400",
        "text-purple-400",
        "text-green-400",
        "text-pink-400",
        "text-indigo-400",
        "text-orange-400",
        "text-teal-400",
        "text-red-400",
        "text-yellow-400",
      ]
      const newDanmaku = {
        id: Date.now(),
        text: message.trim(),
        color: colors[Math.floor(Math.random() * colors.length)],
      }
      setUserDanmakus((prev) => [...prev, newDanmaku])
      setMessage("")
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* 背景动画圆圈 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* 弹幕背景层 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative h-full flex flex-col justify-center py-20">
          {/* 使用预计算的弹幕配置 */}
          {danmakuConfig.map((rowDanmakus, rowIndex) => (
            <div key={rowIndex} className="relative h-16 overflow-hidden mb-2">
              {rowDanmakus.map((danmaku) => (
                <div
                  key={danmaku.uniqueKey}
                  className={`absolute whitespace-nowrap text-sm font-medium ${danmaku.color} opacity-60 animate-marquee`}
                  style={{
                    top: `${danmaku.verticalOffset}%`,
                    transform: "translateY(-50%)",
                    animationDelay: `${danmaku.delay}s`,
                    animationDuration: `${danmaku.duration}s`,
                  }}
                >
                  {danmaku.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 主要内容卡片 */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-md bg-white/85 border-0 shadow-2xl">
          <CardContent className="p-6 text-center space-y-5">
            {/* 主要图标和动画 */}
            <div className="relative mb-6">
              {/* 主要旋转环 */}
              <div className="w-28 h-28 mx-auto relative">
                {/* 外层旋转环 */}
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>

                {/* 中层旋转环 */}
                <div className="absolute inset-3 border-3 border-gray-100 rounded-full"></div>
                <div
                  className="absolute inset-3 border-3 border-transparent border-t-purple-400 border-l-blue-400 rounded-full animate-spin animation-delay-1000"
                  style={{ animationDirection: "reverse" }}
                ></div>

                {/* 内层图标 */}
                <div className="absolute inset-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <Wifi className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* 环绕的小点动画 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-36 h-36">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-18px)`,
                        animationDelay: `${i * 200}ms`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* 脉冲波纹 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 border-2 border-blue-300 rounded-full animate-ping opacity-20"></div>
                <div className="absolute top-2 left-2 w-28 h-28 border-2 border-purple-300 rounded-full animate-ping opacity-15 animation-delay-1000"></div>
                <div className="absolute top-4 left-4 w-24 h-24 border-2 border-indigo-300 rounded-full animate-ping opacity-10 animation-delay-2000"></div>
              </div>
            </div>

            {/* 主要信息 */}
            <div className="space-y-3">
              <h1 className="text-xl font-bold text-gray-800 leading-tight">访客过多，请稍候</h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                您正在访问的网站当前访客过多，您已被转接进入等待室，请耐心等待
              </p>
            </div>

            {/* 等待时间显示 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-xs font-medium text-gray-700">预计等待时间</span>
              </div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                {waitTime} 分钟
              </div>
            </div>

            {/* 进度条 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>处理进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* 队列信息 */}
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
              <Users className="w-3 h-3" />
              <span>您前面还有 {queuePosition.toLocaleString()} 位访客</span>
            </div>

            {/* 状态指示器 */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">系统正在为您分配资源...</span>
            </div>

            {/* 弹幕输入框 */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-medium text-gray-700 flex items-center justify-center space-x-1">
                <span>💬</span>
                <span>发送弹幕与其他用户互动</span>
              </div>
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="输入弹幕内容..."
                  maxLength={50}
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  发送
                </button>
              </form>
            </div>

            {/* 提示信息 */}
            <div className="text-xs text-gray-500 bg-gray-50/80 backdrop-blur-sm rounded-lg p-2">
              <p>💡 小贴士：请保持此页面打开，系统会自动为您跳转</p>
            </div>

            {/* URL参数说明（仅在开发时显示） */}
            {(searchParams.get("minute") || searchParams.get("count")) && (
              <div className="text-xs text-blue-600 bg-blue-50/80 backdrop-blur-sm rounded-lg p-2 border border-blue-200">
                <p>
                  📋 当前配置：等待时间 {initialMinutes} 分钟，前方 {initialCount.toLocaleString()} 位访客
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
