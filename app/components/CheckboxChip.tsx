import React, { useState } from 'react'
import MaterialIcon from './MaterialIcon'

type Props = {
    id: string;
    label: string;
    value: string;
    checked?: boolean;
};

export default function CheckboxChip({
    id,
    label,
    value,
    checked,
}: Props) {
    const [icon, setIcon] = useState("add");
    const handleIcon = () => {
        if (icon === "add") {
            setIcon("close");
        } else {
            setIcon("add");
        }
    };
    return (
        <div className="relative">
            <input
                onClick={handleIcon}
                type="checkbox"
                id={id}
                value={value}
                className="peer hidden"
            />

            <label
                htmlFor={id}
                className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer transition-all hover:border-primary hover:shadow-md peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary">
                <span className="text-sm font-medium">
                    {label}
                </span>

                <MaterialIcon
                    name={icon}
                    className="text-lg"
                />
            </label>
        </div>
    );
}