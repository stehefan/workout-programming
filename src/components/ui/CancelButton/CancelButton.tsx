import {XCircleIcon} from "@heroicons/react/24/outline";

export type CancelButtonProps = {
    cancelFn: () => void;
}

export function CancelButton({cancelFn}: CancelButtonProps) {
    return <button type='reset' className='opacity-50 inline-flex items-center justify-center' onSubmit={cancelFn}>
        <XCircleIcon className='size-5 mr-2'/>
        Cancel
    </button>
}