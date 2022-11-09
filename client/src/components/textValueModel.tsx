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
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h3 style={{ padding: '1rem' }}>{label}:</h3>
            <h1 style={{ padding: '1rem', color: valueColor }}>{value}</h1>
        </div>
    );
}