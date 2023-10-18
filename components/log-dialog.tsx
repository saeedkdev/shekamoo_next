import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Food, MealType } from "@/types/schemas"
import { useState } from "react"
import { useSession } from "next-auth/react"

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

interface LogDialogProps {
  food: Food
}

export function LogDialog({ food }: LogDialogProps) {

  const session = useSession()
  const googleId = session.data?.googleId

  const [mealType, setMealType] = useState<MealType>("snack")

  async function logFood() {
    const response = await fetch(`${API_ENDPOINT}/meal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: mealType,
        name: food.name,
        date: new Date(),
        foodId: food._id,
        googleId: googleId
      })
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data)
        })
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex flex-row items-center gap-2 mt-3">
          <Icons.checkCircle className="w-5 h-5 mr-2" />
          Log it
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log { food.name }</DialogTitle>
          <DialogDescription>
            Select what type of meal you want to log this food for.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          <Select onValueChange={(value) => setMealType(value as MealType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(MealType).map(([key, value]) => (
                  <SelectItem value={value} key={key}>
                    <SelectLabel>{key}</SelectLabel>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => logFood()}>Log</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
