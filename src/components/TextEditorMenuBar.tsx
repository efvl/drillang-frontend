import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { Brush, BrushFill, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Justify, ListOl, ListUl, PSquare, Quote, Table, TextCenter, TextLeft, TextRight, TypeBold, TypeH1, TypeH2, TypeItalic, TypeStrikethrough, TypeUnderline, Youtube } from "react-bootstrap-icons";

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
            <span style={pointerHover} aria-disabled={ !editor.can().chain().focus().toggleBold().run() }>
                <TypeBold size={30} 
                    onClick={() => editor.chain().focus().toggleBold().run()}  
                    className={editor.isActive('bold') ? 'is-active' : ''}></TypeBold>
            </span>
            <span style={pointerHover}>
                <TypeItalic size={30} 
                    onClick={() => editor.chain().focus().toggleItalic().run()}  
                    className={editor.isActive('italic') ? 'is-active' : ''}></TypeItalic>
            </span>
            <span style={pointerHover}>
                <TypeUnderline size={30} 
                    onClick={() => editor.chain().focus().toggleUnderline().run()}  
                    className={editor.isActive('underline') ? 'is-active' : ''}></TypeUnderline>
            </span>
            <span style={pointerHover}>
                <TypeStrikethrough size={30} 
                    onClick={() => editor.chain().focus().toggleStrike().run()}  
                    className={editor.isActive('strike') ? 'is-active' : ''}></TypeStrikethrough>
            </span>
            <span style={pointerHover}>
                <PSquare size={30} 
                    onClick={() => editor.chain().focus().setParagraph().run()}  
                    className={editor.isActive('paragraph') ? 'is-active' : ''}></PSquare>
            </span> 
            <span style={pointerHover}>
                <Dice1 size={30} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}  
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}></Dice1>
            </span> 
            <span style={pointerHover}>
                <Dice2 size={30} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}  
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}></Dice2>
            </span> 
            <span style={pointerHover}>
                <Dice3 size={30} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}  
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}></Dice3>
            </span> 
            <span style={pointerHover}>
                <Dice4 size={30} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}  
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}></Dice4>
            </span> 
            <span style={pointerHover}>
                <Dice5 size={30} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}  
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}></Dice5>
            </span> 
            <span style={pointerHover}>
                <Dice6 size={30} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}  
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}></Dice6>
            </span> 
            <span style={pointerHover}>
                <ListUl size={30} 
                    onClick={() => editor.chain().focus().toggleBulletList().run()} 
                    className={editor.isActive('bulletList') ? 'is-active' : ''}></ListUl>
            </span>
            <span style={pointerHover}>
                <ListOl size={30} 
                    onClick={() => editor.chain().focus().toggleOrderedList().run()} 
                    className={editor.isActive('orderedList') ? 'is-active' : ''}></ListOl>
            </span>  
            <span style={pointerHover}>
                <Quote size={30} 
                    onClick={() => editor.chain().focus().toggleBlockquote().run()} 
                    className={editor.isActive('blockquote') ? 'is-active' : ''}></Quote>
            </span>  
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
            <span style={pointerHover}>
                <TextLeft size={30}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()} 
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}></TextLeft>
            </span>
            <span style={pointerHover}>
                <TextCenter size={30}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()} 
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}></TextCenter>
            </span>
            <span style={pointerHover}>
                <TextRight size={30}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()} 
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}></TextRight>
            </span>
            <span style={pointerHover}>
                <Justify size={30}
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()} 
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}></Justify>
            </span>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().unsetTextAlign().run(); } }>unsetTextAlign</button>    
            <span style={pointerHover}> 
                <Youtube id="add" size={30} color="#f54242" onClick={addYoutubeVideo} ></Youtube>
            </span>    
            <input id="width" type="number" className="form-inline" min="320" max="1024" ref={widthRef} placeholder="width"/>  
            <input id="height" type="number" className="form-inline" min="320" max="1024" ref={heightRef} placeholder="height"/> 
            <button 
                onClick={(e) => { e.preventDefault();  setLink(); }} 
                className={editor.isActive('link') ? 'is-active' : ''}>setLink</button>
            <button 
                onClick={(e) => { e.preventDefault();  editor.chain().focus().unsetLink().run(); } }
                disabled={!editor.isActive('link')}>unsetLink</button>     
            <span style={pointerHover}>
                <Table size={30}
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}></Table>
            </span>
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
