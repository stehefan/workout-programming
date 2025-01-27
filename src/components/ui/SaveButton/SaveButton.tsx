import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";

export type CancelButtonProps = {
    submitFn: (data: FormData) => void;
    isSaving?: boolean;
    additionalClassNames?: string;
    disabled?: boolean;
}

export function SaveButton({ submitFn, isSaving = false, additionalClassNames = '', disabled = false }: CancelButtonProps) {
    return (
        <button formAction={submitFn} disabled={disabled}
            className={`bg-green-800 inline-flex items-center justify-center ${additionalClassNames}`}>
            {isSaving ? (
                <ArrowPathIcon className='size-5 mr-2 animate-spin' />
            ) : (
                <CloudArrowUpIcon className='size-5 mr-2' />
            )}
            Save
        </button>
    )
}
