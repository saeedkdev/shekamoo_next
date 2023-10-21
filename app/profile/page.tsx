'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Overview } from "@/components/overview"

import { Meal } from "@/types/schemas"

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

export default function ProfilePage() {

  const session = useSession()
  const googleId = session.data?.googleId

  const [meals, setMeals] = useState<Meal[]>([]);

  function getUserMeals() {

      (async () => {
        const response = await fetch(`${API_ENDPOINT}/user/meals`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ googleId: googleId })
        })
        const data = await response.json()
        setMeals(data)
      })()
  }

  useEffect(() => {
    getUserMeals()
  }, [googleId])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {session.data && (
      <>
        <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 mb-5">
              Current Week
            </h1>
            <Overview meals={meals}/>
        </div>
      </>
      )}
      {!session.data && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            Welcome to Shekamoo
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Please sign in to continue
          </p>
        </div>
      )}
    </section>
  )
}
