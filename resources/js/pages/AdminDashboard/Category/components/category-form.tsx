import CategoryController from '@/actions/App/Http/Controllers/Admin/CategoryController';
import Checkbox from '@/components/form/input/Checkbox';
import FileInput from '@/components/form/input/FileInput';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import InputError from '@/components/ui/input-error';
import { Form } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CategoryFormProps } from '../category-type';

const CategoryForm: React.FC<CategoryFormProps> = ({
    category,
    options = [],
    isShowParentField = false,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(
        category ? Boolean(category.is_active) : false,
    );
    const [preview, setPreview] = useState<string>(category?.image ?? '');
    const [selectedParent, setSelectedParent] = useState<string>(
        category?.parent_id ? String(category.parent_id) : '',
    );

    const form = category
        ? CategoryController.update.form({ id: category.id })
        : CategoryController.store.form();

    useEffect(() => {
        setIsChecked(category ? Boolean(category.is_active) : false);
        setPreview(category?.image ?? '');
    }, [category]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;
        if (selectedFile) setPreview(URL.createObjectURL(selectedFile));
    };

    return (
        <Form {...form} encType="multipart/form-data">
            {({ processing, errors }) => (
                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label>
                            Name <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            placeholder="e.g. Electronics"
                            name="name"
                            id="name"
                            required
                            defaultValue={category?.name ?? ''}
                        />
                        <InputError message={errors?.name} />
                    </div>

                    {/* Slug */}
                    <div>
                        <Label>
                            Slug <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            placeholder="electronics"
                            name="slug"
                            id="slug"
                            required
                            defaultValue={category?.slug ?? ''}
                        />
                        <InputError message={errors?.slug} />
                    </div>

                    {/* Description */}
                    <div>
                        <Label>Description</Label>
                        <TextArea
                            name="description"
                            id="description"
                            placeholder="Short description about the category..."
                            defaultValue={category?.description ?? ''}
                            rows={3}
                        />
                        <InputError message={errors?.description} />
                    </div>

                    {/* Image */}
                    <div>
                        <Label>Image</Label>
                        <FileInput
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 h-32 w-28 rounded-md border object-cover"
                            />
                        )}
                        <InputError message={errors?.image} />
                    </div>

                    {/* Parent Category */}
                    {options && options?.length > 0 && category?.parent_id && (
                        <div>
                            <Label>Parent Category</Label>
                            <Select
                                options={options}
                                placeholder="Select parent category"
                                defaultValue={selectedParent}
                                onChange={(value) => setSelectedParent(value)}
                                className="mt-1"
                                name="parent_id"
                                id="parent_id"
                            />
                            {/* Hidden input to actually submit the value */}
                            {/* <input type="hidden" name="parent_id" value={selectedParent} /> */}
                            <InputError message={errors?.parent_id} />
                        </div>
                    )}

                    {isShowParentField && (
                        <div>
                            <Label>Parent Category</Label>
                            <Select
                                options={options}
                                placeholder="Select parent category"
                                defaultValue={selectedParent}
                                onChange={(value) => setSelectedParent(value)}
                                className="mt-1"
                                name="parent_id"
                                id="parent_id"
                            />
                            {/* Hidden input to actually submit the value */}
                            {/* <input type="hidden" name="parent_id" value={selectedParent} /> */}
                            <InputError message={errors?.parent_id} />
                        </div>
                    )}
                    {/* Position */}
                    <div>
                        <Label>Position</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            name="position"
                            id="position"
                            defaultValue={category?.position ?? 0}
                        />
                        <InputError message={errors?.position} />
                    </div>

                    {/* Meta Fields */}
                    <div>
                        <Label>Meta Title</Label>
                        <Input
                            placeholder="SEO title for this category"
                            name="meta_title"
                            id="meta_title"
                            defaultValue={category?.meta_title ?? ''}
                        />
                        <InputError message={errors?.meta_title} />
                    </div>

                    <div>
                        <Label>Meta Description</Label>
                        <TextArea
                            name="meta_description"
                            id="meta_description"
                            placeholder="SEO meta description..."
                            defaultValue={category?.meta_description ?? ''}
                            rows={3}
                        />
                        <InputError message={errors?.meta_description} />
                    </div>

                    <div>
                        <Label>Meta Keywords</Label>
                        <TextArea
                            placeholder="e.g. laptop, phone, gadget"
                            name="meta_keywords"
                            id="meta_keywords"
                            defaultValue={category?.meta_keywords ?? ''}
                        />
                        <InputError message={errors?.meta_keywords} />
                    </div>

                    {/* Active Checkbox */}
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={isChecked}
                            onChange={(value) => setIsChecked(value)}
                            name="is_active_checkbox"
                            id="is_active_checkbox"
                        />
                        <Label htmlFor="is_active_checkbox">Active</Label>
                        <InputError message={errors?.is_active} />
                    </div>

                    <input
                        type="hidden"
                        name="is_active"
                        value={isChecked ? '1' : '0'}
                    />

                    {/* Submit Button */}
                    <div>
                        <Button size="sm" disabled={processing}>
                            {processing && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {category ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    );
};

export default CategoryForm;
