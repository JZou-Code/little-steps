import React from 'react';
import DOMPurify from "dompurify";

const RichHtml = () => {
    const safe = DOMPurify.sanitize(html);
    return (
        <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: safe }}
        />
    );
};

export default RichHtml;
