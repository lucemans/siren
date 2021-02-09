import * as React from 'react';

export interface SelectionOption {
    label: string;
    value: string;
}

export default function SelectionList({ options, onChanged, value, label }: { options: SelectionOption[], onChanged: (value: string) => void, value: string, label: string }): JSX.Element {

    const [v, setV] = React.useState(value);

    if (value != v) {
        setV(value);
    }

    return (
        <div className="selection">
            <div className="label">{label}</div>
            {
                options.map((e) => (
                    <div className={'option' + (v == e.value ? ' selected' : '') + (v == e.value && e.label == 'Enabled' ? ' act' : '')} key={e.value} onClick={() => {
                        setV(e.value);
                        onChanged(e.value);
                    }}>
                        <div className="inside"></div>
                        <span>{ e.label}</span>
                    </div>
                ))
            }
        </div>
    )
}