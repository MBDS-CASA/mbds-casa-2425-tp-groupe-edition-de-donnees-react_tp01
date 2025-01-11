
import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text' }, ref) => {
    return (
        <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">{label}</label>
            <input
                ref={ref}
                type={type}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
});

export { Input };
