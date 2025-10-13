import { index } from '@/routes/admin/product';
import { Brand, Category } from '@/types';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface FilterProps {
    filters: Record<string, any>;
    brands: { data: Brand[] };
    categories: { data: Category[] };
}

const ProductFilter: React.FC<FilterProps> = ({
    filters,
    brands,
    categories,
}) => {
    const [localFilters, setLocalFilters] = useState({
        search: filters.search || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        category: filters.category || '',
        subcategory: filters.subcategory || '',
        brand: filters.brand || '',
        active: filters.active || false,
        inactive: filters.inactive || false,
        trending: filters.trending || false,
        limited: filters.limited || false,
        todays_pick: filters.todays_pick || false,
        new_arrival: filters.new_arrival || false,
        featured: filters.featured || false,
        flash_deal: filters.flash_deal || false,
        limit: filters.limit || 10,
    });

    const [subcategories, setSubcategories] = useState<Category[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        if (localFilters.category) {
            const selected = categories.data.find(
                (c) => c.id === Number(localFilters.category),
            );
            setSubcategories(selected?.children || []);
        } else {
            setSubcategories([]);
            setLocalFilters((prev) => ({ ...prev, subcategory: '' }));
        }
    }, [localFilters.category, categories.data]);

    const handleChange = (key: string, value: any) => {
        const updated = { ...localFilters, [key]: value };
        if (key === 'active' && value) updated.inactive = false;
        if (key === 'inactive' && value) updated.active = false;

        setLocalFilters(updated);

        const query: Record<string, any> = {};
        Object.keys(updated).forEach((k) => {
            const val = updated[k];
            if (typeof val === 'boolean') {
                if (val)
                    query[k === 'inactive' ? 'active' : k] =
                        k === 'inactive' ? false : true;
            } else if (val !== '' && val !== null) {
                query[k] = val;
            }
        });

        router.get(index().url, query, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        const reset = {
            search: '',
            start_date: '',
            end_date: '',
            category: '',
            subcategory: '',
            brand: '',
            active: false,
            inactive: false,
            trending: false,
            limited: false,
            todays_pick: false,
            new_arrival: false,
            featured: false,
            flash_deal: false,
            limit: 10,
        };
        setLocalFilters(reset);
        router.get(
            index().url,
            {},
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <div className="bg-white px-3 py-3 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
            {/* Top Bar */}
            <div className="flex flex-col gap-4 pb-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Show Entries */}
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span>Show</span>
                    <select
                        value={localFilters.limit}
                        onChange={(e) =>
                            handleChange('limit', Number(e.target.value))
                        }
                        className="w-14 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        {[5, 10, 20, 30, 40, 50, 100].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <span>Entries</span>
                </div>

                {/* Search + Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative">
                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                            <svg
                                className="fill-gray-500 dark:fill-gray-400"
                                width="18"
                                height="18"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {' '}
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                                />{' '}
                            </svg>
                        </span>
                        <input
                            value={localFilters.search}
                            onChange={(e) =>
                                handleChange('search', e.target.value)
                            }
                            type="text"
                            placeholder="Search products..."
                            className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 pr-3 pl-10 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                        {/* Filter Button */}
                        <button
                            type="button"
                            onClick={() => setFilterOpen(!filterOpen)}
                            className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-all ${
                                filterOpen
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                        >
                            <svg
                                className="h-5 w-5 stroke-current"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M2.3 5.9h15.4M17.7 14.1H2.3M12.1 3.3a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2zM7.9 11.5a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2z"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            Filter
                        </button>

                        {/* Reset Button */}
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 3.333V1.667L6.667 5 10 8.333V6.667C13.222 6.667 15.833 9.278 15.833 12.5S13.222 18.333 10 18.333 4.167 15.722 4.167 12.5H2.5c0 3.806 3.195 7 7 7s7-3.194 7-7-3.194-7-7-7h.5Z" />
                            </svg>
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Expandable Filters */}
            {filterOpen && (
                <div className="space-y-4 rounded-lg border-t border-gray-200 pt-2 dark:border-gray-700">
                    {/* Dates */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {/* Start Date */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="start_date"
                                className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Start Date
                            </label>
                            <input
                                id="start_date"
                                type="date"
                                value={localFilters.start_date}
                                onChange={(e) =>
                                    handleChange('start_date', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="end_date"
                                className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                End Date
                            </label>
                            <input
                                id="end_date"
                                type="date"
                                value={localFilters.end_date}
                                onChange={(e) =>
                                    handleChange('end_date', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>

                        {/* Category / Subcategory / Brand */}
                        {[
                            {
                                key: 'category',
                                options: categories.data,
                                label: 'Category',
                            },
                            {
                                key: 'subcategory',
                                options: subcategories,
                                label: 'Subcategory',
                            },
                            {
                                key: 'brand',
                                options: brands.data,
                                label: 'Brand',
                            },
                        ].map(({ key, options, label }) => (
                            <div key={key} className="flex flex-col">
                                <label
                                    htmlFor={key}
                                    className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {label}
                                </label>
                                <select
                                    id={key}
                                    value={localFilters[key]}
                                    onChange={(e) =>
                                        handleChange(key, e.target.value)
                                    }
                                    disabled={
                                        key === 'subcategory' &&
                                        !subcategories.length
                                    }
                                    className="w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    <option value="">{`All ${label}s`}</option>
                                    {options.map((opt: any) => (
                                        <option key={opt.id} value={opt.id}>
                                            {opt.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Status & Flags */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 md:grid-cols-6 dark:text-gray-300">
                        {[
                            { key: 'active', label: 'Active', color: 'green' },
                            {
                                key: 'inactive',
                                label: 'Inactive',
                                color: 'red',
                            },
                            { key: 'trending', label: 'Trending' },
                            { key: 'limited', label: 'Limited' },
                            { key: 'todays_pick', label: "Today's Pick" },
                            { key: 'new_arrival', label: 'New Arrival' },
                            { key: 'featured', label: 'Featured' },
                            { key: 'flash_deal', label: 'Flash Deal' },
                        ].map(({ key, label, color }) => (
                            <label
                                key={key}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={localFilters[key]}
                                    onChange={(e) =>
                                        handleChange(key, e.target.checked)
                                    }
                                    className={`h-4 w-4 ${
                                        color
                                            ? `accent-${color}-500`
                                            : 'accent-blue-500 dark:accent-blue-400'
                                    }`}
                                />
                                <span>{label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilter;
