import { Editor, EditorContent, useEditor } from "@tiptap/react";
import TCardEditorMenuBar from "./TCardEditorMenuBar";

interface TCardEditorProps {
    isEdit?:boolean,
    editor?:Editor;
}

const TCardEditor = (props:TCardEditorProps) => {

    return (
        <div className="border rounded">
            <TCardEditorMenuBar editor={props.editor} />
            <EditorContent editor={props.editor}/>
        </div>
    );
};

export default TCardEditor;