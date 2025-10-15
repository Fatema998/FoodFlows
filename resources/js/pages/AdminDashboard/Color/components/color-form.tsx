import ColorController from '@/actions/App/Http/Controllers/Admin/ColorController';
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import InputError from '@/components/ui/input-error';
import { useToastMessage } from '@/hooks/useToastMessage';
import { Form } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ColorFormProps {
  color?: {
    id: number;
    name: string;
    code: string;
    position?: number;
    is_active: boolean;
  };
}

const ColorForm: React.FC<ColorFormProps> = ({ color }) => {
  useToastMessage();

  // local state for checkbox UI
  const [isChecked, setIsChecked] = useState<boolean>(
    color ? Boolean(color.is_active) : false
  );

  // Choose between Add or Edit form mode dynamically
  const form = color
    ? ColorController.update.form({ id: color.id })
    : ColorController.store.form();

  // Keep local state in sync if `color` prop changes (e.g., editing another color)
  useEffect(() => {
    setIsChecked(color ? Boolean(color.is_active) : false);
  }, [color]);

  return (
    <Form {...form}>
      {({ processing, errors }) => (
        <div className="space-y-6">
          {/* Name */}
          <div>
            <Label>
              Name <span className="text-error-500">*</span>
            </Label>
            <Input
              placeholder="e.g. Red"
              name="name"
              id="name"
              required
              defaultValue={color?.name ?? ''}
            />
            <InputError message={errors?.name} />
          </div>

          {/* Code */}
          <div>
            <Label>
              Code <span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="#FF0000"
              name="code"
              id="code"
              required
              defaultValue={color?.code ?? ''}
            />
            <InputError message={errors?.code} />
          </div>

          {/* Position */}
          <div>
            <Label>Position</Label>
            <Input
              type="number"
              placeholder="1"
              name="position"
              id="position"
              defaultValue={color?.position ?? 1}
            />
            <InputError message={errors?.position} />
          </div>

          {/* Active */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={isChecked}
                onChange={(value) => setIsChecked(value)}
                name="is_active_checkbox" // keep different name to avoid default checkbox 'on'
                id="is_active"
              />
              <Label htmlFor="is_active">Active</Label>
              <InputError message={errors?.is_active} />
            </div>
          </div>

          {/* Hidden input that guarantees the form sends 1 or 0 for is_active */}
          <input
            type="hidden"
            name="is_active"
            value={isChecked ? '1' : '0'}
          />

          {/* Submit */}
          <div>
            <Button className="" size="sm" disabled={processing}>
              {processing && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}
              {color ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default ColorForm;
