import { useEffect, useState } from 'react';
import { NumberInput } from '@mantine/core';
import { useController } from 'react-hook-form';

const ControlledNumberInput = ({ control, name, rules, ...props }) => {
    const {
        field: { onChange, value, ...field },
        fieldState: { error },
    } = useController({
        control,
        name,
        rules,
    });

    const [internalValue, setInternalValue] = useState(() => {
        if (typeof value === 'number' && !isNaN(value)) {
            return value;
        }
        return 0; 
    });
    
    useEffect(() => {
        if (typeof value === 'number' && !isNaN(value)) {
            setInternalValue(value);
        } else {
            setInternalValue(0);
        }
    }, [value]);
    
    const handleChange = (val) => {
        if (val < props?.min) {
            setInternalValue(props?.min);
            onChange(props?.min);
        }else if(val> props?.max){
            setInternalValue(props?.max);
            onChange(props?.max);
        } else {
            setInternalValue(val);
            onChange(val);
        }
    };

    return (
        <NumberInput
            value={internalValue}
            onChange={handleChange}
            error={error && error.message}
             clampBehavior="strict"
            {...field}
            {...props}
        />
    );
};

export default ControlledNumberInput;
