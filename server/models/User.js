module.exports = mongoose => {
  return new mongoose.Schema({
    chatId: {
      type: String,
      required: true,
      default: ''
    },
    card: { 
      type: String, 
      default: ''
    },
    agency: {
      type: String,
      default: ''
    },
    account: {
      type: String,
      default: ''
    },
    dac: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: true,
      default: ''
    }
  });
};
