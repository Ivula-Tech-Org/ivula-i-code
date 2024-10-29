import '../assets/editor.css'
import React, { useEffect, useState } from 'react';
import Monaco, { loader } from '@monaco-editor/react'
import { useGiraf } from '../giraff';

const JsEditor = () => {
    const [code, setCode] = useState("// Write your JavaScript code here");
    const { gHead, addGHead } = useGiraf()

    const handleEditorChange = (value) => {
        addGHead('code', value)
    };

    useEffect(()=>{

        addGHead('readOnly', true)
    },[])
    const runCode = () => {
        try {
            console.log(eval(code));
        } catch (err) {
            console.error("Error executing code:", err);
        }
    };

    return (
        <div className='monaco-box'>
            <Monaco
                height="90vh"
                defaultLanguage="javascript"
                defaultValue={'// Js code goes here'}
                onChange={handleEditorChange}
                value={'// ' + gHead.current_code?.description || '// Js code goes here'}
                className='monaco'
                theme='vs-dark'
                options={{
                    readOnly: gHead.readOnly
                }}
            />
        </div>
    );
};

export default JsEditor;
