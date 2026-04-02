import type { IconType } from "@/shared/model/types"

export const Category = {
  Fundamentals: "Fundamentals",
  Frontend: "Frontend",
  Backend: "Backend",
  Others: "Others"
} as const

type Category = typeof Category[keyof typeof Category]

export interface Tool {
  icon: IconType
  label: string
  extras?: {
    icon: IconType
    label: string
  }
  category: Category
}
