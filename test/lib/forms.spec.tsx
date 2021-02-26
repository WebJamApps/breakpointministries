import { shallow } from 'enzyme';
import forms from '../../src/lib/forms';

describe('forms', () => {
  it('makes a required input', () => {
    const onChange = jest.fn();
    const iParams = {
      type: 'text', label: 'txt', isRequired: true, onChange, value: 'value', width: '90px',
    };
    const i = forms.makeInput(iParams);
    const inp = shallow(i);
    expect(inp.find('input').prop('required')).toBe(true);
  });
});
