"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    const [loaded, setLoaded] = useState(false);

    // Initialize Quill
    const initQuill = () => {
        if ((window as any).Quill && editorRef.current && !quillRef.current) {
            const Quill = (window as any).Quill;

            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image', 'video'],
                        ['clean']
                    ]
                }
            });

            quill.on('text-change', () => {
                onChange(quill.root.innerHTML);
            });

            quillRef.current = quill;
            setLoaded(true);
        }
    };

    // Sync content changes from props
    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            // Only update if significantly different to avoid cursor jumps
            // For simple implementation, we might just check if empty or if completely different
            const currentContent = quillRef.current.root.innerHTML;
            if (currentContent === '<p><br></p>' && value) {
                quillRef.current.root.innerHTML = value;
            } else if (value && Math.abs(currentContent.length - value.length) > 10) {
                // Fallback for major updates (like initial load)
                quillRef.current.root.innerHTML = value;
            }
        }
    }, [value, loaded]);

    return (
        <div className="rich-text-editor-wrapper">
            <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
            <Script
                src="https://cdn.quilljs.com/1.3.6/quill.min.js"
                onLoad={initQuill}
            />
            <div ref={editorRef} style={{ height: '400px', backgroundColor: 'white' }} />

            <style jsx global>{`
                .rich-text-editor-wrapper .ql-editor {
                    font-family: inherit;
                    font-size: 16px;
                    line-height: 1.6;
                    min-height: 200px;
                }
                .rich-text-editor-wrapper .ql-editor h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; }
                .rich-text-editor-wrapper .ql-editor h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
                .rich-text-editor-wrapper .ql-editor h3 { font-size: 1.17em; font-weight: bold; margin-bottom: 0.5em; }
                .rich-text-editor-wrapper .ql-editor p { margin-bottom: 1em; }
                .rich-text-editor-wrapper .ql-editor ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
                .rich-text-editor-wrapper .ql-editor ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1em; }
                .rich-text-editor-wrapper .ql-editor blockquote { border-left: 4px solid #ccc; padding-left: 1em; color: #666; font-style: italic; }
             `}</style>
        </div>
    );
}
