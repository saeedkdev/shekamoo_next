
enum Unit {
    Serving = "serving",
    Cups = "cups",
    Bowl = "bowl",
    Plate = "plate",
    Grams = "grams"
}

export enum MealType {
    Breakfast = "breakfast",
    Lunch = "lunch",
    Dinner = "dinner",
    Snack = "snack"
}

export interface Food {
  _id: string
  name: string
  amount: number
  unit: Unit
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  _id: string
  name: string
  date: string
  type: MealType
}
