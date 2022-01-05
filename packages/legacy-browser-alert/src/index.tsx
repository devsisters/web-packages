import * as React from 'react';

const ieRegexes = [
    /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/,
    /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/,
    /MSIE\s(7\.0)/
];

type Props = {
  locale?: 'ko' | 'en';
  sx?: React.CSSProperties;
  onClose?: () => void;
}

const AlertComponent = ({ locale = 'ko', sx, onClose }: Props) => {
  const userAgent = window?.navigator?.userAgent;
  const isIE = ieRegexes.some(regex => regex.test(userAgent));
  if (!isIE) {
    return null;
  }

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem 0.5rem',

    fontSize: '1rem',
    textAlign: 'center' as const,

    backgroundColor: '#FFF0F0',
    color: '#D22030',
    ...sx,
  };

  const anchorStyle = {
    color: '#D22030',
    fontWeight: 700,
  }

  const spanStyle = {
    marginLeft: '0.25rem',
    flex: 1,
  }

  const buttonStyle = {
    marginLeft: '0.25rem',
    border: 0,

    background: 'transparent',
    textDecoration: 'underline',
    fontSize: '0.85rem',

    appearance: 'none' as const,
    cursor: 'pointer',
  }

  return (
    <div style={containerStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M10.0833 13.75H11.9167V15.5833H10.0833V13.75ZM10.0833 6.41668H11.9167V11.9167H10.0833V6.41668ZM10.9908 1.83334C5.93084 1.83334 1.83334 5.94001 1.83334 11C1.83334 16.06 5.93084 20.1667 10.9908 20.1667C16.06 20.1667 20.1667 16.06 20.1667 11C20.1667 5.94001 16.06 1.83334 10.9908 1.83334ZM11 18.3333C6.94834 18.3333 3.66668 15.0517 3.66668 11C3.66668 6.94834 6.94834 3.66668 11 3.66668C15.0517 3.66668 18.3333 6.94834 18.3333 11C18.3333 15.0517 15.0517 18.3333 11 18.3333Z" fill="#D22030"/>
      </svg>
      <span style={spanStyle}>
        {
          locale === 'ko' ?
            <>
              Internet Explorer는 지원하지 않는 브라우저입니다. <a style={anchorStyle} href="https://www.google.com/chrome/">Chrome</a> 또는 <a style={anchorStyle} href="https://www.mozilla.org/firefox/">Firefox</a> 등 최신 브라우저를 사용해주세요.
            </>
              :
              <>
                Internet Explorer is not supported. Please use a modern browser like <a style={anchorStyle} href="https://www.google.com/chrome/">Chrome</a> or <a style={anchorStyle} href="https://www.mozilla.org/firefox/">Firefox</a>.
              </>
        }
      </span>
      {onClose && (
        <button style={buttonStyle} onClick={onClose}>
          {locale === 'ko' ? '닫기' : 'Close'}
        </button>
      )}
    </div>
  );
}

export default AlertComponent;
