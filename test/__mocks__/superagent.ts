/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
let mockError: string,
  mockResponse = {
    status: (): any => 200,
    ok: true,
    get: jest.fn(),
    toError: jest.fn(),
    body: {},
  };

const Request = {
  text: JSON.stringify(mockResponse),
  body: mockResponse,
  put: jest.fn().mockReturnThis(),
  post: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
  query: jest.fn().mockReturnThis(),
  field: jest.fn().mockReturnThis(),
  type: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  accept: jest.fn().mockReturnThis(),
  timeout: jest.fn().mockReturnThis(),
  end: jest.fn().mockImplementation((callback) => {
    callback(mockError, mockResponse);
  }),
  then: jest.fn().mockImplementation((callback) => new Promise((resolve, reject) => {
    if (mockError) {
      return reject(callback(new Error(mockError)));
    }
    return resolve(callback(mockResponse));
  })),
  setMockResponse: (mockRes: { status: () => number; ok: boolean; get: jest.Mock<any, any>; toError: jest.Mock<any, any>; body: any; }): any => {
    mockResponse = mockRes;
  },
  setMockError: (mockErr: any): any => {
    mockError = mockErr;
  },
  __setMockResponseBody: (body: any): any => {
    mockResponse.body = body;
  },
};

export default Request;
