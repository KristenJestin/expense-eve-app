// main
export interface Error {
    rule?: string
    field?: string
    message: string
}

interface ErrorResult {
    errors: Error[]
}

// exports
export default ErrorResult
