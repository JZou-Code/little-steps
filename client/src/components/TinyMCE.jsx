import {Editor} from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/preview';
import 'tinymce/skins/ui/oxide/skin.min.css';

export default function TinyMCE({content, onChange}) {
    return (
        <Editor
            value={content ?? ''}
            onEditorChange={onChange}
            init={{
                skin: 'oxide-dark',
                license_key: 'gpl',
                height: '100%',
                width: '100%',
                resize:false,
                menubar: false,
                xss_sanitization: true,
                allow_script_urls: false,
                sandbox_iframes: true,
                convert_unsafe_embeds: true,
                plugins: 'code link lists image table preview',
                toolbar:
                    [
                        'undo redo | bold italic underline | forecolor',
                        '| bullist numlist outdent indent | link image',
                        '| code preview'
                    ].join(' '),
                branding: false,
                link_default_target: '_blank',
                rel_list: [{title: 'No Referrer', value: 'noreferrer'}, {title: 'No Opener', value: 'noopener'}],
                images_upload_handler: async (blobInfo) => {
                    const form = new FormData();
                    form.append('file', blobInfo.blob(), blobInfo.filename());
                    const res = await fetch('/api/upload', {method: 'POST', body: form});
                    if (!res.ok) throw new Error('Upload failed');
                    const {url} = await res.json();
                    return url;
                },
                setup: (editor)=> {
                    function pointInRects(x, y, rects) {
                        for (const r of rects) {
                            if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
                        }
                        return false;
                    }

                    editor.on('mousedown', (event) => {
                        const li = event.target;
                        const childList = li.querySelector('ul,ol');
                        if (!childList) return;
                        let textNode = null;
                        for (const node of li.childNodes) {
                            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                                textNode = node;
                                break;
                            }
                        }
                        if (!textNode) {
                            return;
                        }

                        const r = document.createRange();
                        r.selectNodeContents(textNode);
                        const rects = r.getClientRects();

                        const {clientX: x, clientY: y} = event;

                        if (pointInRects(x, y, rects)) {
                            return;
                        }

                        textNode = li.firstChild;

                        const range = document.createRange();
                        range.setStart(textNode, textNode.nodeValue.length);
                        range.collapse(false);
                        editor.selection.setRng(range);

                        event.preventDefault();
                    }, true);
                }
            }}
        />
    );
}
