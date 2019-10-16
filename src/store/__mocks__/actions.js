export default {
  FETCH_CONFIG: jest.fn(),
  CREATE_FLATBOND: jest.fn().mockResolvedValue("created"),
  SET_FEE: jest.fn()
};
