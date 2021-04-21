import React from 'react';

export interface InputParams {
  type: string | undefined,
  label: string, isRequired: boolean | undefined,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void | string), value: string, width: string
}
function makeInput(p: InputParams): JSX.Element {
  let fId = p.label && p.label.toLowerCase();
  fId = fId.replace(/\s/g, '');
  return (
    <label className="inquiryLabel" htmlFor={fId}>
      {p.isRequired ? '* ' : ''}
      {p.label}
      <br />
      <input
        style={{ width: p.width }}
        id={fId}
        type={p.type}
        name={fId}
        onChange={p.onChange}
        required={p.isRequired}
        value={p.value || ''}
      />
    </label>
  );
}

export default {
  makeInput,
};
