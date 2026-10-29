import Button from './Button'

// Shown whenever an API call fails — explains what happened and offers a retry
export default function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load this content. Please check your connection and try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-fadeIn">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-red-500">
          <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A1.5 1.5 0 0 0 3.34 20h17.32a1.5 1.5 0 0 0 1.23-2.36L13.71 3.86a1.5 1.5 0 0 0-2.42 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-darktext mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
