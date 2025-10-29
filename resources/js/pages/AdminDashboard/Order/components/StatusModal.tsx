import React, { useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (status: string) => void;
}

const StatusModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    const [status, setStatus] = useState<string>('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!status) return alert('Please select a status');
        onSubmit(status);
    };

    return (
        <div className="fixed inset-0  bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Change Order Status</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="cancel">Cancel</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StatusModal;
