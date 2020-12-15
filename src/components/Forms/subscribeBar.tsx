import React from 'react';

const SubscribeBar = (email: string, setSubscribe: any): JSX.Element => {
  const BarStyle = {
    background: '#F2F1F9', padding: '0.5rem',
  };
  return (
    <div>
      <form id="subscribeForm" aria-label="Subscribe to our email listing." method="get">
        <div>
          <label className="screen-reader-text" htmlFor="subscribeBar">
            <span className="sr-subscribe-bar">Enter your email to subscribe to our newsletter.</span>
            <input
              id="subscribeBar"
              type="text"
              className="subscribeBar"
              style={BarStyle}
              key="subscriberEmail"
              value={email}
              placeholder="me@email.com"
              onChange={(e) => setSubscribe(e.target.value)}
            />
            <input
              id="subscribeSubmit"
              className="subscribeSubmit"
              type="submit"
              value="Sign Up"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SubscribeBar;
