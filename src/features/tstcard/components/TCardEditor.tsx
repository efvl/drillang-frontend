import { Editor, EditorContent, useEditor } from "@tiptap/react";
import TCardEditorMenuBar from "./TCardEditorMenuBar";
import { TCard } from "../models/TCard";
import { useEffect } from "react";

interface TCardEditorProps {
    isEdit?:boolean,
    tcardForm?:TCard,
    editor?:Editor;
}

const TCardEditor = (props:TCardEditorProps) => {
    
    return (
        <div className="border rounded">
            {props?.isEdit 
                ? <TCardEditorMenuBar editor={props.editor} />
                : <></>
            }
            <EditorContent editor={props.editor}/>
        </div>
    );
};

export default TCardEditor;