import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    const [visible, setVisible] = useState(false); // for animation
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

    // Animate in/out
    useEffect(() => {
        if (showConfirm) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => setVisible(false), 1000); // match transition duration
            return () => clearTimeout(timer);
        }
    }, [showConfirm]);

    return (
        <div>
            <button
                onClick={() => setShowConfirm(true)}
                className="inline-block rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-200"
            >
                Delete
            </button>

            {(showConfirm || visible) && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300 ${showConfirm ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setShowConfirm(false)}
                >
                    <div
                        className={`relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transform transition-transform duration-300 ${showConfirm ? 'scale-100' : 'scale-90'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="mb-3 flex items-center justify-center text-xl font-semibold text-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="96"
                                height="96"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-circle-alert text-orange-300"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </h2>
                        <h4 className="mb-5 space-y-2 text-gray-600">
                            <p className="text-xl font-semibold">
                                Are you sure you want to delete <span className="text-gray-900">{name}</span>?
                            </p>
                            <span className="text-sm">
                                If you delete this, it will be gone forever.
                            </span>
                        </h4>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-300"
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700 disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>

                        <button
                            onClick={() => setShowConfirm(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteButton;
