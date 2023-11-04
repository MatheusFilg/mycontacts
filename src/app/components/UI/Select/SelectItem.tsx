'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check } from 'lucide-react'

export type SelectItemProps = SelectPrimitive.SelectItemProps & {
  text: string
}

export function SelectItem({ text, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      {...props}
      className="flex items-center justify-between gap-2 px-3 py-2.5 outline-none data-[highlighted]:bg-primary-300"
    >
      <SelectPrimitive.ItemText>
        <span>{text}</span>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-5 w-5 text-zinc-900" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
