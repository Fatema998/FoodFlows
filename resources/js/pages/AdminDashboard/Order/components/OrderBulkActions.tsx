import React from 'react';

interface Props {
    selectedOrders: number[];
    onDelete: () => void;
    onPrint: () => void;
    onChangeStatus: () => void;
}

const OrderBulkActions: React.FC<Props> = ({ selectedOrders, onDelete, onPrint, onChangeStatus }) => {
    if (selectedOrders.length === 0) return null;

    return (
        <div className="flex items-center gap-4 p-4">
            <button onClick={onDelete} className="px-3 py-1 bg-red-500 text-white rounded">
                 All Delete
            </button>
            <button onClick={onPrint} className="px-3 py-1 bg-green-500 text-white rounded">
                Print 
            </button>
            <button onClick={onChangeStatus} className="px-3 py-1 bg-blue-500 text-white rounded">
                Change Status
            </button>
            <span>{selectedOrders.length} selected</span>
        </div>
    );
};

export default OrderBulkActions;
