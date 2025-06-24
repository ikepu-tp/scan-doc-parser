import React, { PropsWithChildren, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

export default function render(
    children: React.ReactNode,
    rootId: string = "root",
    strictMode: boolean = true,
): void {
    const rootElement: HTMLElement | null = document.getElementById(rootId);
    if (!rootElement) throw new Error(`Element with id ${rootId} not found`);
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictWrapper strictMode={strictMode}>{children}</StrictWrapper>,
    );
}

function StrictWrapper(
    props: { strictMode: boolean } & PropsWithChildren,
): React.ReactNode {
    if (props.strictMode) return <StrictMode>{props.children}</StrictMode>;
    return props.children;
}

reportWebVitals(console.log);
