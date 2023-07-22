import '../../../myeditor.scss';

const TCardEditorMenuBar = ({editor}) => {
    if(!editor){
        return null;
    }


    return (
        <div className='editor_menu pb-2'>
            <button 
                onClick={(e) => 
                    { 
                        e.preventDefault(); 
                        editor.chain().focus().toggleBold().run();
                    }
                }
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >bold</button>
            <button
                onClick={(e) => 
                    {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >italic</button>
        </div>
    );
};

export default TCardEditorMenuBar;