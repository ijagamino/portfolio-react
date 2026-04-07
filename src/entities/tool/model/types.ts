import type { IconType } from "@/shared/model/types"


export interface Tool {
  icon: IconType
  label: string
  extras?: {
    icon: IconType
    label: string
  }[]
}
