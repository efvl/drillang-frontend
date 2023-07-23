import './CodeBlockComponent.scss'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useState } from 'react'

const CodeBlockComponent = ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => {

  const [curLang, setCurLang] = useState(defaultLanguage);
  const langs = Array.from(['java', 'js', 'ts', 'html', 'css']);

  return (
    <NodeViewWrapper className="code-block">
      <select contentEditable={false} defaultValue={defaultLanguage} onChange={event => { setCurLang(event.target.value); updateAttributes({ language: event.target.value })}}>
        <option value="null">
          auto
        </option>
        <option disabled>
          —
        </option>
        {extension.options.lowlight.listLanguages().filter(item => langs.includes(item)).map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre className={'lang-' + curLang}>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;