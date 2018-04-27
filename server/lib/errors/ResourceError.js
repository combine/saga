export default class ResourceError extends Error {
  static types = [
    'InvalidResource'
  ];

  constructor({ type, message = null }) {
    super(message);

    if (!this.constructor.types.includes(type)) {
      throw new Error(`Invalid error type ResourceError::${type}`);
    }

    this.type = type || 'InvalidResource';
    this.message = message;
  }
}
