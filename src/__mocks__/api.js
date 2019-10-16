const config = {
  fixedMembershipFee: false,
  fixedMembershipFeeAmount: "12000"
};

export default {
  fetchConfig: jest.fn().mockResolvedValue(config),
  createFlatbond: jest.fn().mockResolvedValue({ status: "created" })
};
