import React from 'react';
import Editor from "ckeditor5-custom-build/build/ckeditor";
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const MyCKEditor = () => {
    return (
        <div>
            <div className="App">
                <h2>Using CKEditor 5 from online builder in react</h2>
                <CKEditor editor={ Editor }
                        data="<p>Hello fromCKEditor 5!</p>"
                        onReady={ editor => {
                            console.log( "Editor is ready to use!", editor);
                        }}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur= { (event, editor) => {
                            console.log( 'Blur.', editor);
                        }}
                        onFocus={ (event, editor) => {
                            console.log( 'Focus.', editor);
                        }}
                />
            </div>
        </div>
    )
}

export default MyCKEditor;