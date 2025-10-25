import BrandController from '@/actions/App/Http/Controllers/Admin/BrandController';
import Checkbox from '@/components/form/input/Checkbox';
import FileInput from '@/components/form/input/FileInput';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import InputError from '@/components/ui/input-error';
import { Form } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BrandFormProps } from '../brand-type';

const BrandForm: React.FC<BrandFormProps> = ({ brand }) => {

    // Local state for checkbox UI
    const [isChecked, setIsChecked] = useState<boolean>(
        brand ? Boolean(brand.is_active) : false,
    );

    // Local state for file upload preview
    const [preview, setPreview] = useState<string>(brand?.image ?? '');

    // Choose between Add or Edit form mode dynamically
    const form = brand
        ? BrandController.update.form({ id: brand.id })
        : BrandController.store.form();

    // Keep checkbox in sync if brand changes
    useEffect(() => {
        setIsChecked(brand ? Boolean(brand.is_active) : false);
        setPreview(brand?.image ?? '');
    }, [brand]);

    // Handle image preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <Form {...form} encType="multipart/form-data">
            {({ processing, errors }) => (
                <div className="space-y-6">
                    {/* Name */}
                    <div>
                        <Label>
                            Name <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            placeholder="e.g. Nike"
                            name="name"
                            id="name"
                            required
                            defaultValue={brand?.name ?? ''}
                        />
                        <InputError message={errors?.name} />
                    </div>

                    {/* Slug */}
                    <div>
                        <Label>
                            Slug <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            placeholder="nike"
                            name="slug"
                            id="slug"
                            required
                            defaultValue={brand?.slug ?? ''}
                        />
                        <InputError message={errors?.slug} />
                    </div>

                    {/* Image */}
                    <div>
                        <Label>Image</Label>
                        <FileInput
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 h-18 w-28 rounded-md border object-cover"
                            />
                        )}
                        <InputError message={errors?.image} />
                    </div>

                    {/* Position */}
                    <div>
                        <Label>Position</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            name="position"
                            id="position"
                            defaultValue={brand?.position ?? 0}
                        />
                        <InputError message={errors?.position} />
                    </div>

                    {/* Active */}
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={isChecked}
                            onChange={(value) => setIsChecked(value)}
                            name="is_active_checkbox"
                            id="is_active"
                        />
                        <Label htmlFor="is_active">Active</Label>
                        <InputError message={errors?.is_active} />
                    </div>

                    {/* Hidden input to send 1/0 */}
                    <input
                        type="hidden"
                        name="is_active"
                        value={isChecked ? '1' : '0'}
                    />

                    {/* Submit */}
                    <div>
                        <Button size="sm" disabled={processing}>
                            {processing && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {brand ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </div>
            )}
        </Form>
    );
};

export default BrandForm;
