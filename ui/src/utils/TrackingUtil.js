class TrackingUtil {
  static generateIdFromTitle(title) {
    return title.replace(/\s+/g, '-').toLowerCase();
  }
}

export default TrackingUtil;