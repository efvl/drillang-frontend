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
        </div>
    );
};

export default TCardEditorMenuBar;