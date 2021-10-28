import type { Homepage } from './index';

const putAPI = async (comp: Homepage): Promise<string> => {
  const { editBlog } = comp.state;
  const { auth } = comp.props;
  let r;
  try {
    r = await comp.superagent.put(`${process.env.BackendUrl}/blog/${editBlog._id}`)
      .set('Authorization', `Bearer ${auth.token}`)
      .set('Accept', 'application/json')
      .send({ body: editBlog.body, title: editBlog.title });
  } catch (e: any) { return `${e.message}`; }
  return comp.finishAPI('update', r);
};

export default { putAPI };