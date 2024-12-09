import {ArrowPathIcon, CloudArrowUpIcon} from "@heroicons/react/24/outline";

export type CancelButtonProps = {
    submitFn: (data: FormData) => void;
    isSaving: boolean;
    additionalClassNames?: string;
}

export function SaveButton({submitFn, isSaving, additionalClassNames = ''}: CancelButtonProps) {
    return (
        <button formAction={submitFn}
                className={`bg-green-800 inline-flex items-center justify-center ${additionalClassNames}`}>
            {isSaving ? (
                <ArrowPathIcon className='size-5 mr-2 animate-spin'/>
            ) : (
                <CloudArrowUpIcon className='size-5 mr-2'/>
            )}
            Save
        </button>
    )
}