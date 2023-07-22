import '../../../myeditor.scss';

const TCardEditorMenuBar = ({editor}) => {
    if(!editor){
        return null;
    }


    return (
        <div className='editor_menu pb-2'>
            <button 
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); } }
                disabled={ !editor.can().chain().focus().toggleBold().run() }
                className={editor.isActive('bold') ? 'is-active' : ''}>Bold</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); } }
                disabled={ !editor.can().chain().focus().toggleItalic().run() }
                className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); } }
                disabled={ !editor.can().chain().focus().toggleUnderline().run() }
                className={editor.isActive('underline') ? 'is-active' : ''}>Underline</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); } }
                disabled={ !editor.can().chain().focus().toggleStrike().run() }
                className={editor.isActive('strike') ? 'is-active' : ''}>Strike</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().setParagraph().run(); } }
                className={editor.isActive('paragraph') ? 'is-active' : ''}>paragraph</button>    
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); } }
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>h1</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); } }
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>h2</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); } }
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>h3</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 4 }).run(); } }
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>h4</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 5 }).run(); } }
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}>h5</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 6 }).run(); } }
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>h6</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); } }
                className={editor.isActive('bulletList') ? 'is-active' : ''}>bullet list</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); } }
                className={editor.isActive('orderedList') ? 'is-active' : ''}>ordered list</button>  
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); } }
                className={editor.isActive('blockquote') ? 'is-active' : ''}>blockquote</button>
            <button 
                onClick={(e) => { e.preventDefault(); editor.chain().focus().setHorizontalRule().run(); } }>horizontal rule</button>
            <button 
                onClick={(e) => { e.preventDefault(); editor.chain().focus().setHardBreak().run(); } }>hard break</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); } }
                disabled={ !editor.can().chain().focus().undo().run() }>undo</button>
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); } }
                disabled={ !editor.can().chain().focus().redo().run() }>redo</button>
            <button 
                onClick={(e) => { e.preventDefault(); editor.chain().focus().unsetAllMarks().run(); } }>clear marks</button>
            <button 
                onClick={(e) => { e.preventDefault(); editor.chain().focus().clearNodes().run(); } }>clear nodes</button>   
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleCode().run(); } }
                className={editor.isActive('code') ? 'is-active' : ''}>code</button>                       
        </div>
    );
};

export default TCardEditorMenuBar;