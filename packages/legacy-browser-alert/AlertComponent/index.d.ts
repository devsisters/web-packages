import * as React from 'react';
declare type Props = {
    locale?: 'ko' | 'en';
    sx?: React.CSSProperties;
    onClose?: () => void;
};
declare const AlertComponent: ({ locale, sx, onClose }: Props) => JSX.Element | null;
export default AlertComponent;
