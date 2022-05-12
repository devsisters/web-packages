var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
var ieRegexes = [
    /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/,
    /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/,
    /MSIE\s(7\.0)/
];
var AlertComponent = function (_a) {
    var _b;
    var _c = _a.locale, locale = _c === void 0 ? 'ko' : _c, sx = _a.sx, onClose = _a.onClose;
    var userAgent = (_b = window === null || window === void 0 ? void 0 : window.navigator) === null || _b === void 0 ? void 0 : _b.userAgent;
    var isIE = ieRegexes.some(function (regex) { return regex.test(userAgent); });
    if (!isIE) {
        return null;
    }
    var containerStyle = __assign({ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem 0.5rem', fontSize: '1rem', textAlign: 'center', backgroundColor: '#FFF0F0', color: '#D22030' }, sx);
    var anchorStyle = {
        color: '#D22030',
        fontWeight: 700,
    };
    var spanStyle = {
        marginLeft: '0.25rem',
        flex: 1,
    };
    var buttonStyle = {
        marginLeft: '0.25rem',
        border: 0,
        background: 'transparent',
        textDecoration: 'underline',
        fontSize: '0.85rem',
        appearance: 'none',
        cursor: 'pointer',
    };
    return (React.createElement("div", { style: containerStyle },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 22 22", fill: "none" },
            React.createElement("path", { d: "M10.0833 13.75H11.9167V15.5833H10.0833V13.75ZM10.0833 6.41668H11.9167V11.9167H10.0833V6.41668ZM10.9908 1.83334C5.93084 1.83334 1.83334 5.94001 1.83334 11C1.83334 16.06 5.93084 20.1667 10.9908 20.1667C16.06 20.1667 20.1667 16.06 20.1667 11C20.1667 5.94001 16.06 1.83334 10.9908 1.83334ZM11 18.3333C6.94834 18.3333 3.66668 15.0517 3.66668 11C3.66668 6.94834 6.94834 3.66668 11 3.66668C15.0517 3.66668 18.3333 6.94834 18.3333 11C18.3333 15.0517 15.0517 18.3333 11 18.3333Z", fill: "#D22030" })),
        React.createElement("span", { style: spanStyle }, locale === 'ko' ?
            React.createElement(React.Fragment, null,
                "Internet Explorer\uB294 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uBE0C\uB77C\uC6B0\uC800\uC785\uB2C8\uB2E4. ",
                React.createElement("a", { style: anchorStyle, href: "https://www.google.com/chrome/" }, "Chrome"),
                " \uB610\uB294 ",
                React.createElement("a", { style: anchorStyle, href: "https://www.mozilla.org/firefox/" }, "Firefox"),
                " \uB4F1 \uCD5C\uC2E0 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574\uC8FC\uC138\uC694.")
            :
                React.createElement(React.Fragment, null,
                    "Internet Explorer is not supported. Please use a modern browser like ",
                    React.createElement("a", { style: anchorStyle, href: "https://www.google.com/chrome/" }, "Chrome"),
                    " or ",
                    React.createElement("a", { style: anchorStyle, href: "https://www.mozilla.org/firefox/" }, "Firefox"),
                    ".")),
        onClose && (React.createElement("button", { style: buttonStyle, onClick: onClose }, locale === 'ko' ? '닫기' : 'Close'))));
};
export default AlertComponent;
