import { Editor, EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import TextEditorMenuBar from "./TextEditorMenuBar";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import css from 'highlight.js/lib/languages/css'
// import js from 'highlight.js/lib/languages/javascript'
// import ts from 'highlight.js/lib/languages/typescript'
// import html from 'highlight.js/lib/languages/xml'
// import java from 'highlight.js/lib/languages/java'
// load all highlight.js languages
import { lowlight } from 'lowlight'
import CodeBlockComponent from "./CodeBlockComponent";
import { useEffect } from "react";

// lowlight.registerLanguage('html', html)
// lowlight.registerLanguage('css', css)
// lowlight.registerLanguage('js', js)
// lowlight.registerLanguage('java', java)
// lowlight.registerLanguage('ts', ts)

interface TextEditorProps {
    isEdit?:boolean,
    editorContent?:string;  
    updateEditorLink: (editorContent:any) => void; 
}

const TextEditorPanel = (props:TextEditorProps) => {
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            CodeBlockLowlight
                .extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlockComponent)
                    },
                })
                .configure({ lowlight }),
        ],
        content: props.editorContent,
        // onUpdate({ editor }) {
        //     props.updateContent(editor.toHtml());
        // }
    });

    useEffect(() => {
        props.updateEditorLink(editor);
    }, [editor]);

    useEffect(() => {
        editor?.commands.setContent(props.editorContent);
    }, [props.editorContent]);


    return (
        <div className="border rounded p-2">
            {props?.isEdit 
                ? <TextEditorMenuBar editor={editor} />
                : <></>
            }
            <EditorContent editor={editor}/>
        </div>
    );
};

export default TextEditorPanel;