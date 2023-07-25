import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { Brush, BrushFill } from "react-bootstrap-icons";

const TextEditorMenuBar = ({editor}) => {
    const widthRef = React.useRef(null);
    const heightRef = React.useRef(null);

    React.useEffect(() => {
      if (widthRef.current && heightRef.current) {
        widthRef.current.value = 640
        heightRef.current.value = 480
      }
    }, [widthRef.current, heightRef.current])

    const addYoutubeVideo = (e) => {
        e.preventDefault();
        const url = prompt('Enter YouTube URL')
    
        if (url) {
          editor.commands.setYoutubeVideo({
            src: url,
            width: Math.max(320, parseInt(widthRef.current.value, 10)) || 640,
            height: Math.max(180, parseInt(heightRef.current.value, 10)) || 480,
          })
        }
    }

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
        // cancelled
        if (url === null) {
          return
        }
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run()
          return
        }
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
          .run()
    }, [editor]);

    if(!editor){
        return null;
    }

    const pointerHover = {
        cursor: 'pointer',
     };

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
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCode().run(); } }
                className={editor.isActive('code') ? 'is-active' : ''}>code</button> 
            <button
                onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run(); } }
                className={editor.isActive('codeBlock') ? 'is-active' : ''}>code block</button> 
            <span className="color-picker">    
                <input type="color" className="form-inline"
                                    value={editor.getAttributes('textStyle').color}
                                    onChange={e => editor.chain().focus().setColor(e.target.value).run()}/>    
            </span>
            <span style={pointerHover}>
                <Brush size={30} color="#958DF1" 
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()} 
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}></Brush>
            </span>    
            <span style={pointerHover}>
                <Brush size={30} color="#F98181" 
                    onClick={() => editor.chain().focus().setColor('#F98181').run()} 
                    className={editor.isActive('textStyle', { color: '#F98181' }) ? 'is-active' : ''}></Brush>
            </span>
            <span style={pointerHover}>
                <Brush size={30} color="#FBBC88" 
                    onClick={() => editor.chain().focus().setColor('#FBBC88').run()} 
                    className={editor.isActive('textStyle', { color: '#FBBC88' }) ? 'is-active' : ''}></Brush>
            </span>
            <span style={pointerHover}>
                <Brush size={30} color="#FAF594" 
                    onClick={() => editor.chain().focus().setColor('#FAF594').run()} 
                    className={editor.isActive('textStyle', { color: '#FAF594' }) ? 'is-active' : ''}></Brush>
            </span>
            <span style={pointerHover}>
                <Brush size={30} color="#70CFF8" 
                    onClick={() => editor.chain().focus().setColor('#70CFF8').run()} 
                    className={editor.isActive('textStyle', { color: '#70CFF8' }) ? 'is-active' : ''}></Brush>
            </span>
            <span style={pointerHover}>
                <Brush size={30} color="#94FADB" 
                    onClick={() => editor.chain().focus().setColor('#94FADB').run()} 
                    className={editor.isActive('textStyle', { color: '#94FADB' }) ? 'is-active' : ''}></Brush>
            </span>
            <span style={pointerHover}>
                <Brush size={30} color="#B9F18D" 
                    onClick={() => editor.chain().focus().setColor('#B9F18D').run()} 
                    className={editor.isActive('textStyle', { color: '#B9F18D' }) ? 'is-active' : ''}></Brush>
            </span>
            <span style={pointerHover}>
                <Brush size={30}  
                    onClick={() => editor.chain().focus().unsetColor().run()}></Brush>
            </span>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHighlight().run(); } }
                className={editor.isActive('highlight') ? 'is-active' : ''}>toggleHighlight</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run(); } }
                className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}>orange</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run(); } }
                className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}>green</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run(); } }
                className={editor.isActive('highlight', { color: '#74c0fc' }) ? 'is-active' : ''}>blue</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run(); } }
                className={editor.isActive('highlight', { color: '#b197fc' }) ? 'is-active' : ''}>purple</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHighlight({ color: 'red' }).run(); } }
                className={editor.isActive('highlight', { color: 'red' }) ? 'is-active' : ''}>red ('red')</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run(); } }
                className={editor.isActive('highlight', { color: '#ffa8a8' }) ? 'is-active' : ''}>red (#ffa8a8)</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().unsetHighlight().run(); } }
                disabled={!editor.isActive('highlight')}>unsetHighlight</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().setTextAlign('left').run(); } }
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>left</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().setTextAlign('center').run(); } }
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>center</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().setTextAlign('right').run(); } }
                className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>right</button>
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().setTextAlign('justify').run(); } }
                className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>justify</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().unsetTextAlign().run(); } }>unsetTextAlign</button>    
            <button id="add" 
                onClick={addYoutubeVideo}>Add YouTube video</button>
            <input id="width" type="number" className="form-inline" min="320" max="1024" ref={widthRef} placeholder="width"/>  
            <input id="height" type="number" className="form-inline" min="320" max="1024" ref={heightRef} placeholder="height"/> 
            <button 
                onClick={(e) => { e.preventDefault();  setLink(); }} 
                className={editor.isActive('link') ? 'is-active' : ''}>setLink</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().unsetLink().run(); } }
                disabled={!editor.isActive('link')}>unsetLink</button>     
            <button
                onClick={(e) => { e.preventDefault();  editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();}}>insertTable</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().addColumnBefore().run();}}>addColumnBefore</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().addColumnAfter().run();}}>addColumnAfter</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().deleteColumn().run();}}>deleteColumn</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().addRowBefore().run();}}>addRowBefore</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().addRowAfter().run();}}>addRowAfter</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().deleteRow().run();}}>deleteRow</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().deleteTable().run();}}>deleteTable</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().mergeCells().run();}}>mergeCells</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().splitCell().run();}}>splitCell</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHeaderColumn().run();}}>toggleHeaderColumn</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHeaderRow().run();}}>toggleHeaderRow</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().toggleHeaderCell().run();}}>toggleHeaderCell</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().mergeOrSplit().run();}}>mergeOrSplit</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().setCellAttribute('colspan', 2).run();}}>setCellAttribute</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().fixTables().run();}}>fixTables</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().goToNextCell().run();}}>goToNextCell</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().goToPreviousCell().run();}}>goToPreviousCell</button>               
        </div>
    );
};

export default TextEditorMenuBar;
