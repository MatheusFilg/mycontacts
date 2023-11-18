import { InputHTMLAttributes, forwardRef } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div>
        <div
          className={`${className} ${
            error
              ? 'border border-red-400 border-opacity-100 focus-within:border focus-within:border-red-400 '
              : ''
          }`}
        >
          <input
            type="text"
            {...props}
            ref={ref}
            className={`w-full outline-none`}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)
