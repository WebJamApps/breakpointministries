import React from 'react';
import type { IBlog, Homepage } from '../../containers/Homepage';
import Forms from '../../lib/forms';
import utils from './blogEditorUtils';

type PageProps = {comp:Homepage;editBlog:IBlog;};
const BlogEditor = ({
  comp, editBlog,
}:PageProps): JSX.Element => {
  const { title, body } = editBlog;
  return (
    <div className="horiz-scroll">
      <div
        className="material-content elevation3"
        style={{
          width: '78vw', margin: 'auto', padding: '10px', paddingTop: '20px',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '16pt' }}>Edit Blog</h1>
        <form
          id={`update-blog${editBlog._id}`}
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {Forms.makeInput({
            type: 'text',
            label: 'Blog Title',
            isRequired: false,
            onChange: (evt:React.ChangeEvent<HTMLInputElement>) => {
              const newEditBlog = { ...editBlog, title: evt.target.value };
              comp.setState({ editBlog: newEditBlog });
            },
            value: title,
            width: '90%',
          })}
          <p>&nbsp;</p>
          <label htmlFor="content" style={{ fontSize: '12pt', fontWeight: 'bold' }}>
            Content
            <br />
            {utils.editor(body, comp.handleEditorChange)}
          </label>
          <div style={{ marginLeft: '10px', marginTop: '10px' }}>
            <button
              type="button"
              id="update-youthContent"
              disabled={false}
              onClick={() => comp.putAPI()}
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;

