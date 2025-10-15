import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react'; // optional spinner
import { useState } from 'react';

interface DeleteButtonProps {
    id: number | string;
    name?: string;
    destroyRoute: (id: number | string) => { url: string };
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    id,
    name = 'this item',
    destroyRoute,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        router.get(
            destroyRoute(id).url,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowConfirm(false);
                    setLoading(false);
                },
                onError: () => {
                    setLoading(false);
                },
            },
        );
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setShowConfirm(true)}
                className="inline-block rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-200"
            >
                Delete
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="mb-3 text-xl font-semibold text-gray-800">
                            Confirm Deletion
                        </h2>
                        <p className="mb-5 text-gray-600">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-gray-900">
                                {name}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            {/* Cancel Button */}
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-300"
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={handleDelete}
                                className="flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700 disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading && (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {loading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>

                        {/* Optional Close Icon */}
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteButton;
