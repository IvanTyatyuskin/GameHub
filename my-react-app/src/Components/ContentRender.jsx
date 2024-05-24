import React from "react";

export default function ContentRenderer({ content }) {
    return (
        <>
            {content.map((item, index) => {
                if (Array.isArray(item)) {
                    return (
                        <ol key={index}>
                            {item.map((listItem, subIndex) => (
                                <li key={subIndex}>{listItem}</li>
                            ))}
                        </ol>
                    );
                } else if (typeof item === 'string') {
                    return <p key={index}>{item}</p>;
                } else if (React.isValidElement(item)) {
                    return React.cloneElement(item, { key: index });
                } else {
                    return null;
                }
            })}
        </>
    );
}