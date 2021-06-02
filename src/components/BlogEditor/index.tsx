import React from 'react';
import type { IBlog, Homepage } from '../../containers/Homepage';
import Forms from '../../lib/forms';
import utils from './blogEditorUtils';

type PageProps = { comp:Homepage;editBlog:IBlog; };
const BlogEditor = ({
  comp, editBlog,
}:PageProps): JSX.Element => {
  const { title, body } = editBlog;
  return (
    <div className="page-content">
      <h1 className="admin--header">
        Post A New Blog
      </h1>
      <div className="changeHomepage">
        <form
          id={`update-blog${editBlog._id}`}
          className="update-blog"
          style={{
            textAlign: 'left', marginLeft: '4px', maxWidth: '100%',
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
            width: '280px',
          })}
          <p>&nbsp;</p>
          <label className="contentLabel" htmlFor="content">
            Content
            <br />
            {utils.editor(body, comp.handleEditorChange)}
          </label>
          <div style={{ marginLeft: '10px', marginTop: '10px' }} id="update-blog-button-div">
            <button
              style={{ marginRight: '10px' }}
              type="button"
              id="update-blog-button"
              className="btn"
              disabled={false}
              onClick={() => comp.putAPI()}
            >
              Update Blog
            </button>
            <button
              style={{ marginRight: '10px' }}
              type="button"
              id="cancel-blog-update-button"
              className="btn"
              disabled={false}
              onClick={() => comp.setState({ editBlog: { _id: '', title: '', body: '' } })}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;

