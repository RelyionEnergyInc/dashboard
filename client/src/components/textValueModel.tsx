import React from 'react';

interface TextValueModelProps {
    value: number;
    label: string;
    valueColor?: string;
}

export default function TextValueModel({ value, label, valueColor }: TextValueModelProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        }}>
            <h3 style={{ padding: '1rem', margin: 0 }}>{label}:</h3>
            <h1 style={{ padding: '1rem', margin: 0, color: valueColor }}>{value}</h1>
        </div>
    );
}