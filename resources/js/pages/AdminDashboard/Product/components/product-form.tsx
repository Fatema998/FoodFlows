import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import Checkbox from '@/components/form/input/Checkbox';
import FileInput from '@/components/form/input/FileInput';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import MultiSelect from '@/components/form/MultiSelect';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import InputError from '@/components/ui/input-error';
import { Product } from '@/types/product';
import { Form } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Category } from '../../Category/category-type';

interface ProductFormProps {
    product?: Product;
    brandOptions: { value: string; label: string }[];
    categoryOptions: { value: string; label: string; children?: Category[] }[];
    productTypeOptions: { value: string; label: string }[];
    sizeOptions: { value: string; label: string }[];
    colorOptions: { value: string; label: string }[];
}

const ProductForm: React.FC<ProductFormProps> = ({
    product,
    brandOptions,
    categoryOptions,
    productTypeOptions,
    sizeOptions,
    colorOptions,
}) => {
    // ====== STATE SETUP ======
    const [isActive, setIsActive] = useState<boolean>(
        product?.is_active ?? false,
    );
    const [isTrending, setIsTrending] = useState<boolean>(
        product?.is_trending ?? false,
    );
    const [isLimited, setIsLimited] = useState<boolean>(
        product?.is_limited ?? false,
    );
    const [isTodaysPick, setIsTodaysPick] = useState<boolean>(
        product?.is_todays_pick ?? false,
    );
    const [isNewArrival, setIsNewArrival] = useState<boolean>(
        product?.is_new_arrival ?? false,
    );
    const [isFeatured, setIsFeatured] = useState<boolean>(
        product?.is_featured ?? false,
    );
    const [isFlashDeal, setIsFlashDeal] = useState<boolean>(
        product?.is_flash_deal ?? false,
    );

    const [hasSize, setHasSize] = useState<boolean>(product?.has_size ?? false);

    const [preview, setPreview] = useState<string>(
        product?.main_thumbnail ?? '',
    );

    const [selectedSizes, setSelectedSizes] = useState<number[]>(
        product?.sizes?.map((item) => item.id) ?? [],
    );

    const [selectedCategory, setSelectedCategory] = useState<string>(
        String(product?.category_id ?? ''),
    );
    const [subcategories, setSubcategories] = useState<Category[]>([]);

    const [variants, setVariants] = useState<any[]>(product?.variants ?? []);

    // ====== FORM SETUP ======
    const form = product
        ? ProductController.update.form({ id: product.id })
        : ProductController.store.form();

    // ====== HANDLERS ======
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleVariantChange = (index: number, key: string, value: any) => {
        const updated = [...variants];
        updated[index][key] = value;
        setVariants(updated);
    };

    const addVariant = () =>
        setVariants([...variants, { color_id: '', image: null }]);
    const removeVariant = (index: number) =>
        setVariants(variants.filter((_, i) => i !== index));

    // ====== EFFECTS ======
    useEffect(() => {
        if (selectedCategory) {
            const selectedCat = categoryOptions.find(
                (cat) => cat.value === selectedCategory,
            );
            setSubcategories(selectedCat?.children ?? []);
        }
    }, [selectedCategory, categoryOptions]);

    // ====== RENDER ======
    return (
        <Form {...form} encType="multipart/form-data">
            {({ processing, errors }) => (
                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label>Title *</Label>
                        <Input
                            name="title"
                            defaultValue={product?.title ?? ''}
                            required
                        />
                        <InputError message={errors?.title} />
                    </div>
                    {/* Slug */}
                    <div>
                        <Label>Slug *</Label>
                        <Input
                            name="slug"
                            defaultValue={product?.slug ?? ''}
                            required
                        />
                        <InputError message={errors?.slug} />
                    </div>
                    {/* Brand */}
                    <div>
                        <Label>Brand</Label>
                        <Select
                            name="brand_id"
                            options={brandOptions}
                            defaultValue={String(product?.brand_id ?? '')}
                        />
                        <InputError message={errors?.brand_id} />
                    </div>
                    {/* Category */}
                    <div>
                        <Label>Category</Label>
                        <Select
                            name="category_id"
                            options={categoryOptions}
                            defaultValue={String(product?.category_id ?? '')}
                            onChange={(value) => setSelectedCategory(value)}
                        />
                        <InputError message={errors?.category_id} />
                    </div>
                    {/* Subcategory */}
                    <div>
                        <Label>Subcategory</Label>{' '}
                        <Select
                            options={subcategories}
                            name="subcategory_id"
                            defaultValue={String(product?.subcategory_id ?? '')}
                        />{' '}
                        <InputError message={errors?.subcategory_id} />{' '}
                    </div>
                    {/* Product Type */}
                    {/* Product Type */}{' '}
                    <div>
                        {' '}
                        <Label>Product Type</Label>{' '}
                        <Select
                            options={productTypeOptions}
                            name="product_type_id"
                            id="product_type_id"
                            defaultValue={String(
                                product?.product_type_id ?? '',
                            )}
                        />{' '}
                        <InputError message={errors?.product_type_id} />{' '}
                    </div>
                    {/* Price & Discount */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                name="price"
                                defaultValue={product?.price ?? 0}
                            />
                            <InputError message={errors?.price} />
                        </div>
                        <div>
                            <Label htmlFor="discount">Discount (%)</Label>{' '}
                            <Input
                                type="number"
                                name="discount"
                                id="discount"
                                defaultValue={product?.discount ?? 0}
                            />
                            <InputError message={errors?.discount} />
                        </div>
                    </div>
                    {/* Quantity & Product Code */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                name="quantity"
                                defaultValue={product?.quantity ?? 1}
                            />
                            <InputError message={errors?.quantity} />
                        </div>
                        <div>
                            <Label>Product Code</Label>
                            <Input
                                name="product_code"
                                defaultValue={product?.product_code ?? ''}
                            />
                            <InputError message={errors?.product_code} />
                        </div>
                    </div>
                    {/* Main Thumbnail */}
                    <div>
                        <Label>Main Thumbnail</Label>
                        <FileInput
                            name="main_thumbnail"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 h-32 rounded-md border object-cover"
                            />
                        )}
                        <InputError message={errors?.main_thumbnail} />
                    </div>
                    {/* Descriptions */}
                    <div>
                        <Label>Short Description</Label>
                        <TextArea
                            name="short_description"
                            defaultValue={product?.short_description ?? ''}
                            rows={3}
                        />
                        <InputError message={errors?.short_description} />
                    </div>
                    <div>
                        <Label>Long Description</Label>
                        <TextArea
                            name="long_descriptions"
                            defaultValue={product?.long_descriptions ?? ''}
                            rows={5}
                        />
                        <InputError message={errors?.long_descriptions} />
                    </div>
                    <div>
                        <Label>Materials</Label>
                        <TextArea
                            name="materials"
                            defaultValue={product?.materials ?? ''}
                            rows={3}
                        />
                        <InputError message={errors?.materials} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            label={'Has Size'}
                            name="has_size"
                            id="has_size"
                            checked={hasSize}
                            onChange={(checked) => setHasSize(checked)}
                        />
                        <input
                            type="hidden"
                            name="has_size"
                            id="has_size"
                            value={hasSize ? '1' : '0'}
                        />
                    </div>
                    {/* Sizes */}
                    {hasSize == true && (
                        <MultiSelect
                            label="Sizes"
                            options={sizeOptions}
                            name="sizes[]"
                            defaultSelected={selectedSizes}
                            onChange={(value) => setSelectedSizes(value)}
                        />
                    )}
                    {/* Variants */}
                    <div>
                        <Label>Variants (Color + Image)</Label>

                        {variants.map((variant, index) => (
                            <div
                                key={index}
                                className="mt-3 flex items-center gap-3 sm:gap-2"
                            >
                                <Select
                                    options={colorOptions}
                                    name={`variants[${index}][color_id]`}
                                    defaultValue={String(
                                        variant.color_id ?? '',
                                    )}
                                    onChange={(value) =>
                                        handleVariantChange(
                                            index,
                                            'color_id',
                                            value,
                                        )
                                    }
                                />

                                <FileInput
                                    name={`variants[${index}][image]`}
                                    onChange={(e) =>
                                        handleVariantChange(
                                            index,
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />

                                <div
                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-red-500 px-5 font-bold text-white shadow-md transition-colors duration-200 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
                                    onClick={() => removeVariant(index)}
                                >
                                    −
                                </div>
                            </div>
                        ))}

                        <div
                            className="mt-4 flex w-36 cursor-pointer items-center justify-center rounded-lg bg-blue-500 py-2 text-white shadow-md transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
                            onClick={addVariant}
                        >
                            + Add Variant
                        </div>
                    </div>
                    {/* Flags */}
                    <div className="mt-4 flex flex-wrap gap-4">
                        {[
                            {
                                label: 'Active',
                                state: isActive,
                                setter: setIsActive,
                                name: 'is_active',
                            },
                            {
                                label: 'Featured',
                                state: isFeatured,
                                setter: setIsFeatured,
                                name: 'is_featured',
                            },
                            {
                                label: 'Trending',
                                state: isTrending,
                                setter: setIsTrending,
                                name: 'is_trending',
                            },
                            {
                                label: 'Limited',
                                state: isLimited,
                                setter: setIsLimited,
                                name: 'is_limited',
                            },
                            {
                                label: "Today's Pick",
                                state: isTodaysPick,
                                setter: setIsTodaysPick,
                                name: 'is_todays_pick',
                            },
                            {
                                label: 'Flash Deal',
                                state: isFlashDeal,
                                setter: setIsFlashDeal,
                                name: 'is_flash_deal',
                            },
                            {
                                label: 'New Arrival',
                                state: isNewArrival,
                                setter: setIsNewArrival,
                                name: 'is_new_arrival',
                            },
                        ].map(({ label, state, setter, name }) => (
                            <div key={name} className="flex items-center gap-2">
                                <Checkbox
                                    label={label}
                                    name={name}
                                    id={name}
                                    checked={state}
                                    onChange={(checked) => setter(checked)}
                                />
                                <input
                                    type="hidden"
                                    name={name}
                                    value={state ? '1' : '0'}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Flash Deal Dates */}
                    {isFlashDeal == true && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Flash Deal Start</Label>
                                <Input
                                    type="date"
                                    name="flash_deal_start"
                                    defaultValue={
                                        product?.flash_deal_start ?? ''
                                    }
                                />
                            </div>
                            <div>
                                <Label>Flash Deal End</Label>
                                <Input
                                    type="date"
                                    name="flash_deal_end"
                                    defaultValue={product?.flash_deal_end ?? ''}
                                />
                            </div>
                        </div>
                    )}
                    {/* Meta Fields */}
                    <div>
                        <Label>Meta Title</Label>
                        <Input
                            name="meta_title"
                            defaultValue={product?.meta_title ?? ''}
                        />
                    </div>
                    <div>
                        <Label>Meta Description</Label>
                        <TextArea
                            name="meta_description"
                            defaultValue={product?.meta_description ?? ''}
                            rows={3}
                        />
                    </div>
                    <div>
                        <Label>Meta Keywords</Label>
                        <TextArea
                            name="meta_keywords"
                            defaultValue={product?.meta_keywords ?? ''}
                            rows={3}
                        />
                    </div>
                    {/* Submit */}
                    <div className="mt-4">
                        <Button size="sm" disabled={processing}>
                            {processing && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {product ? 'Update Product' : 'Add Product'}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    );
};

export default ProductForm;
