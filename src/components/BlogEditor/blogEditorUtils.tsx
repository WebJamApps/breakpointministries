import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

const editor = (blogContent: string | undefined, handleEditorChange: (...args:any)=>any): JSX.Element => (
  <Editor
    apiKey={process.env.TINY_KEY}
    value={blogContent}
    init={{
      height: 600,
      menubar: 'insert tools',
      menu: { format: { title: 'Format', items: 'forecolor backcolor' } },
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
      ],
      toolbar:
          'undo redo | formatselect | bold italic backcolor forecolor |'
          + 'alignleft aligncenter alignright alignjustify |'
          + 'bullist numlist outdent indent | removeformat | help',
    }}
    onEditorChange={handleEditorChange}
  />
);

export default { editor };
