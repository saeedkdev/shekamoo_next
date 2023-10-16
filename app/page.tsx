'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

export default function IndexPage() {
  const [searchedFood, setSearchedFood] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const [results, setResults] = useState([])

  function triggerSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchedFood(event.target.value)
    let length = searchedFood.length
    if (length > 2) {
      (async () => {
        setIsSearching(true)
        const response = await fetch(`${API_ENDPOINT}/food/search`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: searchedFood })
        })
        const data = await response.json()
        setResults(data)
        setIsSearching(false)
      })()
    }

    if (length === 0) {
      setResults([])
    }
  }

  const session = useSession()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {session.data && (
      <>
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            Search for food
          </h1>
          <input
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
            type="text"
            placeholder="For example: Sabzi Polo"
            value={searchedFood}
            onChange={triggerSearch}
            aria-label="Search" />
        </div>
        <div className="flex gap-4">
            {isSearching && <p>Searching...</p>}
            {results.map((result: any) => (
              <Card key={result.id}>
                <CardHeader>
                  <CardTitle>{result.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p>{result.amount} {result.unit}</p>
                    <p>calories: {result.calories}</p>
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-row gap-2">
                  <p>Protein: {result.protein}g</p>
                  <p>Fat: {result.fat}g</p>
                  <p>Carbohydrates: {result.carbs}g</p>
                </CardFooter>
              </Card>
            ))}
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
