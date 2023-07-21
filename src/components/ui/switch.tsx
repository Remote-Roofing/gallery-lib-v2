import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>

  
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[38px] w-[73px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#c2c8d3] data-[state=unchecked]:bg-[#E5E7EB] dark:focus-visible:ring-slate-800 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-7 w-7 shadow-lg rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-9 data-[state=unchecked]:translate-x-1 dark:bg-slate-950 flex justify-center items-center"
      )}
    >
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.6903 2.68736C4.92949 0.441965 8.56497 0.436899 10.8104 2.67609C12.9769 4.83666 13.0686 8.31663 11.0188 10.5883L11.4573 11.0268C11.8116 10.6725 12.386 10.6724 12.7403 11.0267L12.7404 11.0268L15.7342 14.0206C16.0885 14.3749 16.0886 14.9493 15.7343 15.3036L15.7342 15.3037L15.3066 15.7313C14.9524 16.0854 14.3781 16.0854 14.0238 15.7313L11.03 12.7375C10.6757 12.3832 10.6756 11.8088 11.0299 11.4545L11.03 11.4544L10.5915 11.0159C8.23882 13.1421 4.608 12.9584 2.48183 10.6057C0.42812 8.33318 0.519863 4.84868 2.6903 2.68736ZM11.4573 12.3096L14.4511 15.3034C14.5692 15.4214 14.7606 15.4214 14.8787 15.3034L15.3063 14.8755C15.4242 14.7574 15.4242 14.5662 15.3063 14.4482L12.3125 11.4544C12.1929 11.34 12.0045 11.34 11.8849 11.4544L11.4573 11.8823C11.3395 12.0003 11.3395 12.1915 11.4573 12.3096ZM3.1176 10.3854C5.12526 12.393 8.38031 12.3929 10.3879 10.3853C12.3955 8.3776 12.3955 5.12255 10.3878 3.11496C8.38016 1.10741 5.12522 1.10741 3.1176 3.11496C1.11322 5.12399 1.11322 8.37635 3.1176 10.3854Z" fill="#475569" stroke="#475569" strokeWidth="0.3"/>
        <path d="M4.54506 3.54248L4.97266 3.97008C3.44003 5.50645 3.44003 7.99343 4.97266 9.52979L4.54506 9.9574C2.77614 8.18493 2.77614 5.31495 4.54506 3.54248Z" fill="#475569" stroke="#475569" strokeWidth="0.3"/>
      </svg>
      <SwitchPrimitives.Thumb className={cn("w-[73px] absolute data-[state=unchecked]:left-2 data-[state=checked]:-left-14")}>
        {props.children}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
