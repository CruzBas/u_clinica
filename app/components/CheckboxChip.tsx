import React, { useState } from 'react'
import MaterialIcon from './MaterialIcon'

type Props = {
    id: string;
    label: string;
    value: string;
    name?: string;
    checked?: boolean;
};

export default function CheckboxChip({
    id,
    label,
    value,
    name,
    checked,
}: Props) {
    const [isChecked, setIsChecked] = useState(checked ?? false);
    const handleIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (name === "motivos" && event.target.checked) {
            const checkedOptions = event.currentTarget.form?.querySelectorAll(
                'input[name="motivos"]:checked',
            );

            if ((checkedOptions?.length ?? 0) > 3) {
                event.target.checked = false;
                setIsChecked(false);
                return;
            }
        }

        setIsChecked(event.target.checked);
    };
    return (
        <div className="relative">
            <input
                onChange={handleIcon}
                type="checkbox"
                id={id}
                name={name}
                value={value}
                defaultChecked={checked}
                className="peer hidden"
            />

            <label
                htmlFor={id}
                className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-all hover:border-primary hover:shadow-md peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary">
                <span className="text-sm font-medium">
                    {label}
                </span>

                <MaterialIcon
                    name={isChecked ? "close" : "add"}
                    className="text-lg"
                />
            </label>
        </div>
    );
}
