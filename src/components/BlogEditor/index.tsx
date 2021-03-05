import React from 'react';
import Forms from '../../lib/forms';
import utils from './blogEditorUtils';

type PageProps = {comp:any;editBlog:any;};
const BlogEditor = ({
  comp, editBlog,
}:PageProps): JSX.Element => {
  const { title, content } = editBlog;
  return (
    <div className="horiz-scroll">
      <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
        <h5>Edit Blog</h5>
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
          <label htmlFor="content">
            Content
            <br />
            {utils.editor(content, comp.onChangeBlogContent)}
          </label>
          <div style={{ marginLeft: '60%', marginTop: '10px' }}>
            <button
              type="button"
              id="update-youthContent"
              disabled={false}
              onClick={() => comp.putAPI({ title, content }, `/blog/${editBlog._id}`)}
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

