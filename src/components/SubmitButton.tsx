import Image from 'next/image'

import { Button } from './ui'

interface SubmitButtonProps {
  isLoading: boolean
  className?: string
  children: React.ReactNode
}

export const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? 'shad-primary-btn w-full'}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="Loader icone"
            width={24}
            height={24}
            className="animate-spin"
          />
          Carregando...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
