import React, { useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const OrderFilter: React.FC<Props> = ({ onSearch, onStatusChange }) => {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onStatusChange(e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4">
      <input
        type="text"
        placeholder="Search by invoice"
        value={search}
        onChange={handleSearchChange}
        className="border px-3 py-2 rounded w-64"
      />
      <select value={status} onChange={handleStatusChange} className="border px-3 py-2 rounded">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="success">Success</option>
        <option value="cancel">Cancel</option>
      </select>
    </div>
  );
};

export default OrderFilter;
