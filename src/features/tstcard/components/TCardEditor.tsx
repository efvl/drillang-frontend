import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TCardEditorMenuBar from "./TCardEditorMenuBar";



const TCardEditor = () => {

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `<p>text here</p>`,
    })

    return (
        <div>
            <TCardEditorMenuBar editor={editor} />
            <EditorContent editor={editor}/>
        </div>
    );
};

export default TCardEditor;